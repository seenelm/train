import React, { useState } from "react";
import Message from "./Message";
import { Text, FlatList, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { chatListStyles } from "../styles/Styles";
import { messages } from "../assets/Data";

const ChatList = ({ navigation }) => {
  const [search, setSearch] = useState("");

  const handleTap = () => {
    navigation.navigate("ChatScreen");
  };

  const renderItem = ({ item }) => (
    <Message name={item.name} content={item.content} onPress={handleTap} />
  );

  const filteredMessages = messages.filter(
    (message) =>
      message.name.toLowerCase().includes(search.toLowerCase()) ||
      message.content.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <SafeAreaView style={chatListStyles.container}>
      <Text style={chatListStyles.text}>Messages</Text>
      <TextInput
        style={chatListStyles.TextInput}
        placeholder="Jump to..."
        value={search}
        onChangeText={setSearch}
      />
      {filteredMessages.length > 0 && (
        <FlatList
          data={filteredMessages}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={chatListStyles.messageContainer}
        />
      )}
    </SafeAreaView>
  );
};

export default ChatList;
