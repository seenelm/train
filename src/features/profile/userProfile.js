import React, { useCallback, useEffect } from "react";
import { View, Text, StyleSheet, Image, FlatList } from "react-native";
import profile from "../../assets/icons/profilepic.png";
import { SafeAreaView } from "react-native-safe-area-context";
import Button from "../../components/button";
import {
  useFetchUserDataQuery,
  useFetchGroupsQuery,
  useFetchFollowDataQuery,
} from "../../api/usersApi";
import Card from "../../components/card";
import trainerImage from "../../assets/trainer.jpg";

const UserProfile = ({ route }) => {
  const { userId } = route.params;
  const { data: users, refetch: refetchUser } = useFetchUserDataQuery(userId);
  const { data: groups, isLoading: groupLoading } = useFetchGroupsQuery(userId);
  const { data: followData, refetch: refetchFollow } =
    useFetchFollowDataQuery(userId);
  console.log("followData", followData);

  useEffect(() => {
    refetchUser();
    refetchFollow();
  }, []);

  let username;
  let bio;
  let followers = 0;
  let following = 0;
  if (followData !== undefined && followData.length > 0) {
    followers = followData[0].followersCount;
    following = followData[0].followingCount;
  }
  if (users === undefined) {
    username = "";
    bio = "";
  } else {
    username = users[0].username;
    bio = users[0].userProfile[0].bio;
  }

  const renderItem = useCallback(
    ({ item }) => (
      <View style={{ flex: 1 }}>
        <Card
          fitspaceName={item.groupName}
          imageSource={trainerImage}
          onPress={() => {}}
          groupId={item._id}
        />
      </View>
    ),
    []
  );

  return (
    <SafeAreaView style={styles.container} edges={["left", "right", "bottom"]}>
      <View style={styles.banner}></View>
      <View style={styles.profileSection}>
        <Image style={styles.profileImg} source={profile} />
      </View>
      <View style={styles.infoSection}>
        <View style={styles.userInfo}>
          <Text style={styles.username}>@{username}</Text>
          <View style={styles.followInfo}>
            <View style={styles.followItem}>
              <Text style={styles.followNumber}>{followers}</Text>
              <Text style={styles.followLabel}>Followers</Text>
            </View>
            <View style={styles.followItem}>
              <Text style={styles.followNumber}>{following}</Text>
              <Text style={styles.followLabel}>Following</Text>
            </View>
          </View>
        </View>
        <Text style={styles.bio}>{bio}</Text>
        <View style={styles.buttonContainer}>
          <Button style={styles.buttonStyle}>Following</Button>
          <Button style={styles.buttonStyle}>Message</Button>
        </View>
      </View>
      <View style={{ flex: 1 }}>
        {groupLoading ? (
          <Text>Loading Groups...</Text>
        ) : groups && groups.length > 0 ? (
          <FlatList
            data={groups}
            renderItem={renderItem}
            keyExtractor={(item) => item._id}
            numColumns={groups.length === 1 ? 1 : 2}
            key={groups.length === 1 ? "singleColumn" : "doubleColumn"}
          />
        ) : (
          <Text></Text> // Display if no groups data
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: 0,
  },
  profileSection: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    marginTop: 75,
  },
  banner: {
    position: "absolute",
    top: 0,
    width: "100%",
    height: 150,
    backgroundColor: "black",
  },
  profileImg: {
    width: 100,
    height: 100,
    borderRadius: 50,
    zIndex: 1,
  },
  username: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 2,
  },
  infoSection: {
    padding: 20,
  },
  userInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  username: {
    fontSize: 18,
    fontWeight: "bold",
  },
  followInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  followItem: {
    alignItems: "center",
    marginHorizontal: 5,
  },
  followNumber: {
    fontSize: 16,
    fontWeight: "bold",
  },
  followLabel: {
    fontSize: 14,
    color: "gray",
  },
  followText: {
    marginLeft: 10,
    fontSize: 16,
    fontWeight: "bold",
  },
  bio: {
    fontSize: 16,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  buttonStyle: {
    padding: 10,
    width: "45%",
    height: 40,
    borderRadius: 8,
  },
});

export default UserProfile;
