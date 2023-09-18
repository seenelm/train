import React from "react";
import {
  createStackNavigator,
  CardStyleInterpolators,
} from "@react-navigation/stack";
import Landing from "../features/auth/landing";
import SignIn from "../features/auth/signIn";
import SignUp from "../features/auth/signUp";

const Stack = createStackNavigator();

const AuthNav = ({ onLogin, onSignUp }) => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
      cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
    }}
  >
    <Stack.Screen name="AuthForm">
      {(props) => (
        <Landing
          {...props}
          onLoginForm={() => props.navigation.navigate("Login")}
          onSignUpForm={() => props.navigation.navigate("Sign up")}
        />
      )}
    </Stack.Screen>
    <Stack.Screen name="Login">
      {(props) => <SignIn {...props} onLogin={onLogin} />}
    </Stack.Screen>
    <Stack.Screen name="Sign up">
      {(props) => <SignUp {...props} onSignUp={onSignUp} />}
    </Stack.Screen>
  </Stack.Navigator>
);

export default AuthNav;
