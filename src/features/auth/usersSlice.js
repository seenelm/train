import { createSlice } from "@reduxjs/toolkit";
import * as Keychain from "react-native-keychain";

const usersSlice = createSlice({
  name: "users",
  initialState: {
    username: "",
    password: "",
    name: "",
    errors: {},
    isLoggedIn: false,
  },
  reducers: {
    setUsername: (state, action) => {
      state.username = action.payload;
    },
    setPassword: (state, action) => {
      state.password = action.payload;
    },
    setName: (state, action) => {
      state.name = action.payload;
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

export const { setUsername, setPassword, setName, logout, setIsLoggedIn } =
  usersSlice.actions;

export const usersReducer = usersSlice.reducer;
