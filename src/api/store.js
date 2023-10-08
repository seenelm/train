import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { groupsReducer } from "../features/groups/groupsSlice";
import overlayReducer from "../features/groups/overlaySlice";
import { apiSlice } from "./apiSlice";
// import { setupListeners } from "@reduxjs/toolkit/dist/query/index.js";
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
  users: usersReducer,
  groups: groupsReducer,
  overlay: overlayReducer,
  [apiSlice.reducerPath]: apiSlice.reducer,
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

// export const store = configureStore({
//   reducer: {
//     users: usersReducer,
//     groups: groupsReducer,
//     overlay: overlayReducer,
//     [apiSlice.reducerPath]: apiSlice.reducer,
//   },
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware()
//       .concat(apiSlice.middleware)
//       .concat(flipperDebugger()),
// });

export function setupStore(preloadedState) {
  return configureStore({
    reducer: {
      users: usersReducer,
      groups: groupsReducer,
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

// setupListeners(store.dispatch);
export const persistor = persistStore(store);
