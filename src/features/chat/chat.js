import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  KeyboardAvoidingView,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Button from "../../components/button";
import send from "../../assets/icons/send.png";
import { io } from "socket.io-client";
import groupProfile from "../../assets/icons/groupProfile.png";
import Config from "react-native-config";
// changes for messages feature on frontend
const Chat = ({ route }) => {
  const inNavigator = route.params?.inNavigator ?? false;
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [socket, setSocket] = useState(null);
  const [connected, setConnected] = useState(false);
  const [name, setName] = useState(null);
  const { currentRoom, id } = route.params;

  const createChat = {
    chat_name: currentRoom,
    group_id: id,
  };

  useEffect(() => {
    setMessages([]);
    socket?.emit("join", currentRoom);
  }, [currentRoom]);

  useEffect(() => {
    const socket = io(`${Config.SOCKET_URL}`);
    setSocket(socket);

    socket.on("connect", () => {
      console.log("Connected to socket server:", socket.id);
      setName(`anon-${socket.id}`);
      setConnected(true);
      console.log("joining room", currentRoom);

      socket.emit("create-chat", createChat);
      socket.emit("join", currentRoom);
    });

    socket.on("message", (msg) => {
      console.log("Message received", msg);
      msg.date = new Date(msg.date);
      setMessages((messages) => [...messages, msg]);
    });

    return () => socket.close();
  }, []);

  const sendMessage = () => {
    if (input.trim()) {
      socket?.emit("message", {
        text: input,
        room: currentRoom,
      });
      setInput("");
    }
  };

  const renderMessage = ({ item }) => (
    <View style={styles.message}>
      <Text>{item.text}</Text>
      {/* Render additional message details */}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Image source={groupProfile} style={styles.profilePic} />
        <Text style={styles.name}>{currentRoom}</Text>
      </View>
      <FlatList
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(item, index) => index.toString()}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={
          Platform.OS === "ios" ? (inNavigator ? -80 : 10) : 0
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
            onPress={sendMessage}
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
  header: {
    flexDirection: "column",
    alignItems: "center",
    padding: 10,
  },
  profilePic: {
    width: 50,
    height: 50,
    borderRadius: 15,
    marginBottom: 5,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
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
    marginHorizontal: 10,
    borderWidth: 1,
    borderColor: "#e1e1e1",
    borderRadius: 20,
  },
  textInput: {
    flex: 1,
    height: 45,
    paddingHorizontal: 10,
    alignSelf: "center",
  },
  sendButton: {
    width: 35,
    height: 35,
  },
  sendIcon: {
    width: 25,
    height: 25,
  },
  message: {
    backgroundColor: "#e1e1e1",
    padding: 10,
    borderRadius: 16,
    marginVertical: 5,
    marginHorizontal: 10,
    alignSelf: "flex-end",
  },
});

export default Chat;
