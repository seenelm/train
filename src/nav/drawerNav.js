import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import MainNav from "./mainNav";
import CustomDrawerContent from "../components/customDrawer";

const Drawer = createDrawerNavigator();

function MyDrawer() {
  return (
    <Drawer.Navigator
      screenOptions={{ swipeEnabled: false }}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen
        name="Main"
        component={MainNav}
        options={{
          headerShown: false,
          drawerLabel: () => null,
        }}
      />
    </Drawer.Navigator>
  );
}

export default MyDrawer;
