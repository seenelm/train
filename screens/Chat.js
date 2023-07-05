import React, { useState, useEffect } from "react";
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Text,
  TouchableOpacity,
  TextInput,
  View,
} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { chatScreenStyles } from "../styles/Styles";
import { SafeAreaView } from "react-native-safe-area-context";

const Chat = ({ route }) => {
  const inNavigator = route.params?.inNavigator ?? false;
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const renderMessage = ({ item }) => (
    <View style={chatScreenStyles.message}>
      <Text>{item.content}</Text>
    </View>
  );
  const Container = inNavigator ? View : KeyboardAvoidingView;

  return (
    <SafeAreaView style={chatScreenStyles.container}>
      <FlatList
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(item) => item.id.toString()}
        style={chatScreenStyles.messageList}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={
          Platform.OS === "ios" ? (inNavigator ? -80 : 0) : 0
        }
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
          <TouchableOpacity onPress={""} style={chatScreenStyles.sendButton}>
            <MaterialCommunityIcons name="send" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Chat;
