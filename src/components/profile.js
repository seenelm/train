import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import ProfilePic from "../assets/icons/profilepic.png";
import forward from "../assets/icons/forward.png";

const Profile = ({ name, username, onPress, showForwardIcon = false }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <View style={styles.messageContainer}>
        <View style={styles.messageContainer}>
          <Image source={ProfilePic} style={styles.image} />
          <View style={styles.message}>
            <Text style={styles.content} numberOfLines={2} ellipsizeMode="tail">
              {username}
            </Text>
            <Text style={styles.name}>{name}</Text>
          </View>
        </View>
        {showForwardIcon && (
          <Image style={styles.forwardIcon} source={forward} />
        )}
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
  name: {
    marginBottom: 5,
  },
  content: {
    flexShrink: 1,
    fontWeight: "bold",
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 30,
  },
  forwardIcon: {
    width: 15,
    height: 15,
  },
});

export default Profile;
