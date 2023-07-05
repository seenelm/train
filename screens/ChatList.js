import React, { useState, useRef } from "react";
import Message from "../components/Message";
import {
  Text,
  View,
  FlatList,
  TextInput,
  Image,
  TouchableOpacity,
  Animated,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { chatListStyles } from "../styles/Styles";
import { messages } from "../assets/Data";
import compose from "../assets/icons/compose.png";

const HEADER_HEIGHT = 60;

const ChatList = ({ navigation }) => {
  const [search, setSearch] = useState("");
  const scrollY = useRef(new Animated.Value(0)).current;

  const handleTap = () => {
    navigation.navigate("ChatScreen");
  };

  const renderItem = ({ item }) => (
    <Message
      name={item.name}
      content={item.content}
      onPress={handleTap}
      profilePic={item.profilePic}
      navigation={navigation}
    />
  );

  const filteredMessages = messages.filter(
    (message) =>
      message.name.toLowerCase().includes(search.toLowerCase()) ||
      message.content.toLowerCase().includes(search.toLowerCase())
  );

  const searchBarPosition = scrollY.interpolate({
    inputRange: [0, HEADER_HEIGHT],
    outputRange: [0, -HEADER_HEIGHT],
    extrapolate: "clamp",
  });

  return (
    <SafeAreaView style={chatListStyles.container}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text style={chatListStyles.text}>Messages</Text>
        <TouchableOpacity>
          <Image source={compose} style={{ width: 23, height: 23 }} />
        </TouchableOpacity>
      </View>
      <Animated.FlatList
        data={filteredMessages}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={chatListStyles.messageContainer}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        ListHeaderComponent={
          <Animated.View
            style={{
              transform: [{ translateY: searchBarPosition }],
            }}
          >
            <TextInput
              style={chatListStyles.TextInput}
              placeholder="Jump to..."
              value={search}
              onChangeText={setSearch}
              autoCorrect={false}
              spellCheck={false}
              keyboardAppearance="dark"
            />
          </Animated.View>
        }
        ListHeaderComponentStyle={{
          height: HEADER_HEIGHT,
          justifyContent: "flex-end",
        }}
        scrollIndicatorInsets={{ right: 1 }}
      />
    </SafeAreaView>
  );
};

export default ChatList;
