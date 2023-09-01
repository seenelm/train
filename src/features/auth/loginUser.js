import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

const loginUser = createAsyncThunk(
  'users/login',
  async ({username, password}, thunkAPI) => {
    try {
      const data = {
        username: username,
        password: password,
      };

      const response = await axios.post(
        'http://192.168.0.107:3000/api/login',
        data,
      );

      return response.data;
    } catch (error) {
      if (error.response.data.errors) {
        return thunkAPI.rejectWithValue(error.response.data.errors);
      }
    }
  },
);

export {loginUser};
