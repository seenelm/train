import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
  usersReducer,
  setUsername,
  setPassword,
  clearErrors,
  setName,
} from "../features/auth/usersSlice";
import { groupsReducer } from "../features/groups/groupsSlice";
import overlayReducer from "../features/groups/overlaySlice";
import { apiSlice } from "./apiSlice";

// const rootReducer = combineReducers({
//   users: usersReducer,
//   groups: groupsReducer,
//   overlay: overlayReducer,
// });

// const reducers = {
//   users: usersReducer,
//   groups: groupsReducer,
//   overlay: overlayReducer,
//   [apiSlice.reducerPath]: apiSlice.reducer,
// };

// const reducer = combineReducers(reducers);

// export function setupStore(preloadedState) {
//   return configureStore({
//     reducer,
//     middleware: (getDefaultMiddleware) => {
//       return getDefaultMiddleware().concat(apiSlice.middleware);
//     },
//     preloadedState,
//   });
// }

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

export { setUsername, setPassword, clearErrors, setName };
export * from "../features/auth/registerUser";
export * from "../features/auth/loginUser";
