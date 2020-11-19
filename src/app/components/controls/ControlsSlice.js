import { createSlice } from '@reduxjs/toolkit';
import {get} from "../../provider";

export const controlsSlice = createSlice({
  name: 'controls',
  initialState: {
    loading: false,
    canStarted: false,
    data: [],
    canIds: {
        id1: 12,
        id2: 32,
        id3: 22,
        id4: 222,
    }
  },
  reducers: {
    setCanId: (state, action) => {
        let canIds = {...state.canIds};
        [1,2,3,4].forEach(number => {
            canIds[`id${number}`] = action.payload[`id${number}`]    
        });
        state.canIds = canIds;
    },
    setLoading: (state, action) => {
        state.loading = action.payload;
    },
    setCanStart: (state) => {
        state.canStarted = true
    },
    setCanStop: (state) => {
        state.canStarted = true
    },
    setData: (state, action) => {
      state.data = action.payload
    }
  },
});

export const { setCanId, setCanStart, setCanStop } = controlsSlice.actions;
const {setLoading} = controlsSlice.actions;

export const requestCanId = () => async dispatch => {
    dispatch(setLoading(true))
    const response = await get('getidcan');
    if (response.ok) {
        let ids = await response.json();
        dispatch(setCanId(ids))
    }
    dispatch(setLoading(false));
}

export const startCan = () => async dispatch => {
    dispatch(setLoading(true))
    const response = await get('start');

    response.ok && dispatch(setCanStart());

    dispatch(setLoading(false));
}

export const stopCan = () => async dispatch => {
    dispatch(setLoading(true))
    const response = await get('stop');

    response.ok && dispatch(setCanStop());

    dispatch(setLoading(false));
}

export const readData = () => async dispatch => {
    dispatch(setLoading(true))
    const response = await get('read-sd');

    if(response.ok) {
        let responseData = await response.json();
        let arrays = [];
        let size = 11;
        let dataArr = responseData.replace(/(\\r\\n|\\n|\\r)/gm,'').split(' ').filter(el => el.length > 0);
        if (dataArr.length > 0) {
            while (dataArr.length > 0) {
                arrays.push(dataArr.splice(0, size))
            }

        }
    }

    dispatch(setLoading(false));
}

export default controlsSlice.reducer;
