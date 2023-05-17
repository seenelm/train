<<<<<<< HEAD
<<<<<<< HEAD
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import { View, Image, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import DashboardScreen from "../screens/DashboardScreen";
import ChatList from "../screens/ChatList";
import ProfileScreen from "../screens/ProfileScreen";
import ChatScreen from "../screens/ChatScreen";
import EventDetailScreen from "../screens/EventDetailScreen";

import Chat from "../assets/icons/logo.png";
import ChatFocus from "../assets/icons/logo-outline.png";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const getCurrentRouteName = (route) => {
  const routeName = getFocusedRouteNameFromRoute(route) ?? "ChatList";
  return routeName;
};
=======
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import MainNav from "./MainNav";

const Stack = createStackNavigator();
>>>>>>> b0a225803735e16a4f166ee4afc6f4e9b8d736a4

const AppNavigator = () => {
  const ChatStack = () => {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="ChatList"
          component={ChatList}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ChatScreen"
          component={ChatScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    );
  };
  const EventStack = () => {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="DashboardScreen"
          component={DashboardScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="EventDetailScreen"
          component={EventDetailScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    );
  };

  return (
    <NavigationContainer>
<<<<<<< HEAD
      <Tab.Navigator>
        <Tab.Screen
          name="Dash"
          component={EventStack}
          options={{
            tabBarLabel: "",
            tabBarIcon: ({ color, size, focused }) => (
              <MaterialCommunityIcons
                name={focused ? "home-variant" : "home-variant-outline"}
                size={size}
                style={styles.image}
              />
            ),
            headerShown: false,
          }}
        />
        <Tab.Screen
          name="Chat"
          component={ChatStack}
          options={({ route }) => {
            const routeName = getCurrentRouteName(route);
            return {
              tabBarLabel: "",
              tabBarIcon: ({ focused }) => (
                <View
                  style={{
                    marginTop: 15,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Image
                    source={focused ? ChatFocus : Chat}
                    style={{ width: 75, height: 75 }}
                  />
                </View>
              ),
              tabBarStyle: {
                display: routeName === "ChatScreen" ? "none" : "flex",
              },
              headerShown: false,
            };
          }}
        />

        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            tabBarLabel: "",
            tabBarIcon: ({ color, size, focused }) => (
              <MaterialCommunityIcons
                name={focused ? "account-circle" : "account-circle-outline"}
                style={styles.image}
                size={size}
              />
            ),
            headerShown: false,
          }}
        />
      </Tab.Navigator>
=======
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import MainNav from "./MainNav";

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <MainNav />
>>>>>>> seen
=======
      <MainNav />
>>>>>>> b0a225803735e16a4f166ee4afc6f4e9b8d736a4
    </NavigationContainer>
  );
};

<<<<<<< HEAD
<<<<<<< HEAD
const styles = StyleSheet.create({
  image: {
    marginTop: 15,
    marginBottom: -10,
    color: "black",
    justifyContent: "center",
    alignItems: "center",
  },
});

=======
>>>>>>> seen
=======
>>>>>>> b0a225803735e16a4f166ee4afc6f4e9b8d736a4
export default AppNavigator;
