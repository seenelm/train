import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Config from "react-native-config";

const fetchGroups = createAsyncThunk("groups/fetch", async ({ userId }) => {
  try {
    // const response = await axios.get(`${Config.API_URL}/api/users/${userId}`);
    const response = await axios.get(
      `http://192.168.1.24:3000/api/users/${userId}`
    );

    return response.data;
  } catch (error) {
    console.log("Error: ", error);
  }
});

export { fetchGroups };
