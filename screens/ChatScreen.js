import React from "react";
import {
  View,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { styles } from "../styles/ChatScreenStyles";

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

export default ChatScreen;
