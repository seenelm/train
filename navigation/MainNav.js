import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { BottomNav } from "./BottomNav";
import ChatScreen from "../screens/ChatScreen";
import { View } from "react-native";

const MainStack = createStackNavigator();

const MainNav = () => {
  return (
    <View style={{ flex: 1 }}>
      <MainStack.Navigator>
        <MainStack.Screen
          name="ChatList"
          component={BottomNav}
          options={{ headerShown: false }}
        />
        <MainStack.Screen
          name="ChatScreen"
          component={ChatScreen}
          options={{ headerShown: false }}
        />
      </MainStack.Navigator>
    </View>
  );
};

export default MainNav;
