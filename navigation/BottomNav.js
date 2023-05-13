import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Image, StyleSheet, View } from "react-native";
import DashboardScreen from "../screens/DashboardScreen";
import ChatList from "../screens/ChatList";
import ProfileScreen from "../screens/ProfileScreen";
import Chat from "../assets/icons/logo.png";
import ChatFocus from "../assets/icons/logo-outline.png";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const Tab = createBottomTabNavigator();

const BottomNav = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Dash"
        component={DashboardScreen}
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
        component={ChatList}
        options={{
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
          headerShown: false,
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
  );
};

const styles = StyleSheet.create({
  image: {
    marginTop: 15,
    marginBottom: -10,
    color: "black",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default BottomNav;
