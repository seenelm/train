import "react-native-gesture-handler";
import { useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux"; // import Provider from react-redux
import store from "./api/store";
import { StyleSheet } from "react-native";
import AppNav from "./nav/AppNav";
import AppLoading from "./screens/AppLoading";

const App = () => {
  const [appLoaded, setAppLoaded] = useState(false);

  if (!appLoaded) {
    return <AppLoading setAppLoaded={setAppLoaded} appLoaded={appLoaded} />;
  }

  return (
    <Provider store={store}>
      <SafeAreaProvider style={styles.container}>
        <AppNav />
      </SafeAreaProvider>
    </Provider>
  );
};

export const styles = StyleSheet.create({
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

export default App;
