import React, { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import Config from "react-native-config";

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    // Initialize socket connection
    const newSocket = io(Config.SOCKET_URL);
    setSocket(newSocket);

    // Clean up on unmount
    return () => newSocket.disconnect();
  }, []);

  // Function to join a chat room
  const joinChat = (roomId) => {
    socket?.emit("join-room", roomId);
  };

  // Function to send a message
  const sendMessage = (message) => {
    socket?.emit("message", message);
  };

  // Listen for incoming messages
  useEffect(() => {
    socket?.on("message", (message) => {
      // Handle incoming message
      console.log("New message received", message);
    });
  }, [socket]);

  return (
    <ChatContext.Provider value={{ joinChat, sendMessage }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => useContext(ChatContext);
