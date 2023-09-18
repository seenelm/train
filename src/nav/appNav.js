import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import MyDrawer from "./drawerNav";
import AuthNav from "./authNav";
import { useDispatch, useSelector } from "react-redux";
import { setIsLoggedIn, setToken } from "../features/auth/usersSlice";
import * as Keychain from "react-native-keychain";

const AppNav = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.users.isLoggedIn);

  const handleLogin = () => {
    dispatch(setIsLoggedIn(true));
  };

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const credentials = await Keychain.getGenericPassword();
        if (credentials && credentials.password) {
          dispatch(setToken(credentials.password));
          dispatch(setIsLoggedIn(true));
        }
      } catch (error) {
        console.error("Error in fetchToken:", error);
      }
    };
    fetchToken();
  }, [dispatch]);

  return (
    <NavigationContainer>
      {isLoggedIn ? <MyDrawer /> : <AuthNav onLogin={handleLogin} />}
    </NavigationContainer>
  );
};

export default AppNav;
