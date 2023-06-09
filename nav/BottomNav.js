import React, { useRef } from "react";
import { Animated, StyleSheet, Image } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import homeIcon from "../assets/icons/home.png";
import homeIconFocused from "../assets/icons/home-focus.png";
import searchIcon from "../assets/icons/search.png";
import searchIconFocused from "../assets/icons/search-focus.png";
import profileIcon from "../assets/icons/user.png";
import profileIconFocused from "../assets/icons/user-focus.png";

import DashboardScreen from "../screens/DashboardScreen";
import ProfileScreen from "../screens/ProfileScreen";
import SearchScreen from "../screens/SearchScreen";

const Tab = createBottomTabNavigator();

export const BottomNav = () => {
  // Create animated value for each tab
  const homeValue = useRef(new Animated.Value(1)).current;
  const searchValue = useRef(new Animated.Value(1)).current;
  const profileValue = useRef(new Animated.Value(1)).current;

  const animateIcon = (value) => {
    Animated.sequence([
      Animated.spring(value, {
        toValue: 1.3,
        friction: 10,
        useNativeDriver: false,
      }),
      Animated.spring(value, {
        toValue: 1,
        friction: 10,
        useNativeDriver: false,
      }),
    ]).start();
  };

  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={DashboardScreen}
        options={{
          tabBarLabel: "",
          tabBarIcon: ({ size, focused }) => (
            <Animated.View style={{ transform: [{ scale: homeValue }] }}>
              <Image
                source={focused ? homeIconFocused : homeIcon}
                style={[styles.image, { height: size, width: size }]}
              />
            </Animated.View>
          ),
          headerShown: false,
        }}
        listeners={{
          focus: () => {
            animateIcon(homeValue);
          },
        }}
      />

      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          tabBarLabel: "",
          tabBarIcon: ({ size, focused }) => (
            <Animated.View style={{ transform: [{ scale: searchValue }] }}>
              <Image
                source={focused ? searchIconFocused : searchIcon}
                style={[styles.image, { height: size, width: size }]}
              />
            </Animated.View>
          ),
          headerShown: false,
        }}
        listeners={{
          focus: () => {
            animateIcon(searchValue);
          },
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: "",
          tabBarIcon: ({ size, focused }) => (
            <Animated.View style={{ transform: [{ scale: profileValue }] }}>
              <Image
                source={focused ? profileIconFocused : profileIcon}
                style={[styles.image, { height: size, width: size }]}
              />
            </Animated.View>
          ),
          headerShown: false,
        }}
        listeners={{
          focus: () => {
            animateIcon(profileValue);
          },
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  image: {
    marginTop: 15,
    marginBottom: -10,
    justifyContent: "center",
    alignItems: "center",
    height: 25,
    width: 25,
  },
});
