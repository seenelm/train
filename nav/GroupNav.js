import { createStackNavigator } from "@react-navigation/stack";
import MessageNav from "./MessageNav";
import EventScreen from "../events/EventScreen";
import ProfileScreen from "../screens/ProfileScreen";

const Stack = createStackNavigator();

export function GroupNav() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Messages"
        component={MessageNav}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Event"
        component={EventScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
