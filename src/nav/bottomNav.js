import React, { useRef } from "react";
import { Animated, StyleSheet, Image, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import message from "../assets/icons/message.png";
import messageFocused from "../assets/icons/message-focus.png";
import group from "../assets/icons/group.png";
import groupFocused from "../assets/icons/group-focus.png";
import calendar from "../assets/icons/calendar.png";
import calendarFocused from "../assets/icons/calendar-focus.png";

import Dashboard from "../features/dash/dashboard";
import ChatList from "../features/chat/chatList";
import Calendar from "../features/calendar/calendar";

const Tab = createBottomTabNavigator();

export const BottomNav = () => {
  const messageValue = useRef(new Animated.Value(1)).current;
  const groupValue = useRef(new Animated.Value(1)).current;
  const calendarValue = useRef(new Animated.Value(1)).current;

  const animateIcon = (value) => {
    Animated.sequence([
      Animated.timing(value, {
        toValue: 1.05,
        duration: 70,
        useNativeDriver: false,
      }),
      Animated.timing(value, {
        toValue: 1,
        duration: 70,
        useNativeDriver: false,
      }),
    ]).start();
  };

  return (
    <Tab.Navigator
      initialRouteName="Search"
      screenOptions={{
        tabBarStyle: {
          backgroundColor: "white",
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={ChatList}
        options={{
          tabBarLabel: "Chat",
          tabBarIcon: ({ size, focused }) => (
            <View style={[styles.icon, focused]}>
              <Animated.View style={{ transform: [{ scale: messageValue }] }}>
                <Image
                  source={focused ? messageFocused : message}
                  style={[{ height: size, width: size }]}
                />
              </Animated.View>
            </View>
          ),
          headerShown: false,
        }}
        listeners={{
          focus: () => {
            animateIcon(messageValue);
          },
        }}
      />

      <Tab.Screen
        name="Search"
        component={Dashboard}
        options={{
          tabBarLabel: "Fitspaces",
          tabBarIcon: ({ size, focused }) => (
            <View style={[styles.icon, focused]}>
              <Animated.View style={{ transform: [{ scale: groupValue }] }}>
                <Image
                  source={focused ? groupFocused : group}
                  style={[styles.image, { height: size, width: size }]}
                />
              </Animated.View>
            </View>
          ),
          headerShown: false,
        }}
        listeners={{
          focus: () => {
            animateIcon(groupValue);
          },
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Calendar}
        options={{
          tabBarLabel: "Calendar",
          tabBarIcon: ({ size, focused }) => (
            <View style={[styles.icon, focused && styles.iconFocused]}>
              <Animated.View style={{ transform: [{ scale: calendarValue }] }}>
                <Image
                  source={focused ? calendarFocused : calendar}
                  style={[styles.image, { height: size, width: size }]}
                />
              </Animated.View>
            </View>
          ),
          headerShown: false,
        }}
        listeners={{
          focus: () => {
            animateIcon(calendarValue);
          },
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  icon: {
    justifyContent: "center",
    alignItems: "center",
    padding: 0,
    marginBottom: -10,
  },
});
