import React, { useState, useRef, Fragment } from "react";
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
import Header from "../../components/header";

import compose from "../../assets/icons/compose.png";
import Button from "../../components/button";
import profile from "../../assets/icons/profilepic.png";
import groupProfile from "../../assets/icons/groupProfile.png";
import searchicon from "../../assets/icons/search.png";

import { useSelector } from "react-redux";
import { useFetchGroupsQuery } from "../../api/usersApi";
import { useFetchUserGroups } from "../../services/actions/groupActions";
import { selectUserById } from "../auth/usersSlice";

const HEADER_HEIGHT = 60;

const ChatList = ({ navigation }) => {
  const userId = useSelector(selectUserById);
  const { data: groups } = useFetchUserGroups(userId);
  const [search, setSearch] = useState("");
  const scrollY = useRef(new Animated.Value(0)).current;
  const simplifiedGroups = groups.map(({ groupName, bio, users }) => ({
    groupName,
    bio,
    numberOfUsers: users.length,
  }));

  const nav = (screen) => {
    navigation.navigate(screen);
  };

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
        style={{ ...style.container, marginBottom: -insets.bottom }}
      >
        <Header
          leftComponent={
            <Fragment>
              <Button
                onPress={() => navigation.navigate("ProfileScreen")}
                imgSource={profile}
                style={style.iconContainer}
                imgStyle={style.profileImage}
              />
              <Text style={style.text}>Chats</Text>
            </Fragment>
          }
          middleComponent={null}
          rightComponent={null}
        />
        <Animated.FlatList
          data={filteredMessages}
          renderItem={renderItem}
          keyExtractor={(item) => item._id.toString()}
          contentContainerStyle={style.messageContainer}
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
        onPress={() => nav("AddChat")}
        style={style.addGroupButton}
        imgSource={compose}
        imgStyle={style.addGroupIcon}
      />
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  iconContainer: {
    flex: 1,
    aspectRatio: 1,
    maxHeight: 45,
    maxWidth: 45,
    backgroundColor: "transparent",
    marginBottom: 10,
  },
  messageContainer: {
    flex: 0,
  },

  TextInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingTop: 10,
    paddingBottom: 10,
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10,
    height: 40,
  },
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
  profileImage: {
    width: 35,
    height: 35,
    borderRadius: 25,
  },
  profileImage1: {
    backgroundColor: "transparent",
    width: 45,
    height: 45,
    marginRight: 15,
  },
  text: {
    fontSize: 25,
    fontWeight: "bold",
    color: "black",
    marginBottom: 10,
    marginLeft: 10,
  },
  addGroupIcon: {
    width: 24,
    height: 24,
  },
  addGroupButton: {
    backgroundColor: "white",
    borderRadius: 30,
    width: 55,
    height: 55,
    bottom: 20,
    right: 15,
    position: "absolute", // Add this line to position it absolutely.
    alignSelf: "flex-end",
    shadowColor: "#000", // For iOS
    shadowOffset: {
      width: 0,
      height: 2, // Shadow position
    },
    shadowOpacity: 0.3, // Shadow opacity
    shadowRadius: 4.65, // Blur radius
  },
});

export default ChatList;
