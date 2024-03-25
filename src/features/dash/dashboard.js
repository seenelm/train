import React, { useState, useEffect } from "react";
import {
  FlatList,
  View,
  Image,
  RefreshControl,
  StyleSheet,
} from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import Card from "../../components/card";
import Button from "../../components/button";
import Header from "../../components/header";
import Skeleton from "../../components/skeleton";

import search from "../../assets/icons/search.png";
import bell from "../../assets/icons/bell.webp";
import profile from "../../assets/icons/profilepic.png";
import addgroup from "../../assets/icons/add.png";
import logo from "../../assets/icons/logo3.png";

import { useSelector } from "react-redux";
import { useFetchGroupsQuery } from "../../api/usersApi";
import { useFetchUserGroups } from "../../services/actions/groupActions";
import { selectUserById } from "../auth/usersSlice";

const Dashboard = ({ navigation }) => {
  const userId = useSelector(selectUserById);
  // Use RTK Query hook
  // const {
  //   data: groupData,
  //   isFetching: isFetchingGroups,
  //   refetch,
  // } = useFetchGroupsQuery(userId);

  const { data: groups, isFetching: isFetchingGroups } =
    useFetchUserGroups(userId);
  console.log("groupData", groups);

  const [placeholderImage, setPlaceholderImage] = useState(null);

  const isLoading = !placeholderImage || isFetchingGroups;

  useEffect(() => {
    const fetchPlaceholderImage = async () => {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/photos/26"
        );
        const imageData = await response.json();
        setPlaceholderImage(imageData.url); // Set the fetched image URL as the placeholder
      } catch (error) {
        console.error("Failed to fetch placeholder image", error);
      }
    };

    fetchPlaceholderImage();
  }, []); // Dependency array is empty, so this runs once on mount

  const onRefresh = () => {
    refetch(); // RTK Query refetch for groups data
  };

  const handleSearchTap = () => {
    navigation.navigate("SearchScreen");
  };

  const handleNotification = () => {
    navigation.navigate("Request");
  };

  const handleProfileTap = () => {
    navigation.navigate("ProfileScreen");
  };

  const handleGroupTap = (groupName, groupId) => {
    navigation.navigate("Group", { groupName, groupId });
  };

  const handleAddGroupTap = () => {
    navigation.navigate("AddGroup");
  };

  const renderItem = ({ item }) => (
    <View style={{ flex: 1 }}>
      <Card
        fitspaceName={item.groupName}
        imageSource={{ uri: placeholderImage }}
        onPress={() => handleGroupTap(item.groupName, item._id)}
        groupId={item._id}
      />
    </View>
  );

  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView style={{ ...style.container, marginBottom: -insets.bottom }}>
      <Header
        leftComponent={
          <Button
            onPress={handleProfileTap}
            imgSource={profile}
            style={style.iconContainer}
            imgStyle={style.profileImage}
          />
        }
        middleComponent={<Image source={logo} style={style.logo} />}
        rightComponent={
          <>
            <Button
              onPress={handleNotification}
              style={style.iconContainer}
              imgSource={bell}
              imgStyle={style.image}
            />
            <Button
              onPress={handleSearchTap}
              style={style.iconContainer}
              imgSource={search}
              imgStyle={style.image}
            />
          </>
        }
      />
      <View style={{ flex: 1 }}>
        {isLoading ? (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              padding: 5,
            }}
          >
            <Skeleton style={style.imageBackground} />
            <Skeleton style={style.imageBackground} />
          </View>
        ) : (
          <FlatList
            data={groups}
            renderItem={renderItem}
            keyExtractor={(item) => item._id}
            numColumns={groups?.length === 1 ? 1 : 2}
            key={groups?.length === 1 ? "singleColumn" : "doubleColumn"}
            refreshControl={<RefreshControl onRefresh={onRefresh} />}
          />
        )}

        <Button
          onPress={handleAddGroupTap}
          style={style.addGroupButton}
          imgSource={addgroup}
          imgStyle={style.addGroupIcon}
        />
      </View>
    </SafeAreaView>
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
  profileImage: {
    width: 35,
    height: 35,
    borderRadius: 25,
  },
  logo: {
    backgroundColor: "transparent",
    width: 40,
    height: 40,
    marginBottom: 10,
  },
  image: {
    flex: 1,
    aspectRatio: 1,
    marginTop: 2,
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
    position: "absolute",
    alignSelf: "flex-end",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
  },
  imageBackground: {
    justifyContent: "center",
    marginBottom: 10,
    // width: "100%",
    aspectRatio: 1,
    borderRadius: 15,
    overflow: "hidden",
  },
});

export default Dashboard;
