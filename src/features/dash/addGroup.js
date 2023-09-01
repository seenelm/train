import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

const addGroup = createAsyncThunk('groups/add', async ({name, userId}) => {
  try {
    const data = {
      name: name,
      userId: userId,
    };

    const response = await axios.post(
      'http://192.168.0.107:3000/api/groups',
      data,
    );

    return response.data;
  } catch (error) {
    console.log('Error: ', error);
  }
});

export {addGroup};
