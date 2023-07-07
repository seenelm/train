import React from "react";
import {
  createStackNavigator,
  CardStyleInterpolators,
} from "@react-navigation/stack";
import AuthForm from "../auth/AuthForm";
import LoginForm from "../auth/LoginForm";
import SignUpForm from "../auth/SignUpForm";
import ForgotForm from "../auth/ForgotForm";
import OTPForm from "../auth/OTPForm";

const Stack = createStackNavigator();

const AuthNav = ({ onLogin, onSignUp }) => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
      cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid,
    }}
  >
    <Stack.Screen name="AuthForm">
      {(props) => (
        <AuthForm
          {...props}
          onLoginForm={() => props.navigation.navigate("Login")}
          onSignUpForm={() => props.navigation.navigate("Sign up")}
        />
      )}
    </Stack.Screen>
    <Stack.Screen name="Login">
      {(props) => <LoginForm {...props} onLogin={onLogin} />}
    </Stack.Screen>
    <Stack.Screen name="Sign up">
      {(props) => <SignUpForm {...props} onSignUp={onSignUp} />}
    </Stack.Screen>
    <Stack.Screen
      name="ForgotForm"
      component={ForgotForm}
      options={{
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}
    />
    <Stack.Screen
      name="OTP"
      component={OTPForm}
      options={{
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}
    />
  </Stack.Navigator>
);

export default AuthNav;
