import { useEffect, useState } from "react";
import { Animated, Image, Dimensions } from "react-native";
import * as Fonts from "expo-font";

const AppLoading = () => {
  const [fadeAnim] = useState(new Animated.Value(1));

  const loadResources = async () => {
    try {
      await loadFonts();
    } catch (error) {
      console.error(error);
    } finally {
      Animated.timing(fadeAnim, {
        toValue: 10,
        duration: 1500,
        useNativeDriver: true,
      }).start();
    }
  };

  const loadFonts = async () => {
    return Fonts.loadAsync({
      bold: require("../assets/fonts/Roboto-Bold.ttf"),
      italic: require("../assets/fonts/Roboto-Italic.ttf"),
      regular: require("../assets/fonts/Roboto-Regular.ttf"),
    });
  };

  useEffect(() => {
    loadResources();
  }, []);

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
