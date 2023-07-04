import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const addFitSpace = createAsyncThunk("fitspaces/add", async (name) => {
  const response = await axios.post("http://192.168.1.59:3000/fitspaces", {
    fitspaceName: name,
  });
  console.log({ response });
  return response.data;
});

export { addFitSpace };
