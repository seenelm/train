import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const addGroup = createAsyncThunk("groups/add", async ({ name, userId }) => {
  try {
    const data = {
      name: name,
      userId: userId,
    };

    const response = await axios.post(`${Config.API_URL}/api/groups`, data);
    return response.data;
  } catch (error) {
    console.log("Error: ", error);
  }
});

export { addGroup };
