// components/Header.js
import React from "react";
import { View, StyleSheet, TouchableOpacity, Image } from "react-native";

const Header = ({ leftComponent, middleComponent, rightComponent }) => {
  return (
    <View style={styles.container}>
      <View style={styles.leftSection}>{leftComponent}</View>
      <View style={styles.middleSection}>{middleComponent}</View>
      <View style={styles.rightSection}>{rightComponent}</View>
    </View>
  );
};

// Adjustments in your Header component's styles
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
    height: 60, // Adjust the height as needed
    position: "relative", // Ensure the container has a relative positioning
  },
  leftSection: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    zIndex: 1, // Ensure the left section is above the middle section
  },
  middleSection: {
    position: "absolute", // Position the middle section absolutely to ensure it's centered
    left: 0,
    right: 0,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 0, // Middle section might be below the left and right in the z-index
  },
  rightSection: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    zIndex: 1, // Ensure the right section is above the middle section
  },
});

export default Header;
