import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import ProfilePic from "../assets/icons/profpic.png";

const AthleteProfile = ({ name, content, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <View style={styles.messageContainer}>
        <Image source={ProfilePic} style={styles.image} />
        <View style={styles.message}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.content} numberOfLines={2} ellipsizeMode="tail">
            {content}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
  },
  messageContainer: {
    flexDirection: "row",
    marginTop: 10,
    borderRadius: 10,
    marginBottom: 5,
    alignItems: "center",
  },
  message: {
    flexDirection: "column",
    marginLeft: 10,
    flexShrink: 1,
  },
  name: {
    fontWeight: "bold",
    marginBottom: 5,
  },
  content: {
    fontSize: 16,
    flexShrink: 1,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 25,
  },
});

export default AthleteProfile;
