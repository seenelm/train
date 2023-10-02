import * as Keychain from "react-native-keychain";
import { setHasToken } from "../features/auth/usersSlice";

export const storeToken = async (token, dipatch) => {
  console.log("Token to be Stored: ", token);

  await Keychain.setGenericPassword("userToken", token).catch((error) => {
    console.log("Error storing token in KeyChain: ", error);
  });

  setHasToken(true);
};

export const getToken = async () => {
  const token = await Keychain.getGenericPassword().catch((error) => {
    console.log("Error getting token: ", error);
  });
  if (token !== null) {
    return token;
  }
};
