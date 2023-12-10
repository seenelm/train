import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import Button from "../../components/button";
import profile from "../../assets/icons/profilepic.png";

const Profile = () => {
  const name = useSelector((state) => state.users.username);
  const bio = "15 years certified trainer";
  const followers = "210";
  const following = "402";

  return (
    <SafeAreaView style={styles.container} edges={["left", "right", "bottom"]}>
      <View style={styles.banner}></View>
      <View style={styles.profileSection}>
        <Image style={styles.profileImg} source={profile} />
      </View>
      <View style={styles.infoSection}>
        <View style={styles.userInfo}>
          <Text style={styles.username}>@{name}</Text>
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
          <Button style={styles.buttonStyle}>Edit Profile</Button>
        </View>
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
    width: "100%",
    height: 40,
    borderRadius: 8,
  },
});

export default Profile;
