import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

const StackNav = ({ screens, options }) => (
  <Stack.Navigator screenOptions={options}>
    {screens.map((screen, i) => (
      <Stack.Screen key={i} name={screen.name} options={screen.options}>
        {screen.component}
      </Stack.Screen>
    ))}
  </Stack.Navigator>
);

export default StackNav;
