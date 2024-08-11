import React, { useState, useEffect } from "react";
import { ObjectId } from "mongodb";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  FlatList,
  KeyboardAvoidingView,
  Image,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Button from "../../components/button";
import send from "../../assets/icons/send.png";
import { io, Socket } from "socket.io-client";
import groupProfile from "../../assets/icons/groupProfile.png";
import Config from "react-native-config";
import { selectUserById } from "../auth/usersSlice";
import { useSelector } from "react-redux";
import { sendMessage as sendChatMessage, handleMessage } from "./client/ChatClient";

interface Message {
  sender_id: ObjectId;
  conversation_id: ObjectId;
  text: string;
  created_at: Date;
}

interface RouteParams {
  currentRoom: string;
}

interface ChatProps {
  route: {
    params: RouteParams;
  };
}

const Chat = ({ route }: ChatProps) => {
  const userId = useSelector(selectUserById);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>("");
  const [socket, setSocket] = useState<Socket | null>(null);
  const { conversationId, currentRoom } = route.params;
  console.log("currentRoom", conversationId);
 
  const handleNewMessage = async () => {
    try{
      const message = await handleMessage();
      console.log("Received message:", message);
      setMessages((prevMessages) => [...prevMessages, message]);
    } catch (error) {
      console.log("Error receiving message:", error);
    }
    
  }

  useEffect(() => {
    const socketUrl = Config.SOCKET_URL || "http://localhost:3000";
    const newSocket = io(socketUrl);
    setSocket(newSocket);
  
    newSocket.on("connect", () => {
      console.log("Connected to socket server:", newSocket.id);
      newSocket.emit("join-chat", { conversationId });
    });
  
    // handleMessage().then((message) => {
    //   console.log("Received message:", message);
    //   setMessages((prevMessages) => [...prevMessages, message]);
    // });

    handleNewMessage();
  
    return () => {
      newSocket.emit("leaveRoom", { conversationId });
      newSocket.disconnect();
    };
  }, [conversationId]);
  

  const handleSendMessage = () => {
    if (input.trim() && socket) {
      const message: Message = {
        sender_id: userId,
        conversation_id: conversationId,
        text: input,
        created_at: new Date(),
      };
      console.log("Sending message:", message);
      sendChatMessage(message);
      setMessages((prevMessages) => [...prevMessages, message]);
      setInput("");
    }
  };
  

  const renderMessage = ({ item }: { item: Message }) => (
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
        keyboardVerticalOffset={Platform.OS === "ios" ? -80 : 0}
      >
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.textInput}
            placeholder="Type a message"
            value={input}
            onChangeText={setInput}
          />
          <Button
            onPress={handleSendMessage}
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
