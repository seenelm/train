import React from "react";
import { View, Button, StyleSheet, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const ChatScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.chatArea}></View>
      <View style={styles.input}>
        <Button title="Image" style={styles.button} />
        <TextInput style={styles.textInput} />
        <Button title="Camera" style={styles.button} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
  chatArea: {
    flex: 1,
  },
  input: {
    position: "absolute",
    bottom: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
    paddingHorizontal: 10,
  },
  button: {
    marginHorizontal: 5,
  },
  textInput: {
    flex: 1,
  },
});

export default ChatScreen;
