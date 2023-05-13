import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaProvide, SafeAreaView } from "react-native-safe-area-context";
import * as SplashScreen from "expo-splash-screen";

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Noahs branch</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
