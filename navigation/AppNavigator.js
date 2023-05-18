import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import MainNav from "./MainNav";
import LoginScreen from "../screens/LoginScreen";
import SignUpScreen from "../screens/SignUpScreen";

const Auth = createStackNavigator();

const AppNavigator = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <NavigationContainer>
      <Auth.Navigator>
        {isLoggedIn ? (
          <Auth.Screen
            name="MainNav"
            component={MainNav}
            options={{ headerShown: false }}
          />
        ) : (
          <>
            <Auth.Screen name="LoginScreen" options={{ headerShown: false }}>
              {(props) => <LoginScreen {...props} onLogin={handleLogin} />}
            </Auth.Screen>
            <Auth.Screen
              name="SignUpScreen"
              component={SignUpScreen}
              options={{ headerShown: false }}
            ></Auth.Screen>
          </>
        )}
      </Auth.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
