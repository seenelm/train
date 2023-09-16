import React, { useState, useRef } from "react";
import {
  Animated,
  Text,
  TextInput,
  FlatList,
  View,
  StyleSheet,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Profile from "../../components/profile";
import searchicon from "../../assets/icons/search.png";

import { athletes } from "../../assets/Data";

const Search = () => {
  const [search, setSearch] = useState("");

  // create animated value
  const animation = useRef(new Animated.Value(0)).current;

  // run animation
  const handleFocus = () => {
    Animated.timing(animation, {
      toValue: 1,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  const handleBlur = () => {
    Animated.timing(animation, {
      toValue: 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  // interpolate animated value
  const textTranslate = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -30],
  });

  const textOpacity = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0],
  });

  const handleTap = () => {
    console.log("Item tapped");
  };

  // Filter the athletes array based on search input
  const filteredAthletes = athletes.filter(
    (athlete) =>
      athlete.name.toLowerCase().includes(search.toLowerCase()) ||
      athlete.content.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <SafeAreaView style={searchStyles.container}>
      <Animated.Text
        style={[
          searchStyles.text,
          { transform: [{ translateY: textTranslate }], opacity: textOpacity },
        ]}
      >
        Search
      </Animated.Text>
      <Animated.View style={{ transform: [{ translateY: textTranslate }] }}>
        <View style={searchStyles.searchBar}>
          <Image
            source={searchicon}
            style={{ width: 20, height: 20, marginRight: 10 }}
          />
          <TextInput
            placeholder="Jump to..."
            style={searchStyles.textInput}
            onChangeText={(text) => setSearch(text)}
            value={search}
            onFocus={handleFocus}
            onBlur={handleBlur}
            autoCorrect={false}
            spellCheck={false}
            keyboardAppearance="dark"
            autoFocus={true}
          />
        </View>
      </Animated.View>
      {search.length > 0 && filteredAthletes.length > 0 && (
        <View style={{ alignSelf: "stretch" }}>
          <Text
            style={{
              fontSize: 18,
              fontWeight: "bold",
              marginBottom: 10,
              marginLeft: 15,
            }}
          >
            Profiles
          </Text>
          <FlatList
            contentContainerStyle={{ paddingLeft: 15 }}
            data={filteredAthletes}
            renderItem={({ item }) => (
              <View style={searchStyles.searchContainer}>
                <Profile
                  name={item.name}
                  content={item.content}
                  showForwardIcon={true}
                  onPress={handleTap}
                />
              </View>
            )}
            keyExtractor={(item) => item.id.toString()}
            showsVerticalScrollIndicator={false}
          />
        </View>
      )}
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
    fontSize: 40,
    fontWeight: "bold",
    marginBottom: 20,
  },
  searchBar: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    borderRadius: 10,
    paddingHorizontal: 10,
    marginLeft: 10,
    marginRight: 10,
    height: 40,
    backgroundColor: "#F6F6F8",
  },
  searchIcon: {
    padding: 10,
  },
  textInput: {
    width: "100%",
    height: "100%",
  },
  searchContainer: {
    backgroundColor: "#F6F6F8",
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 5,
  },
});

export default Search;
