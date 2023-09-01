import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

const registerUser = createAsyncThunk(
  'users/register',
  async ({username, password, name}, thunkAPI) => {
    try {
      const data = {
        username: username,
        password: password,
        name: name,
      };

      console.log('Data: ', data);

      const response = await axios.post(
        'http://192.168.0.107:3000/api/signup',
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

export {registerUser};
