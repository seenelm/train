import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import messageIcon from "../assets/icons/message.png";
import calendarIcon from "../assets/icons/calendar.png";
import settingsIcon from "../assets/icons/gear.png";

const HomeScreen = ({ navigation }) => {
  const iconSize = 23; // Define the size of the icons here

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.text}>Home Screen</Text>
      </View>
      <View style={styles.tabBarContainer}>
        <TouchableOpacity
          style={styles.tab}
          onPress={() => {
            navigation.navigate("GroupNav", { screen: "Messages" });
          }}
        >
          <Image
            source={messageIcon}
            style={[styles.image, { height: iconSize, width: iconSize }]}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.tab}
          onPress={() => {
            navigation.navigate("GroupNav", { screen: "Event" });
          }}
        >
          <Image
            source={calendarIcon}
            style={[styles.image, { height: iconSize, width: iconSize }]}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.tab}
          onPress={() => {
            navigation.navigate("GroupNav", { screen: "Profile" });
          }}
        >
          <Image
            source={settingsIcon}
            style={[styles.image, { height: iconSize, width: iconSize }]}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  tabBarContainer: {
    flexDirection: "row",
    borderTopWidth: 1,
    borderTopColor: "#fff",
    backgroundColor: "#171810",
    height: 79,
  },
  tab: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 3,
    borderBottomColor: "transparent",
  },
  tabText: {
    color: "gray",
  },
  text: {
    marginBottom: 50,
  },
  image: {
    marginBottom: 5,
  },
});

export default HomeScreen;
