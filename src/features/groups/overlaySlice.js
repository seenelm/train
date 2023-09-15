// overlaySlice.js

import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  isVisible: false,
};

const overlaySlice = createSlice({
  name: 'overlay',
  initialState,
  reducers: {
    showOverlay: state => {
      state.isVisible = true;
    },
    hideOverlay: state => {
      state.isVisible = false;
    },
  },
});

export const {showOverlay, hideOverlay} = overlaySlice.actions;

export default overlaySlice.reducer;
