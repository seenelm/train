import React from "react";
import { View, Image, StyleSheet, Text, TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";
import { DrawerContentScrollView } from "@react-navigation/drawer";
import profile from "../assets/icons/profilepic.png";
import { useDispatch } from "react-redux";
import { logout } from "../features/auth/usersSlice.js";

function CustomDrawer(props) {
  const { navigation } = props;
  const name = useSelector((state) => state.users.username);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <DrawerContentScrollView {...props} scrollEnabled={false}>
      <View style={styles.profileContainer}>
        <View style={styles.circularContainer}>
          <TouchableOpacity
            onPress={() => navigation.navigate("Main", { screen: "Profile" })}
          >
            <Image source={profile} style={styles.imageStyle} />
          </TouchableOpacity>
        </View>
        <Text style={styles.name}>{name}</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate("Main", { screen: "Profile" })}
        >
          <Text style={styles.page}>Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("Main", { screen: "Request" })}
        >
          <Text style={styles.page}>Requests</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {}}>
          <Text style={styles.page}>Settings</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleLogout}>
          <Text style={styles.logout}>Log Out</Text>
        </TouchableOpacity>
      </View>

      {/* You can add other DrawerItems below if needed */}
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  profileContainer: {
    alignItems: "center",
    paddingVertical: 20,
  },
  circularContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    overflow: "hidden",
  },
  imageStyle: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
  },
  page: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 20,
  },
  logout: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 20,
    color: "red",
  },
});

export default CustomDrawer;
