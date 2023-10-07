import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const fetchGroups = createAsyncThunk("groups/fetch", async ({ userId }) => {
  try {
    const response = await axios.get(`${Config.API_URL}/api/users/${userId}`);

    return response.data;
  } catch (error) {
    console.log("Error: ", error);
  }
});

export { fetchGroups };
