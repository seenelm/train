import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

const fetchGroups = createAsyncThunk('groups/fetch', async ({userId}) => {
  try {
    const response = await axios.get(`http://192.168.0.107:3000/api/${userId}`);

    return response.data;
  } catch (error) {
    console.log('Error: ', error);
  }
});

export {fetchGroups};
