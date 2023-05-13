import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import DashboardScreen from "../screens/DashboardScreen";
import ChatScreen from "../screens/ChatScreen";

const Tab = createBottomTabNavigator();

const BottomNav = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Dash" component={DashboardScreen} />
      <Tab.Screen name="Chat" component={ChatScreen} />
    </Tab.Navigator>
  );
};

export default BottomNav;
