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
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  if (!appLoaded) {
    return <AppLoadingScreen setAppLoaded={setAppLoaded} />;
  }

  if (!isLoggedIn) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  return (
    <SafeAreaProvider style={styles.container}>
      <AppNavigator />
    </SafeAreaProvider>
  );
}
