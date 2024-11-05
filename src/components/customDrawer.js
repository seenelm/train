import React from "react";
import { View, Image, StyleSheet, Text, TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";
import { DrawerContentScrollView } from "@react-navigation/drawer";
import profile from "../assets/icons/profilepic.png";
import { useDispatch } from "react-redux";
import { logout } from "../features/auth/usersSlice.js";
import ProfileIcon from "../assets/icons/profileIcon.png";
import NotificationsIcon from "../assets/icons/notificationsIcon.png";
import SettingsIcon from "../assets/icons/settingsIcon.png";
import LogoutIcon from "../assets/icons/logout.png";

function CustomDrawer(props) {
  const { navigation } = props;
  const name = useSelector((state) => state.users.username);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  const DrawerItem = ({ icon, label, onPress }) => (
    <TouchableOpacity style={styles.drawerItem} onPress={onPress}>
      <Image source={icon} style={styles.icon} />
      <Text style={styles.page}>{label}</Text>
    </TouchableOpacity>
  );

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
        <DrawerItem
          icon={ProfileIcon}
          label="Profile"
          onPress={() => navigation.navigate("Main", { screen: "Profile" })}
        />
        <DrawerItem
          icon={NotificationsIcon}
          label="Notifications"
          onPress={() => navigation.navigate("Main", { screen: "Request" })}
        />
        <DrawerItem icon={SettingsIcon} label="Settings" onPress={() => {}} />
        <DrawerItem icon={LogoutIcon} label="Log Out" onPress={handleLogout} />
      </View>
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  profileContainer: {
    alignItems: "flex-start",
    paddingVertical: 20,
    paddingHorizontal: 15,
  },
  circularContainer: {
    alignSelf: "center",
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
    alignSelf: "center",
    fontSize: 17,
    fontWeight: "bold",
    marginTop: 10,
  },
  drawerItem: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
  },
  icon: {
    width: 25,
    height: 25,
    marginRight: 15,
    marginLeft: 10,
  },
  page: {
    fontSize: 21,
    fontWeight: "bold",
  },
  logout: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 20,
    color: "red",
  },
});

export default CustomDrawer;
