import React from "react";
import Message from "./Message";
import { View, StyleSheet } from "react-native";

const ChatList = ({ navigation }) => {
  const handleTap = () => {
    navigation.navigate("ChatScreen");
  };

  return (
    <View style={styles.container}>
      <Message
        name="Noah Gross"
        content="Do you want to go see Guardians of the Galaxy!"
        onPress={handleTap}
      />
      <Message
        name="Yassine"
        content="Do you want to go see Guardians of the Galaxy!"
        onPress={handleTap}
      />
      <Message
        name="Badr"
        content="Do you want to go see Guardians of the Galaxy!"
        onPress={handleTap}
      />
      <Message
        name="Myah"
        content="Do you want to go see Guardians of the Galaxy!"
        onPress={handleTap}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 10,
  },
});

export default ChatList;
