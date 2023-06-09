import React from "react";
import {
  createStackNavigator,
  CardStyleInterpolators,
} from "@react-navigation/stack";
import { BottomNav } from "./BottomNav";
import { View } from "react-native";
import HomeScreen from "../screens/HomeScreen";
import AddGroupScreen from "../screens/AddGroupScreen";
import { GroupNav } from "./GroupNav";

const MainStack = createStackNavigator();

const MainNav = () => {
  return (
    <View style={{ flex: 1 }}>
      <MainStack.Navigator>
        <MainStack.Screen
          name="BottomNav"
          component={BottomNav}
          options={{ headerShown: false }}
        />
        <MainStack.Screen
          name="Group"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <MainStack.Screen
          name="AddGroup"
          component={AddGroupScreen}
          options={{
            headerShown: false,
            cardStyleInterpolator:
              CardStyleInterpolators.forModalPresentationIOS,
          }}
        />
        <MainStack.Screen
          name="GroupNav"
          component={GroupNav}
          options={{ headerShown: false }}
        />
      </MainStack.Navigator>
    </View>
  );
};

export default MainNav;
