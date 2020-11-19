import { configureStore } from '@reduxjs/toolkit';
import controlsSlice from '../components/controls/ControlsSlice';
export default configureStore({
  reducer: {
    controls: controlsSlice
  },
});
