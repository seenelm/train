import axios from "axios";

export const checkCredentials = async (username, password) => {
  try {
    const response = await axios.post("http://localhost:3000/login", {
      username,
      password,
    });
    return response;
  } catch (error) {
    if (error.response && error.response.status === 400) {
      // If it's a 400 error, return the response instead of throwing
      return error.response;
    } else {
      console.error("Error in axios request:", error);
      throw error;
    }
  }
};

export const createUser = async (username, password) => {
  try {
    const response = await axios.post("http://localhost:3000/signup", {
      username,
      password,
    });
    return response;
  } catch (error) {
    console.error("Error in axios request:", error);
    throw error;
  }
};
