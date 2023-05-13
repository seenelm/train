import { useState, useEffect, useCallback } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import * as SplashScreen from "expo-splash-screen";
import * as Fonts from "expo-font";

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
      setIsLoaded(true);
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
    <SafeAreaProvider style={styles.container} onLayout={handleLoadingScreen}>
      <SafeAreaView>
        <Text style={styles.label}>Noahs branch</Text>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  label: {
    color: "blue",
    fontSize: 18,
    fontFamily: "regular",
  },
});
