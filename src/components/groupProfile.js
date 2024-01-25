import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import ProfilePic from "../assets/icons/groupProfile.png";
import forward from "../assets/icons/forward.png";

const GroupProfile = ({ groupName, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <View style={styles.messageContainer}>
        <View style={styles.messageContainer}>
          <Image source={ProfilePic} style={styles.image} />
          <View style={styles.message}>
            <Text style={styles.content} numberOfLines={2} ellipsizeMode="tail">
              {groupName}
            </Text>
          </View>
        </View>
        <Image style={styles.forwardIcon} source={forward} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
  },
  messageContainer: {
    flexDirection: "row",
    borderRadius: 10,
    marginBottom: 5,
    alignItems: "center",
    justifyContent: "space-between",
  },
  message: {
    flexDirection: "column",
    marginLeft: 10,
    flexShrink: 1,
  },
  content: {
    flexShrink: 1,
    fontWeight: "bold",
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 15,
  },
  forwardIcon: {
    width: 15,
    height: 15,
  },
});

export default GroupProfile;
