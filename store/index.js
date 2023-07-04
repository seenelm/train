import { configureStore } from "@reduxjs/toolkit";
import { fitspacesReducer } from "./slices/fitspacesSlice";

export const store = configureStore({
  reducer: {
    fitspaces: fitspacesReducer,
  },
});

export * from "./thunks/addFitSpace";
