import "react-native-gesture-handler";
import { useState, useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux"; // import Provider from react-redux
import store from "./api/store";
import { StyleSheet } from "react-native";
import AppNav from "./nav/AppNav";
import AppLoading from "./screens/AppLoading";

const App = () => {
  const [appLoaded, setAppLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAppLoaded(true);
    }, 2000); // Set delay time to 2 seconds

    return () => clearTimeout(timer);
  }, []);

  return appLoaded ? (
    <Provider store={store}>
      <SafeAreaProvider style={styles.container}>
        <AppNav />
      </SafeAreaProvider>
    </Provider>
  ) : (
    <AppLoading />
  );
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eee",
  },
  label: {
    color: "blue",
    fontSize: 18,
    fontFamily: "regular",
  },
});

export default App;
