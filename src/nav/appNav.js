import React, {useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import MyDrawer from './drawerNav';
import AuthNav from './authNav';

const AppNav = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <NavigationContainer>
      {isLoggedIn ? <MyDrawer /> : <AuthNav onLogin={handleLogin} />}
    </NavigationContainer>
  );
};

export default AppNav;
