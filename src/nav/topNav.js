import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import GroupEvents from "../features/groups/groupEvents";
import PaymentScreen from "../features/groups/groupPayments";
import FeedScreen from "../features/groups/feed";

const Tab = createMaterialTopTabNavigator();

const TopNav = ({ route, navigation }) => {
  const { groupName } = route.params;

  return (
    <Tab.Navigator
      initialRouteName="Feed"
      screenOptions={{
        tabBarActiveTintColor: "white",
        tabBarInactiveTintColor: "grey",
        tabBarLabelStyle: { fontSize: 12, paddingHorizontal: 5 },
        tabBarStyle: {
          backgroundColor: "white",
          elevation: 0,
          shadowOpacity: 0,
        },
        tabBarIndicatorStyle: {
          backgroundColor: "black",
          borderRadius: 30,
          height: 25,
          width: "24.5%",
          left: "4.5%",
          top: "50%",
          marginTop: -12,
        },
      }}
    >
      <Tab.Screen
        name="Feed"
        component={FeedScreen}
        options={{ tabBarLabel: "Dash" }}
      />
      <Tab.Screen
        name="Event"
        component={GroupEvents}
        options={{ tabBarLabel: "Events" }}
      />
      <Tab.Screen
        name="Payments"
        component={PaymentScreen}
        options={{ tabBarLabel: "Docs" }}
      />
    </Tab.Navigator>
  );
};

export default TopNav;
