import React, { useState } from "react";
import {
  View,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { chatScreenStyles } from "../styles/Styles";

const ChatScreen = () => {
  const [message, setMessage] = useState("");

  const sendMessage = async () => {
    try {
      await axios.post("http://localhost:3000/messages", {
        content: message,
        senderId: "<SENDER_ID>",
        // Add any other relevant message data
      });
      setMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <View style={chatScreenStyles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
        style={chatScreenStyles.keyboardAvoidingView}
      >
        <View style={chatScreenStyles.inputWrapper}>
          <TouchableOpacity onPress={() => {}} style={chatScreenStyles.button}>
            <MaterialCommunityIcons name="camera" size={24} color="black" />
          </TouchableOpacity>
          <TextInput
            style={chatScreenStyles.textInput}
            placeholder="Type a message"
            value={message}
            onChangeText={setMessage}
          />
          <TouchableOpacity
            onPress={sendMessage}
            style={chatScreenStyles.sendButton}
          >
            <MaterialCommunityIcons name="send" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default ChatScreen;
