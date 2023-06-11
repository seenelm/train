import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  username: "",
  password: "",
  hasError: false,
  errorMessage: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUsername: (state, action) => {
      state.username = action.payload;
    },
    setPassword: (state, action) => {
      state.password = action.payload;
    },
    setHasError: (state, action) => {
      state.hasError = action.payload;
    },
    setErrorMessage: (state, action) => {
      state.errorMessage = action.payload;
    },
  },
});

export const { setUsername, setPassword, setHasError, setErrorMessage } =
  userSlice.actions;

export default userSlice.reducer;
