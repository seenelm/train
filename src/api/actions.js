import * as Keychain from "react-native-keychain";
import { setUsername, setIsLoggedIn } from "../features/auth/usersSlice.js";

export const fetchCredentials = async (dispatch) => {
  try {
    const credentials = await Keychain.getGenericPassword();

    if (credentials && credentials.password) {
      const [userId, token] = credentials.password.split(":");
      dispatch(setUsername(credentials.username));
      dispatch(setIsLoggedIn(true));
    } else {
      console.log("No credentials are stored");
    }
  } catch (error) {
    console.error("Error accessing Keychain:", error);
  }
};

export const getToken = async () => {
  const credentials = await Keychain.getGenericPassword().catch((error) => {
    console.log("Error getting token: ", error);
  });
  if (credentials && credentials.password) {
    const [userId, token] = credentials.password.split(":");
    return { userId, token };
  }
  return null;
};
