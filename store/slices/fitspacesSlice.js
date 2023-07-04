import { createSlice } from "@reduxjs/toolkit";
import { addFitSpace } from "../thunks/addFitSpace";

const fitspacesSlice = createSlice({
  name: "fitspaces",
  initialState: {
    isLoading: false,
    data: [],
    error: null,
  },
  extraReducers(builder) {
    builder.addCase(addFitSpace.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(addFitSpace.fulfilled, (state, action) => {
      state.data.push(action.payload);
    });
    builder.addCase(addFitSpace.rejected, (state, action) => {
      state.error = action.error;
    });
  },
});

export const fitspacesReducer = fitspacesSlice.reducer;
