import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Config from "react-native-config";
import * as Keychain from "react-native-keychain";

export const loginUser = createAsyncThunk(
  "users/login",
  async ({ username, password }, thunkAPI) => {
    try {
      const data = {
        username: username,
        password: password,
      };

      //const response = await axios.post(`${Config.API_URL}/api/login`, data);
      const response = await axios.post(
        "http://192.168.1.24:3000/api/login",
        data
      );

      await Keychain.setGenericPassword(
        response.data.userId,
        response.data.token
      );

      return response.data;
    } catch (error) {
      if (error.response && error.response.data && error.response.data.errors) {
        return thunkAPI.rejectWithValue(error.response.data.errors);
      } else {
        throw error;
      }
    }
  }
);
