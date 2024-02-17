import React, { useState, useRef } from "react";
import Message from "../../components/message";
import {
  Text,
  View,
  TextInput,
  Animated,
  Image,
  StyleSheet,
} from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { chatListStyles, dashboardStyles } from "../../styles/styles";
import { messages } from "../../assets/Data";
import compose from "../../assets/icons/compose.png";
import Button from "../../components/button";
import profile from "../../assets/icons/profilepic.png";
import groupProfile from "../../assets/icons/groupProfile.png";
import searchicon from "../../assets/icons/search.png";

import { useSelector } from "react-redux";
import { useFetchGroupsQuery } from "../../api/usersApi";
import { selectUserById } from "../auth/usersSlice";

const HEADER_HEIGHT = 60;

const ChatList = ({ navigation }) => {
  const userId = useSelector(selectUserById);
  const { data: groups, refetch } = useFetchGroupsQuery(userId);
  const [search, setSearch] = useState("");
  const scrollY = useRef(new Animated.Value(0)).current;
  const simplifiedGroups = groups.map(({ groupName, bio, users }) => ({
    groupName,
    bio,
    numberOfUsers: users.length,
  }));

  console.log(JSON.stringify(simplifiedGroups, null, 2));

  const renderItem = ({ item }) => {
    return (
      <Message
        name={item.groupName}
        content={item.bio}
        profilePic={groupProfile}
        navigation={navigation}
        route={{ params: { currentRoom: item.groupName, id: item._id } }}
      />
    );
  };

  const filteredMessages = groups.filter(
    (message) =>
      message.groupName.toLowerCase().includes(search.toLowerCase()) ||
      message.bio.toLowerCase().includes(search.toLowerCase())
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
          <Text style={dashboardStyles.text}>Chats</Text>
        </View>
        <Animated.FlatList
          data={filteredMessages}
          renderItem={renderItem}
          keyExtractor={(item) => item._id.toString()}
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
              <View style={style.searchBar}>
                <Image
                  source={searchicon}
                  style={{ width: 20, height: 20, marginRight: 10 }}
                />
                <TextInput
                  placeholder="Jump to..."
                  value={search}
                  onChangeText={setSearch}
                  autoCorrect={false}
                  spellCheck={false}
                  keyboardAppearance="dark"
                />
              </View>
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

const style = StyleSheet.create({
  searchBar: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    borderRadius: 10,
    paddingHorizontal: 10,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
    height: 40,
    backgroundColor: "#F6F6F8",
  },
  searchIcon: {
    padding: 10,
  },
});

export default ChatList;
