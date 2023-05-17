import { useState, useEffect, useCallback } from "react";
import * as SplashScreen from "expo-splash-screen";
import * as Fonts from "expo-font";

export default function AppLoadingScreen({ setAppLoaded }) {
  const [isLoaded, setIsLoaded] = useState(false);

  const loadFonts = async () => {
    try {
      await Fonts.loadAsync({
        bold: require("../assets/fonts/Roboto-Bold.ttf"),
        italic: require("../assets/fonts/Roboto-Italic.ttf"),
        regular: require("../assets/fonts/Roboto-Regular.ttf"),
      });
    } catch (error) {
      console.error(error);
    } finally {
      setTimeout(() => {
        setIsLoaded(true);
      }, 2000);
    }
  };

  const handleLoadingScreen = useCallback(async () => {
    if (isLoaded) {
      await SplashScreen.hideAsync();
      setAppLoaded(true);
    }
  }, [isLoaded, setAppLoaded]);

  useEffect(() => {
    loadFonts();
  }, []);

  useEffect(() => {
    handleLoadingScreen();
  }, [isLoaded, handleLoadingScreen]);

  return null;
}
