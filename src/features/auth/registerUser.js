import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Config from "react-native-config";
import * as Keychain from "react-native-keychain";

const registerUser = createAsyncThunk(
  "users/register",
  async ({ username, password, name }, thunkAPI) => {
    try {
      const data = {
        username: username,
        password: password,
        name: name,
      };

      console.log("Data: ", data);

      const response = await axios.post(`${Config.API_URL}/api/register`, data);

      if (response.data.success && response.data.token) {
        await Keychain.setGenericPassword("userToken", response.data.token);
      }

      return response.data;
    } catch (error) {
      console.log("Error:", error.response.data.errors);
      if (error.response.data.errors) {
        return thunkAPI.rejectWithValue(error.response.data.errors);
      }
    }
  }
);

export { registerUser };
