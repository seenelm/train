import React from "react";
import { View, Text, StyleSheet } from "react-native";

const ChatList = () => {
  return (
    <View style={styles.container}>
      <View style={styles.message}>
        <Text style={styles.name}>Noah Gross</Text>
        <Text style={styles.content}>
          Hey to you wanna go watch the new Guardians of the Galaxy movie?
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  message: {
    padding: 10,
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    marginBottom: 10,
  },
  name: {
    fontWeight: "bold",
    marginBottom: 5,
  },
  content: {
    fontSize: 16,
  },
});

export default ChatList;
