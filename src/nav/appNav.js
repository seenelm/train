import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import MyDrawer from "./drawerNav";
import AuthNav from "./authNav";
import { useSelector } from "react-redux";
import { checkLoginStatus } from "../api/actions";

const AppNav = () => {
  const { isLoggedIn } = useSelector((state) => state.users);

  return (
    <NavigationContainer>
      {isLoggedIn ? (
        <MyDrawer />
      ) : (
        <AuthNav onLogin={checkLoginStatus} onSignUp={checkLoginStatus} />
      )}
    </NavigationContainer>
  );
};

export default AppNav;
