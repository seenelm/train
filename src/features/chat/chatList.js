import React, { useState, useRef } from "react";
import Message from "../../components/message";
import { Text, View, TextInput, Animated } from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { chatListStyles, dashboardStyles } from "../../styles/styles";
import { messages } from "../../assets/Data";
import compose from "../../assets/icons/compose.png";
import Button from "../../components/button";
import profile from "../../assets/icons/noahprofile.png";

const HEADER_HEIGHT = 60;

const ChatList = ({ navigation }) => {
  const [search, setSearch] = useState("");
  const scrollY = useRef(new Animated.Value(0)).current;

  const renderItem = ({ item }) => {
    return (
      <Message
        name={item.name}
        content={item.content}
        profilePic={item.profilePic}
        navigation={navigation}
        route={{ params: item.name }}
      />
    );
  };

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

  const insets = useSafeAreaInsets();

  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView
        style={{ ...chatListStyles.container, marginBottom: -insets.bottom }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingHorizontal: 10,
          }}
        >
          <Button
            onPress={() => {}}
            imgSource={profile}
            style={dashboardStyles.profileImage1}
            imgStyle={dashboardStyles.profileImage}
          />
          <Text style={dashboardStyles.text}>Messages</Text>
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
      <Button
        onPress={() => {}}
        style={dashboardStyles.addGroupButton}
        imgSource={compose}
        imgStyle={dashboardStyles.addGroupIcon}
      />
    </View>
  );
};

export default ChatList;
