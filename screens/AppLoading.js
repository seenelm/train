import { useEffect } from "react";
import * as SplashScreen from "expo-splash-screen";
import * as Fonts from "expo-font";

const AppLoading = ({ setAppLoaded }) => {
  const loadFonts = async () => {
    try {
      SplashScreen.preventAutoHideAsync();

      await Fonts.loadAsync({
        bold: require("../assets/fonts/Roboto-Bold.ttf"),
        italic: require("../assets/fonts/Roboto-Italic.ttf"),
        regular: require("../assets/fonts/Roboto-Regular.ttf"),
      });
    } catch (error) {
      console.error(error);
    } finally {
      setAppLoaded(true);
      SplashScreen.hideAsync();
    }
  };

  useEffect(() => {
    loadFonts();
  }, [setAppLoaded]);

  return null;
};

export default AppLoading;
