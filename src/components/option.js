import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import forward from "../assets/icons/forward.png";

const Option = ({ setting, imageSource, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <View style={styles.optionContainer}>
        <View style={styles.blackBox}>
          <Image source={imageSource} style={styles.image} />
        </View>
        <View style={styles.textContainer}>
          <Text>{setting}</Text>
          <Image style={styles.forwardIcon} source={forward} />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
  },
  optionContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: 350,
  },
  blackBox: {
    backgroundColor: "black",
    borderRadius: 10,
    width: 35, // adjust width as needed
    height: 35, // adjust height as needed
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  image: {
    width: 18,
    height: 18,
    resizeMode: "contain", // or 'cover' depending on your need
  },
  textContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center", // Align items vertically in the center

    height: 50, // Set a fixed height for the container
  },

  forwardIcon: {
    width: 15,
    height: 15,
    tintColor: "#8e8e93",
  },
});

export default Option;
