import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import MainNav from "./MainNav";
import AuthNav from "./AuthNav";

const Auth = createStackNavigator();

const AppNav = () => {
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
          <Auth.Screen name="AuthNav" options={{ headerShown: false }}>
            {(props) => (
              <AuthNav
                {...props}
                onLogin={handleLogin}
                onSignUp={handleLogin}
              />
            )}
          </Auth.Screen>
        )}
      </Auth.Navigator>
    </NavigationContainer>
  );
};

export default AppNav;
