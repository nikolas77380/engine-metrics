import React, { useState, useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux'
import { makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import SaveIcon from '@material-ui/icons/Save';
import styled from "@material-ui/core/styles/styled";
import LabelledOutline from "../common/LabelOutlined";

import {
  readData,
  writeCanId,
  requestCanId,
  startCan,
  stopCan,
} from './ControlsSlice';

const canIdsArray = ['id1', 'id2', 'id3', 'id4'];

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
}));

const SuccessButton = styled(Button) ({
  backgroundColor: '#32CD32',
  color: '#FFF',
  '&:hover': {
    backgroundColor: '#008000',
    color: '#FFF'
  }
})

export function Controls() {
  const classes = useStyles();
  const dispatch = useDispatch(); 
  const canIds = useSelector(state => state.controls.canIds);
  const canStatus = useSelector(state => state.controls.canStarted);
  const loading = useSelector(state => state.controls.loading);

  const [canStarted, setCan] = useState(canStatus);
  const [allIds, setAllIds] = useState(canIds);

  useEffect(() => {
    dispatch(requestCanId())
  },[])

  useEffect(() => {
    // console.log(Object.keys(canIds))
    setAllIds(canIds)
  }, [canIds]);

  useEffect(() => {
    setCan(canStatus);
  }, [canStatus]);

  const handleStopCan = () => {
    dispatch(stopCan());
  };

  const handleStartCan = () => {
    dispatch(startCan());
  };

  const handleRead = () => {
    dispatch(readData());
  };

  const handleWriteIdCan = () => {
    dispatch(writeCanId(allIds));
  };

  const changeHandler = e => {
    setAllIds({...allIds, [e.target.name]: e.target.value})
  };

  const textFields = canIdsArray.map(el => {
    return <TextField
              size={'small'}
              name={el}
              key={el}
              id={el}
              label={el.toUpperCase()}
              value={allIds[el]}
              onChange={changeHandler}
              variant="outlined"
              style={{marginRight:'5px'}}
              InputLabelProps={{ shrink: true }}
    />
 })
  return (
    <>
      <div style={{display: 'flex', justifyContent: 'space-between'}}>
          {textFields}
      </div>
      <div style={{marginTop: '5px', textAlign: 'center'}}>
        <Button
            variant="contained"
            color="primary"
            size="small"
            onClick={handleWriteIdCan}
            disabled={loading || allIds == canIds}
            className={classes.button}
            startIcon={<SaveIcon />}
        >
          Set ID
        </Button>
      </div>
      <LabelledOutline label={'CAN'}>
          <div style={{display: 'flex', justifyContent: 'space-around'}}>
            <SuccessButton
                variant="contained"
                disabled={canStarted || loading}
                size="small"
                className={classes.button}
                onClick={handleStartCan}
            >
              Start
            </SuccessButton>
            <Button
                variant="contained"
                disabled={!canStarted || loading}
                color={"secondary"}
                size="small"
                className={classes.button}
                onClick={handleStopCan}
            >
              Stop
            </Button>
          </div>
      </LabelledOutline>
      <LabelledOutline label={'SD Card'} style={{marginTop: '30px', display: 'flex', justifyContent: 'space-between'}}>
        <div style={{display: 'flex', justifyContent: 'space-around'}}>
            <Button
                variant="contained"
                color="secondary"
                size="small"
                className={classes.button}
                disabled={loading}
            >
              Format
            </Button>
        <Button
            variant="contained"
            color="primary"
            size="small"
            className={classes.button}
            disabled={loading}
            onClick={handleRead}
        >
          Read
        </Button>
        </div>
      </LabelledOutline>
      <div style={{marginTop: '10px'}}>
        {loading && <LinearProgress />}
      </div>
    </>
  );
}
