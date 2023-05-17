import { createStackNavigator } from "@react-navigation/stack";
import DashboardScreen from "../screens/DashboardScreen";
import EventDetailScreen from "../screens/EventDetailScreen";

const Stack = createStackNavigator();

export const EventStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="DashboardScreen"
        component={DashboardScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="EventDetailScreen"
        component={EventDetailScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};
