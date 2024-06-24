import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  KeyboardAvoidingView,
  ViewStyle,
  Platform
} from "react-native";
import send from "../../assets/icons/send.png";
import Button from "../../components/button";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSearchUsers } from "../../services/actions/searchActions";
import Profile from "../../components/profile";
// import groupProfile from "../../assets/icons/groupProfile.png";
import { RouteProp } from "@react-navigation/native";
import { selectUserById } from "../auth/usersSlice";
import { useSelector } from "react-redux";
import {
  CreateConversation,
  ConversationRequest,
  MessageRequest,
  MessageResponse,
  InitMessageRequest,
  User
} from "./types";
import { socket, createConversation } from "./socketClient";


type ParamList = {
  AddChat: {
    userId: string;
    inNavigator: boolean;
  }
};

type Props = {
  route: RouteProp<ParamList, 'AddChat'>;
};

// changes for messages feature on frontend
const AddChat = ({ route }: Props ) => {
  const userId = useSelector(selectUserById);
  const inNavigator = route.params?.inNavigator ?? false;
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [connected, setConnected] = useState(false);
  const [name, setName] = useState(null);
  const [recipient, setRecipient] = useState<string>("");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showProfiles, setShowProfiles] = useState(true);

  const { data } = useSearchUsers(recipient);

  const selectUser = (data: any) => {
    const user: User = {
      id: data._id,
      name: data.name,
    };
    setSelectedUser(user);
    setShowProfiles(false);
  };
  
  const handleCreateChat = () => {
    const init_message_request: InitMessageRequest = {
      sender_id: userId,
      text: input,
      created_at: new Date(),
    };

    const conversation_request: ConversationRequest = {
      name: recipient,
      owner_id: userId,
      members: selectedUser ? [selectedUser] : [],
      created_at: new Date(),
    }

    const createConversationRequest: CreateConversation = {
      conversation_request,
      init_message_request,
    };
    console.log("Handle Chat", createConversationRequest);
    createConversation(createConversationRequest);
      // Optionally clear the input field after sending
    setInput("");
  };

    interface Item {
      username?: string;
      name?: string;
    }
    
    interface Props {
      item: Item;
    }

    const renderItem = ({ item }: Props) => {
      if (item.username) {
        return (
          <View style={styles.searchContainer as ViewStyle}>
            <Profile
              name={item.name}
              username={item.username}
              showForwardIcon={false}
              onPress={() => selectUser(item)}
            />
          </View>
        );
      }
      return null;
    };

  // const sendMessage = () => {
  //   if (input.trim()) {
  //     socket?.emit("create-chat", {
  //       createConversation,
  //     });
  //     setInput("");
  //   }
  // };

  const renderMessage = (message: MessageResponse ) => (
    <View style={styles.message}>
      <Text>{message.text}</Text>
      {/* Render additional message details */}
    </View>
  );

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
            onChangeText={(text) => setRecipient(text)}
            autoFocus={!inNavigator}
            autoCorrect={false}
            editable={true} // Optional: Make input non-editable if desired
          />
        </View>
      </View>
      {showProfiles && (
        <FlatList
          contentContainerStyle={{ paddingLeft: 15 }}
          data={data}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        />
      )}
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
            onPress={handleCreateChat}
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
  searchContainer: {
    paddingRight: 10,
    borderRadius: 10,
    marginBottom: 5,
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
  message: {
    backgroundColor: "#e1e1e1",
    padding: 10,
    borderRadius: 16,
    marginVertical: 5,
    marginHorizontal: 10,
    alignSelf: "flex-end",
  },
});

export default AddChat;