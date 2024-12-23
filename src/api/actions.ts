import * as Keychain from "react-native-keychain";
import { Dispatch } from 'redux';
import { setUsername, setIsLoggedIn } from "../features/auth/usersSlice";

export const fetchCredentials = async (dispatch: Dispatch) => {
  try {
    const credentials = await Keychain.getGenericPassword();

    if (credentials && credentials.password) {
      const [userId, token] = credentials.password.split(":");
      dispatch(setUsername(credentials.username));
      dispatch(setIsLoggedIn(true));
    } else {
      dispatch(setIsLoggedIn(false));
      // Navigate back to login screen
      console.log("No credentials are stored");
    }
  } catch (error) {
    console.error("Error accessing Keychain:", error);
  }
};

export const storeToken = async (username: string, token: string) => {
  console.log("Token to be Stored: ", token);

  await Keychain.setGenericPassword(username, token).catch((error) => {
    console.log("Error storing token in KeyChain: ", error);
  });
};

export const getToken = async (): Promise<string | null> => {
  const keychainToken = await Keychain.getGenericPassword().catch((error) => {
    console.log("Error getting token: ", error);
  });

  if (keychainToken) {
    let token = keychainToken.password;
    if (token !== null) {
      return token;
    }
  }

  return null;
};