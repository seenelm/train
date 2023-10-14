import { configureStore, combineReducers } from "@reduxjs/toolkit";
import overlayReducer from "../features/groups/overlaySlice";
import { apiSlice } from "./apiSlice";
import { usersReducer } from "../features/auth/usersSlice";

import {
  persistStore,
  persistReducer,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";

const flipperDebugger = require("redux-flipper").default;

const rootReducer = combineReducers({
  [apiSlice.reducerPath]: apiSlice.reducer,
  users: usersReducer,
  overlay: overlayReducer,
});

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: false,
    }).concat(apiSlice.middleware);
  },
});

export function setupStore(preloadedState) {
  return configureStore({
    reducer: {
      users: usersReducer,
      overlay: overlayReducer,
      [apiSlice.reducerPath]: apiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => {
      return getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }).concat(apiSlice.middleware);
    },
    preloadedState,
  });
}

export const persistor = persistStore(store);
