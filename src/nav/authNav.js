import React from 'react';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import Landing from '../features/auth/landing';
import SignIn from '../features/auth/signIn';
import SignUp from '../features/auth/signUp';
// import ForgotForm from '../screens/ForgotPassword';
// import OTPForm from '../screens/Pin';
// import PasswordForm from '../screens/ResetPassword';

const Stack = createStackNavigator();

const AuthNav = ({onLogin, onSignUp}) => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
      cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
    }}>
    <Stack.Screen name="AuthForm">
      {props => (
        <Landing
          {...props}
          onLoginForm={() => props.navigation.navigate('Login')}
          onSignUpForm={() => props.navigation.navigate('Sign up')}
        />
      )}
    </Stack.Screen>
    <Stack.Screen name="Login">
      {props => <SignIn {...props} onLogin={onLogin} />}
    </Stack.Screen>
    <Stack.Screen name="Sign up">
      {props => <SignUp {...props} onSignUp={onSignUp} />}
    </Stack.Screen>
    {/* <Stack.Screen
      name="ForgotForm"
      component={ForgotForm}
      options={{
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}
    /> */}
    {/* <Stack.Screen
      name="OTP"
      component={OTPForm}
      options={{
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}
    />
    <Stack.Screen
      name="Pass"
      component={PasswordForm}
      options={{
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}
    /> */}
  </Stack.Navigator>
);

export default AuthNav;
