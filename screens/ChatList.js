import React from "react";
import Message from "../components/Message";
import { Text, FlatList, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "../styles/ChatListStyles";

const ChatList = ({ navigation }) => {
  const handleTap = () => {
    navigation.navigate("ChatScreen");
  };

  const messages = [
    {
      id: 1,
      name: "Noah Gross",
      content:
        "Do you want to go see Guardians of the Galaxy! test test tes test test test test test",
    },
    {
      id: 2,
      name: "Yassine",
      content: "Do you want to go see Guardians of the Galaxy!",
    },
    {
      id: 3,
      name: "Badr",
      content: "Do you want to go see Guardians of the Galaxy!",
    },
    {
      id: 4,
      name: "Myah",
      content: "Do you want to go see Guardians of the Galaxy!",
    },
  ];

  const renderItem = ({ item }) => (
    <Message name={item.name} content={item.content} onPress={handleTap} />
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>Messages</Text>
      <TextInput style={styles.TextInput} placeholder="Jump to..."></TextInput>
      <FlatList
        data={messages}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.messageContainer}
      />
    </SafeAreaView>
  );
};

export default ChatList;
