import React from "react";
import {
  createStackNavigator,
  CardStyleInterpolators,
} from "@react-navigation/stack";
import LoginScreen from "../auth/LoginScreen";
import LoginForm from "../auth/LoginForm";
import SignUpScreen from "../auth/SignUpScreen";
import SignUpForm from "../auth/SignUpForm";

const Stack = createStackNavigator();

const AuthNav = ({ onLogin, onSignUp }) => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
      cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
    }}
  >
    <Stack.Screen name="LoginScreen">
      {(props) => (
        <LoginScreen
          {...props}
          onSignUpScreen={() => props.navigation.navigate("SignUpScreen")}
        />
      )}
    </Stack.Screen>
    <Stack.Screen name="SignUpScreen">
      {(props) => (
        <SignUpScreen
          {...props}
          onLoginScreen={() => props.navigation.navigate("LoginScreen")}
        />
      )}
    </Stack.Screen>
    <Stack.Screen name="Login">
      {(props) => <LoginForm {...props} onLogin={onLogin} />}
    </Stack.Screen>
    <Stack.Screen name="Sign up">
      {(props) => <SignUpForm {...props} onSignUp={onSignUp} />}
    </Stack.Screen>
  </Stack.Navigator>
);

export default AuthNav;
