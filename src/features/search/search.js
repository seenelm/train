import React, { useState, useRef, useEffect } from "react";
import { TextInput, FlatList, View, StyleSheet, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Profile from "../../components/profile";
import GroupProfile from "../../components/groupProfile";
import searchicon from "../../assets/icons/search.png";
import { useFindUsersQuery } from "../../api/searchApi";
import { useIsFocused } from "@react-navigation/native";
import back from "../../assets/icons/back.png";

const Search = ({ navigation }) => {
  const [search, setSearch] = useState("");
  const isFocused = useIsFocused();
  const textInputRef = useRef(null);

  const { data, refetch } = useFindUsersQuery(search);
  console.log("Search Data: ", data);

  useEffect(() => {
    if (search !== "") {
      refetch();
    }
  }, [search]);

  useEffect(() => {
    if (isFocused) {
      // This will run when the screen comes into focus
      setSearch("");
      textInputRef.current.focus(); // Focus the text input
    }
  }, [isFocused]);

  const renderItem = ({ item }) => {
    if (item.username) {
      return (
        <View style={searchStyles.searchContainer}>
          <Profile
            name={item.name}
            username={item.username}
            showForwardIcon={true}
            onPress={() =>
              navigation.navigate("UserProfile", { userId: item._id })
            }
          />
        </View>
      );
    } else if (
      item.groupName &&
      item.isMember === false &&
      item.accountType === 1
    ) {
      return (
        <GroupProfile
          groupName={item.groupName}
          onPress={() =>
            navigation.navigate("JoinGroup", {
              groupName: item.groupName,
              groupId: item._id,
            })
          }
        />
      );
    } else if (
      item.groupName &&
      item.isMember === false &&
      item.accountType === 2
    ) {
      return (
        <GroupProfile
          groupName={item.groupName}
          onPress={() =>
            navigation.navigate("RequestGroup", {
              groupName: item.groupName,
              groupId: item._id,
            })
          }
        />
      );
    } else {
      return (
        <GroupProfile
          groupName={item.groupName}
          onPress={() =>
            navigation.navigate("Group", {
              groupName: item.groupName,
              groupId: item._id,
            })
          }
        />
      );
    }
  };

  return (
    <SafeAreaView style={searchStyles.container}>
      <View style={searchStyles.header}>
        <Image source={back} style={searchStyles.back} />
        <View style={searchStyles.searchBar}>
          <Image
            source={searchicon}
            style={{ width: 20, height: 20, marginRight: 10 }}
          />
          <TextInput
            ref={textInputRef}
            placeholder="Jump to..."
            style={searchStyles.textInput}
            onChangeText={(text) => setSearch(text)}
            value={search}
            autoCorrect={false}
            spellCheck={false}
            keyboardAppearance="dark"
            autoFocus={true}
          />
        </View>
      </View>

      <View style={{ alignSelf: "stretch" }}>
        <FlatList
          contentContainerStyle={{ paddingLeft: 15 }}
          data={data}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        />
      </View>
    </SafeAreaView>
  );
};

const searchStyles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    paddingBottom: 5,
    backgroundColor: "white",
  },
  text: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 10,
    paddingHorizontal: 10,
    marginLeft: 10,
    height: 40,
    backgroundColor: "#F6F6F8",
  },
  searchIcon: {
    padding: 10,
  },
  textInput: {
    width: "80%",
    height: "100%",
  },
  searchContainer: {
    paddingRight: 10,
    borderRadius: 10,
    marginBottom: 5,
  },
  back: {
    width: 20,
    height: 20,
    marginLeft: 5,
    marginTop: 3,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
  },
});

export default Search;
