import { createSlice } from '@reduxjs/toolkit';
import {get} from "../../provider";

export const controlsSlice = createSlice({
  name: 'controls',
  initialState: {
    loading: false,
    canStarted: false,
    data: [],
    canIds: {
        id1: 0,
        id2: 0,
        id3: 0,
        id4: 0,
    }
  },
  reducers: {
    setCanId: (state, action) => {
        let canIds = action.payload;
        state.canIds = canIds;
    },
    setLoading: (state, action) => {
        state.loading = action.payload;
    },
    setCanStart: (state, action) => {
        state.canStarted = true
    },
    setCanStop: (state, action) => {
        state.canStarted = false
    },
    setData: (state, action) => {
      state.data = action.payload
    }
  },
});

export const { setCanId, setCanStart, setCanStop, setData } = controlsSlice.actions;
const {setLoading} = controlsSlice.actions;

export const requestCanId = () => async dispatch => {
    dispatch(setLoading(true))
    const response = await get('getidcan');
    if (response.status === 200) {
        let ids = response.data;
        dispatch(setCanId(ids))
    }
    dispatch(setLoading(false));
};

export const writeCanId = (ids) => async dispatch => {
    dispatch(setLoading(true))
    const response = await get(`wridcan`, {params: ids});
    if (response.status === 200) {
        let ids = response.data;
        dispatch(setCanId(ids))
    }
    dispatch(setLoading(false));
}

export const startCan = () => async dispatch => {
    dispatch(setLoading(true));
    try {
        const response = await get('start');
        (response.status === 200) && dispatch(setCanStart());
    } catch (e) {
        console.log(e)
    }

    dispatch(setLoading(false));
}

export const stopCan = () => async dispatch => {
    dispatch(setLoading(true));
    try {
        const response = await get('stop');
        (response.status === 200) && dispatch(setCanStop());
    } catch (e) {
        console.log(e)
    }
    dispatch(setLoading(false));
}

export const readData = () => async dispatch => {
    dispatch(setLoading(true));
    const response = await get('read-sd');
    console.log(response)
    if(response.status === 200) {
        let responseData = JSON.stringify(response.data);
        console.log(responseData)
        let arrays = [];
        let size = 11;
        let dataArr = responseData.replace(/(\\r\\n|\\n|\\r|'|")/gm,'').split(' ').filter(el => el.length > 0);
        if (dataArr.length > 0) {
            while (dataArr.length > 0) {
                arrays.push(dataArr.splice(0, size))
            }

        }
        dispatch(setData(arrays));
    }

    dispatch(setLoading(false));
}

export default controlsSlice.reducer;
