import React from "react";
import {
  View,
  TouchableOpacity,
<<<<<<< HEAD
  StyleSheet,
=======
>>>>>>> seen
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
<<<<<<< HEAD
=======
import { styles } from "../styles/ChatScreenStyles";
>>>>>>> seen

const ChatScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.chatArea}></View>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
        style={styles.keyboardAvoidingView}
      >
        <View style={styles.inputWrapper}>
          <TouchableOpacity onPress={() => {}} style={styles.button}>
            <MaterialCommunityIcons name="camera" size={24} color="black" />
          </TouchableOpacity>
          <TextInput style={styles.textInput} placeholder="Type a message" />
          <TouchableOpacity onPress={() => {}} style={styles.sendButton}>
            <MaterialCommunityIcons name="send" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

<<<<<<< HEAD
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
  },
  chatArea: {
    flex: 1,
    paddingBottom: 10,
  },
  input: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderTopWidth: 1,
    borderTopColor: "#ccc",
  },
  button: {
    marginHorizontal: 5,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingBottom: 5,
    paddingTop: 5,
    backgroundColor: "#f1f1f1",
    borderTopWidth: 1,
    borderTopColor: "#e1e1e1",
  },
  textInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    height: 40,
    paddingRight: 40,
    paddingLeft: 10,
  },
  sendButton: {
    position: "absolute",
    right: 20,
    zIndex: 1,
  },
});

=======
>>>>>>> seen
export default ChatScreen;
