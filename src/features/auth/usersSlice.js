import { createSlice, createSelector } from "@reduxjs/toolkit";
import * as Keychain from "react-native-keychain";

const usersSlice = createSlice({
  name: "users",
  initialState: {
    username: "",
    password: "",
    name: "",
    userId: null,
    errors: {},
    isLoggedIn: false,
    isCheckingLoginStatus: false,
    hasToken: false,
  },
  reducers: {
    setUsername: (state, action) => {
      state.username = action.payload;
    },
    setPassword: (state, action) => {
      state.password = action.payload;
    },
    clearErrors: (state) => {
      state.errors = {};
    },
    setName: (state, action) => {
      state.name = action.payload;
    },
    setUserId: (state, action) => {
      state.userId = action.payload;
      console.log("UserId: ", state.userId);
    },
    setCheckingLoginStatus: (state, action) => {
      state.isCheckingLoginStatus = action.payload;
    },
    setIsLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload;
    },
    logout: (state) => {
      state.username = "";
      state.password = "";
      state.name = "";
      state.errors = {};
      state.isLoggedIn = false;
      Keychain.resetGenericPassword();
    },
  },
});

export const {
  setUsername,
  setPassword,
  clearErrors,
  setName,
  logout,
  setIsLoggedIn,
  setCheckingLoginStatus,
  setUserId,
} = usersSlice.actions;

export const selectUserById = createSelector(
  (state) => state.users,
  (users) => users.userId
);

export const usersReducer = usersSlice.reducer;
