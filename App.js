import "react-native-gesture-handler";
<<<<<<< HEAD
import { useState, useEffect, useCallback } from "react";
import { StyleSheet } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import * as SplashScreen from "expo-splash-screen";
import * as Fonts from "expo-font";
import AppNavigator from "./navigation/AppNavigator";
=======
import { useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import * as SplashScreen from "expo-splash-screen";
import AppNavigator from "./navigation/AppNavigator";
import AppLoadingScreen from "./screens/AppLoadingScreen";
import { styles } from "./styles/AppStyles";
import LoginScreen from "./screens/LoginScreen";
>>>>>>> seen

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [appLoaded, setAppLoaded] = useState(false);

  if (!appLoaded) {
    return <AppLoadingScreen setAppLoaded={setAppLoaded} />;
  }

  return (
<<<<<<< HEAD
    //Bottom Tab
    <SafeAreaProvider style={styles.container} onLayout={handleLoadingScreen}>
=======
    <SafeAreaProvider style={styles.container}>
>>>>>>> seen
      <AppNavigator />
    </SafeAreaProvider>
  );
}
