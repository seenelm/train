import * as Keychain from "react-native-keychain";
import {
  setUserId,
  setIsLoggedIn,
  setCheckingLoginStatus,
} from "../features/auth/usersSlice";

// Define the checkLoginStatus function
export const checkLoginStatus = () => async (dispatch) => {
  //   dispatch(setCheckingLoginStatus(true));

  try {
    const credentials = await Keychain.getGenericPassword();
    if (credentials) {
      dispatch(setUserId(credentials.username));
      dispatch(setIsLoggedIn(true));
    } else {
      dispatch(setIsLoggedIn(false));
    }
  } catch (error) {
    console.error("Error fetching credentials from Keychain:", error);
    dispatch(setIsLoggedIn(false));
  } finally {
    setTimeout(() => {
      dispatch(setCheckingLoginStatus(false));
    }, 250);
  }
};
