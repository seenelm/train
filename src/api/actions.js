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
      console.log("No credentials are stored");
    }
  } catch (error) {
    console.error("Error accessing Keychain:", error);
  }
};

export const storeToken = async (token, dipatch) => {
  console.log("Token to be Stored: ", token);

  await Keychain.setGenericPassword("userToken", token).catch((error) => {
    console.log("Error storing token in KeyChain: ", error);
  });
};

export const getToken = async () => {
  const token = await Keychain.getGenericPassword().catch((error) => {
    console.log("Error getting token: ", error);
  });
  if (token !== null) {
    return token;
  }
};
