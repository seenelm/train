import React, { useEffect } from "react";
import { Animated } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { fetchCredentials } from "../api/actions";
import { NavigationContainer } from "@react-navigation/native";
import AuthNav from "../nav/authNav";
import MainNav from "../nav/mainNav";

const AppLoading = () => {
  const dispatch = useDispatch();
  const fadeAnim = new Animated.Value(1);
  const { isLoggedIn } = useSelector((state) => state.users);

  useEffect(() => {
    const checkStatus = async () => {
      await fetchCredentials(dispatch);
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 2000,
        useNativeDriver: true,
      }).start();
    };
    checkStatus();
  }, []);

  return (
    <NavigationContainer>
      {isLoggedIn ? <MainNav /> : <AuthNav />}
    </NavigationContainer>
  );
};

export default AppLoading;
