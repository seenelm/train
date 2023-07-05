import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import GroupEvents from "../screens/GroupEvents";
import PaymentScreen from "../screens/GroupPayments";
import FeedScreen from "../screens/Feed";

const Tab = createMaterialTopTabNavigator();

const TopNav = ({ route, navigation }) => {
  const { groupName } = route.params;

  return (
    <Tab.Navigator
      initialRouteName="Feed"
      tabBarOptions={{
        activeTintColor: "black",
        labelStyle: { fontSize: 12 },
        style: {
          backgroundColor: "white",
          elevation: 0, // remove shadow on Android
          shadowOpacity: 0, // remove shadow on iOS
        },
      }}
    >
      <Tab.Screen
        name="Feed"
        component={FeedScreen}
        options={{ tabBarLabel: "Feed" }}
      />
      <Tab.Screen
        name="Event"
        component={GroupEvents}
        options={{ tabBarLabel: "Events" }}
      />
      <Tab.Screen
        name="Payments"
        component={PaymentScreen}
        options={{ tabBarLabel: "Payments" }}
      />
    </Tab.Navigator>
  );
};

export default TopNav;
