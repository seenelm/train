import "react-native-gesture-handler";
import { useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import * as SplashScreen from "expo-splash-screen";
import AppNavigator from "./navigation/AppNavigator";
import AppLoadingScreen from "./screens/AppLoadingScreen";
import { styles } from "./styles/AppStyles";
import LoginScreen from "./screens/LoginScreen";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [appLoaded, setAppLoaded] = useState(false);

  if (!appLoaded) {
    return <AppLoadingScreen setAppLoaded={setAppLoaded} />;
  }

  return (
    <SafeAreaProvider style={styles.container}>
      <AppNavigator />
    </SafeAreaProvider>
  );
}
