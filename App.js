import "react-native-gesture-handler";
import { useState, useEffect, useCallback } from "react";
import { StyleSheet } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import * as SplashScreen from "expo-splash-screen";
import * as Fonts from "expo-font";
import AppNavigator from "./navigation/AppNavigator";

// Make splash screen visible until app loads
SplashScreen.preventAutoHideAsync();

export default function App() {
  const [isLoaded, setIsLoaded] = useState(false);

  /**
   * Load fonts at runtime.
   */
  const loadFonts = async () => {
    try {
      await Fonts.loadAsync({
        bold: require("./assets/fonts/Roboto-Bold.ttf"),
        italic: require("./assets/fonts/Roboto-Italic.ttf"),
        regular: require("./assets/fonts/Roboto-Regular.ttf"),
      });
    } catch (error) {
      console.log.error();
    } finally {
      setTimeout(() => {
        setIsLoaded(true);
      }, 2000);
    }
  };

  useEffect(() => {
    loadFonts();
  }, []);

  /**
   * Hide loading screen
   */
  const handleLoadingScreen = useCallback(async () => {
    if (isLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [isLoaded]);

  if (!isLoaded) {
    return null;
  }

  return (
    //Bottom Tab
    <SafeAreaProvider style={styles.container} onLayout={handleLoadingScreen}>
      <AppNavigator />
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  label: {
    color: "blue",
    fontSize: 18,
    fontFamily: "regular",
  },
});
