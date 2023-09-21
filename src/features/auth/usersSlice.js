import { createSlice } from "@reduxjs/toolkit";
import { registerUser } from "./registerUser";
import { loginUser } from "./loginUser";
import * as Keychain from "react-native-keychain";

const usersSlice = createSlice({
  name: "users",
  initialState: {
    username: "",
    password: "",
    name: "",
    userId: null,
    errors: {},
    loading: false,
    success: null,
    isLoggedIn: false,
    token: null,
    isCheckingLoginStatus: true,
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
    setCheckingLoginStatus: (state, action) => {
      state.isCheckingLoginStatus = action.payload;
    },
    setIsLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload;
    },
    setUserId: (state, action) => {
      state.userId = action.payload;
    },
    logout: (state) => {
      state.username = "";
      state.password = "";
      state.name = "";
      state.userId = null;
      state.errors = {};
      state.loading = false;
      state.success = null;
      state.isLoggedIn = false;
      state.token = null;
      Keychain.resetGenericPassword();
    },
  },
  extraReducers(builder) {
    builder.addCase(registerUser.pending, (state, action) => {
      state.loading = true;
      state.userId = null;
      state.isLoggedIn = false;
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.loading = false;
      state.errors = {};
      state.userId = action.payload.userId;
      state.isLoggedIn = true;
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.loading = false;
      state.errors = action.payload;
      state.userId = null;
      state.isLoggedIn = false;
    });
    builder.addCase(loginUser.pending, (state, action) => {
      state.loading = true;
      state.success = null;
      state.userId = null;
      state.isLoggedIn = false;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.loading = false;
      state.success = action.payload;
      state.userId = action.payload.userId;
      state.errors = {};
      state.isLoggedIn = true;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.loading = false;
      state.success = null;
      state.userId = null;
      state.errors = action.payload;
      state.isLoggedIn = false;
    });
  },
});

export const {
  setUsername,
  setPassword,
  clearErrors,
  setName,
  logout,
  setToken,
  setIsLoggedIn,
  setUserId,
  setCheckingLoginStatus,
} = usersSlice.actions;

export const usersReducer = usersSlice.reducer;
