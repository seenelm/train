import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import MainNav from "./mainNav";
import AuthNav from "./authNav";
import { useSelector } from "react-redux";

const AppNav = () => {
  const { isLoggedIn } = useSelector((state) => state.users);

  return (
    <NavigationContainer>
      {isLoggedIn ? <MainNav /> : <AuthNav />}
    </NavigationContainer>
  );
};

export default AppNav;
