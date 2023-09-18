import React, { useEffect, useState } from "react";
import { Animated, Image, Dimensions, Text, View } from "react-native";
import * as Font from "react-native-global-font";

const AppLoading = () => {
  const [fadeAnim] = useState(new Animated.Value(1));

  // const loadResources = async () => {
  //   try {
  //     Font.applyGlobal('Roboto-Regular'); // Set the default global font
  //   } catch (error) {
  //     console.error(error);
  //   } finally {
  //     Animated.timing(fadeAnim, {
  //       toValue: 0,
  //       duration: 1500,
  //       useNativeDriver: true,
  //     }).start();
  //   }
  // };

  // useEffect(() => {
  //   loadResources();
  // }, []);

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
};

export default AppLoading;
