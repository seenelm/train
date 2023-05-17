import React from "react";
import {
  View,
  Button,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Entypo } from "@expo/vector-icons";

const ChatScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.chatArea}></View>
      <View style={styles.input}>
        <TouchableOpacity>
          <Entypo name="camera" color="black" size={24} style={styles.button} />
        </TouchableOpacity>
        <TextInput style={styles.textInput} />
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
    borderWidth: 1,
    borderRadius: 50,
    borderColor: "black",
    marginHorizontal: 15,
    paddingHorizontal: 12,
  },
});

export default ChatScreen;
