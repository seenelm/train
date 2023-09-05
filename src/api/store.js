import {configureStore, combineReducers} from '@reduxjs/toolkit';
import {
  usersReducer,
  setUsername,
  setPassword,
  clearErrors,
  setName,
} from '../features/auth/usersSlice';
import {groupsReducer} from '../features/groups/groupsSlice';

const rootReducer = combineReducers({
  users: usersReducer,
  groups: groupsReducer,
});

export function setupStore(preloadedState) {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  });
}

export {setUsername, setPassword, clearErrors, setName};
export * from '../features/auth/registerUser';
export * from '../features/auth/loginUser';
