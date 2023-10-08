import * as Keychain from "react-native-keychain";
import { setUsername, setIsLoggedIn } from "../features/auth/usersSlice.js";

export const fetchCredentials = async (dispatch) => {
  try {
    const credentials = await Keychain.getGenericPassword();
    console.log("Credentials: ", credentials.password);
    if (credentials) {
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

export const storeToken = async (username, token) => {
  console.log("Token to be Stored: ", token);

  await Keychain.setGenericPassword(username, token).catch((error) => {
    console.log("Error storing token in KeyChain: ", error);
  });
};

export const getToken = async () => {
  const keychainToken = await Keychain.getGenericPassword().catch((error) => {
    console.log("Error getting token: ", error);
  });
  let token = keychainToken.password;
  if (token !== null) {
    return token;
  }
};
