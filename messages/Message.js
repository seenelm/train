import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";

const Message = ({ name, content, onPress, profilePic }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <View style={styles.messageContainer}>
        <Image
          source={{ uri: profilePic }}
          style={styles.image}
          defaultSource={require("../assets/prof.jpg")}
        />
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
    justifyContent: "flex-start",
    alignItems: "center",
    paddingTop: 20,
  },
  messageContainer: {
    flexDirection: "row",
    marginTop: 10,
    marginRight: 30,
    borderRadius: 10,
    marginBottom: 5,
    alignItems: "center",
    maxWidth: "90%",
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
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
});

export default Message;
