import {createSlice} from '@reduxjs/toolkit';
import {registerUser} from './registerUser';
import {loginUser} from './loginUser';

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    username: '',
    password: '',
    name: '',
    userId: null,
    errors: {},
    loading: false,
    success: null,
  },
  reducers: {
    setUsername: (state, action) => {
      state.username = action.payload;
    },
    setPassword: (state, action) => {
      state.password = action.payload;
    },
    clearErrors: state => {
      state.errors = {};
      state.errorMessage = '';
    },
    setName: (state, action) => {
      state.name = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(registerUser.pending, (state, action) => {
      state.loading = true;
      state.userId = null;
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.loading = false;
      state.errors = {};
      state.userId = action.payload.userId;
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.loading = false;
      state.errors = action.payload;
      state.userId = null;
    });
    builder.addCase(loginUser.pending, (state, action) => {
      state.loading = true;
      state.success = null;
      state.userId = null;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.loading = false;
      state.success = action.payload;
      state.userId = action.payload.userId;
      state.errors = {};
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.loading = false;
      state.success = null;
      state.userId = null;
      state.errors = action.payload;
    });
  },
});

export const {setUsername, setPassword, clearErrors, setName} =
  usersSlice.actions;
export const usersReducer = usersSlice.reducer;
