import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Config from "react-native-config";
import * as Keychain from "react-native-keychain";

const loginUser = createAsyncThunk(
  "users/login",
  async ({ username, password }, thunkAPI) => {
    try {
      const data = {
        username: username,
        password: password,
      };

      const response = await axios.post(`${Config.API_URL}/api/login`, data);
      console.log("Token", response.data.token);

      if (response.data.success && response.data.token) {
        await Keychain.setGenericPassword("userToken", response.data.token);
      }

      return response.data;
    } catch (error) {
      if (error.response.data.errors) {
        return thunkAPI.rejectWithValue(error.response.data.errors);
      }
    }
  }
);

export { loginUser };
