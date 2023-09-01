import React, {useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import MyDrawer from './drawerNav';
import AuthNav from './authNav';

const AuthStack = createStackNavigator();

const AuthNavigator = ({onLogin, onSignUp}) => {
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen name="AuthNav" options={{headerShown: false}}>
        {props => <AuthNav {...props} onLogin={onLogin} onSignUp={onSignUp} />}
      </AuthStack.Screen>
    </AuthStack.Navigator>
  );
};

const AppNav = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <NavigationContainer>
      {isLoggedIn ? (
        <MyDrawer />
      ) : (
        <AuthNavigator onLogin={handleLogin} onSignUp={handleLogin} />
      )}
    </NavigationContainer>
  );
};

export default AppNav;
