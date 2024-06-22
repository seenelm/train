import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
} from "react-native";
import send from "../../assets/icons/send.png";
import Button from "../../components/button";
import { SafeAreaView } from "react-native-safe-area-context";
import { io } from "socket.io-client";
import groupProfile from "../../assets/icons/groupProfile.png";
import Config from "react-native-config";
// changes for messages feature on frontend
const AddChat = ({ route }) => {
  const inNavigator = route.params?.inNavigator ?? false;
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [socket, setSocket] = useState(null);
  const [connected, setConnected] = useState(false);
  const [name, setName] = useState(null);
  const [recipient, setRecipient] = useState("");
  //   const { currentRoom, id } = route.params;

  //   const createChat = {
  //     chat_name: currentRoom,
  //     group_id: id,
  //   };

  //   useEffect(() => {
  //     setMessages([]);
  //     socket?.emit("join", currentRoom);
  //   }, [currentRoom]);

  //   useEffect(() => {
  //     const socket = io(`${Config.SOCKET_URL}`);
  //     setSocket(socket);

  //     socket.on("connect", () => {
  //       console.log("Connected to socket server:", socket.id);
  //       setName(`anon-${socket.id}`);
  //       setConnected(true);
  //       console.log("joining room", currentRoom);

  //       socket.emit("create-chat", createChat);
  //       socket.emit("join", currentRoom);
  //     });

  //     socket.on("message", (msg) => {
  //       console.log("Message received", msg);
  //       msg.date = new Date(msg.date);
  //       setMessages((messages) => [...messages, msg]);
  //     });

  //     return () => socket.close();
  //   }, []);

  //   const sendMessage = () => {
  //     if (input.trim()) {
  //       socket?.emit("message", {
  //         text: input,
  //         room: currentRoom,
  //       });
  //       setInput("");
  //     }
  //   };

  //   const renderMessage = ({ item }) => (
  //     <View style={styles.message}>
  //       <Text>{item.text}</Text>
  //       {/* Render additional message details */}
  //     </View>
  //   );

  return (
    <SafeAreaView edges={["bottom"]} style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.name}>New Chat</Text>
        <View style={styles.compose}>
          <Text style={styles.label}>To:</Text>
          <TextInput
            style={styles.composeInput}
            placeholder="Recipient's name"
            value={recipient}
            onChangeText={setRecipient}
            autoFocus={!inNavigator}
            autoCorrect={false}
          />
        </View>
      </View>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={
          Platform.OS === "ios" ? (inNavigator ? 120 : 80) : 120
        }
      >
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.textInput}
            placeholder="Type a message"
            value={input}
            onChangeText={setInput}
          />
          <Button
            onPress={() => {}}
            imgSource={send}
            imgStyle={styles.sendIcon}
            style={styles.sendButton}
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    backgroundColor: "white",
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    padding: 20,
  },
  header: {
    flexDirection: "column",
    alignItems: "center",
  },
  compose: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderTopColor: "#e1e1e1",
    borderBottomColor: "#e1e1e1",
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginRight: -5,
    padding: 10,
    margin: 5,
  },
  composeInput: {
    flex: 1,
    height: 40,
  },
  textInput: {
    flex: 1,
    height: 45,
    alignSelf: "center",
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    marginHorizontal: 10,
    borderWidth: 1,
    borderColor: "#e1e1e1",
    borderRadius: 20,
  },
  sendButton: {
    width: 35,
    height: 35,
  },
  sendIcon: {
    width: 25,
    height: 25,
  },
});

export default AddChat;
