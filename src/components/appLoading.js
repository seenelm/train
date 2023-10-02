import React, { useEffect } from "react";
import { Animated, Image, Dimensions } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { checkLoginStatus, checkLogin } from "../api/actions";
import { NavigationContainer } from "@react-navigation/native";
import MyDrawer from "../nav/drawerNav";
import AuthNav from "../nav/authNav";

const AppLoading = () => {
  const dispatch = useDispatch();
  const fadeAnim = new Animated.Value(1);
  const { isLoggedIn, isCheckingLoginStatus } = useSelector(
    (state) => state.users
  );

  useEffect(() => {
    // const checkStatus = () => {
    //   checkLoginStatus(dispatch).catch((err) => {
    //     console.log("Error login status: ", err);
    //   });
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 2000,
      useNativeDriver: true,
    }).start();
    // };
    // checkStatus();
  }, []);

  // useEffect(() => {
  //   const checkStatus = () => {
  //     checkLogin(dispatch);
  //     Animated.timing(fadeAnim, {
  //       toValue: 0,
  //       duration: 2000,
  //       useNativeDriver: true,
  //     }).start();
  //   };
  //   checkStatus();
  // }, [dispatch]);

  if (isCheckingLoginStatus) {
    return (
      <Animated.View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "white",
          opacity: fadeAnim, // animated opacity
        }}
      >
        <Image
          source={require("../assets/splash.png")}
          style={{
            position: "absolute",
            width: Dimensions.get("window").width,
            height: Dimensions.get("window").height,
            resizeMode: "cover",
          }}
        />
      </Animated.View>
    );
  }

  return (
    <NavigationContainer>
      {isLoggedIn ? <MyDrawer /> : <AuthNav />}
    </NavigationContainer>
  );
};

export default AppLoading;
