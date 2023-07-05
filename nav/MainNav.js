import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { CardStyleInterpolators } from "@react-navigation/stack";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import StackNav from "../components/Stack";

import TopNav from "./TopNav";
import { BottomNav } from "./BottomNav";
import AddGroup from "../screens/AddGroup";
import Search from "../screens/Search";
import Profile from "../screens/Profile";

import Chat from "../screens/Chat";
import EditGroup from "../screens/EditGroup";

const screens = [
  {
    name: "BottomNav",
    component: BottomNav,
    options: { headerShown: false },
  },
  {
    name: "SearchScreen",
    component: Search,
    options: {
      headerShown: false,
      cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
    },
  },
  {
    name: "ProfileScreen",
    component: Profile,
    options: { headerShown: false },
  },
  {
    name: "EditGroup",
    component: EditGroup,
    options: { headerShown: false },
  },
  {
    name: "Group",
    component: TopNav,
    options: ({ route, navigation }) => {
      const { groupName } = route.params;
      return {
        headerShown: true,
        headerStyle: {
          borderBottomColor: "white",
          elevation: 0,
          shadowOpacity: 0,
        },
        headerTitle: () => (
          <TouchableOpacity onPress={() => navigation.navigate("EditGroup")}>
            <Text>{groupName}</Text>
          </TouchableOpacity>
        ),
        headerLeft: () => (
          <Ionicons
            name="arrow-back"
            size={24}
            color="black"
            style={{ paddingLeft: 15 }}
            onPress={() => navigation.goBack()}
          />
        ),
        headerRight: () => (
          <MaterialIcons
            name="more-horiz"
            size={24}
            color="black"
            style={{ paddingRight: 15 }}
            onPress={() => navigation.navigate("EditGroup")}
          />
        ),
      };
    },
  },
  {
    name: "AddGroup",
    component: AddGroup,
    options: {
      headerShown: false,
      cardStyleInterpolator: CardStyleInterpolators.forModalPresentationIOS,
    },
  },
  {
    name: "ChatScreen",
    component: Chat,
    options: { headerShown: false },
  },
];

const MainNav = () => {
  return (
    <View style={{ flex: 1 }}>
      <StackNav screens={screens} />
    </View>
  );
};

export default MainNav;
