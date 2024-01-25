import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from "react-native";
import { io } from "socket.io-client";

const Chat = ({ route }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [socket, setSocket] = useState(null);
  const [connected, setConnected] = useState(false);
  const [name, setName] = useState(null);
  const currentRoom = route.params;

  useEffect(() => {
    setMessages([]);
    socket?.emit("join", currentRoom);
  }, [currentRoom]);

  useEffect(() => {
    const socket = io("ws://192.168.0.107:3001");
    setSocket(socket);

    socket.on("connect", () => {
      console.log("Connected to socket server");
      setName(`anon-${socket.id}`);
      setConnected(true);
      console.log("joining room", currentRoom);

      socket.emit("join", currentRoom);
    });

    socket.on("message", (msg) => {
      console.log("Message received", msg);
      msg.date = new Date(msg.date);
      setMessages((messages) => [...messages, msg]);
    });

    socket.on("messages", (msgs) => {
      console.log("Messages received", msgs);
      let messages = msgs.messages.map((msg) => {
        msg.date = new Date(msg.date);
        return msg;
      });
      setMessages(messages);
    });

    return () => socket.close();
  }, []);

  const sendMessage = () => {
    if (input.trim()) {
      socket?.emit("message", {
        text: input,
        room: currentRoom, // Specify the room
      });
      setInput("");
    }
  };
  console.log("messages", messages);

  const renderMessage = ({ item }) => (
    <View style={styles.message}>
      <Text>{item.text}</Text>
      {/* Render additional message details */}
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(item, index) => index.toString()}
        // additional FlatList props
      />
      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.textInput}
          placeholder="Type a message"
          value={input}
          onChangeText={setInput}
        />
        <TouchableOpacity onPress={sendMessage} style={styles.sendButton}>
          <Text>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    backgroundColor: "white",
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
    backgroundColor: "white",
    borderTopWidth: 1,
    borderTopColor: "#e1e1e1",
  },
  textInput: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 10,
    alignSelf: "center",
  },
  sendButton: {
    position: "absolute",
    right: 20,
    zIndex: 1,
  },
  message: {
    backgroundColor: "#e1e1e1",
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
    marginHorizontal: 10,
    alignSelf: "flex-start",
  },
});

export default Chat;
