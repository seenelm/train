import "react-native-gesture-handler";
import { useState, useEffect, useCallback } from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

import * as SplashScreen from "expo-splash-screen";
import * as Fonts from "expo-font";
import HomeScreen from "./assets/components/HomeScreen";
import ProfileScreen from "./assets/components/ProfileScreen";
import ClientScreen from "./assets/components/ClientScreen";

// Make splash screen visible until app loads
SplashScreen.preventAutoHideAsync();
const Tab = createBottomTabNavigator();

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
      <SafeAreaView>
        <NavigationContainer>
          <Tab.Navigator
            screenOptions={({ route }) => ({
              headerShown: false,
              tabBarIcon: ({ focused, color, size }) => {
                let iconName;

                if (route.name === "Home") {
                  iconName = focused ? "dot-circle" : "dot-circle";
                } else if (route.name === "Client") {
                  iconName = focused ? "users" : "users";
                } else if (route.name === "Profile") {
                  iconName = focused ? "user" : "user";
                }

                return (
                  <FontAwesome5 name={iconName} size={size} color={color} />
                );
              },
            })}
            tabBarOptions={{
              activeTintColor: "red",
              inactiveTintColor: "gray",
            }}
          >
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Client" component={ClientScreen} />
            <Tab.Screen name="Profile" component={ProfileScreen} />
          </Tab.Navigator>
        </NavigationContainer>
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
