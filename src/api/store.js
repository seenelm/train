import { configureStore } from "@reduxjs/toolkit";
import {
  usersReducer,
  setUsername,
  setPassword,
  setName,
} from "../features/auth/usersSlice";
import { groupsReducer } from "../features/groups/groupsSlice";
import overlayReducer from "../features/groups/overlaySlice";
import { apiSlice } from "./apiSlice";

export function setupStore(preloadedState) {
  return configureStore({
    reducer: {
      users: usersReducer,
      groups: groupsReducer,
      overlay: overlayReducer,
      [apiSlice.reducerPath]: apiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => {
      return getDefaultMiddleware().concat(apiSlice.middleware);
    },
    preloadedState,
  });
}

export { setUsername, setPassword, setName };
