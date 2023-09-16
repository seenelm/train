import React from "react";

import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import profile from "../../assets/icons/profilepic.png";
import { SafeAreaView } from "react-native-safe-area-context";
import Button from "../../components/button";

const Profile = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.profileSection}>
        <Image style={styles.profileImg} source={profile} />
        <View style={styles.profileDetails}>
          <Text style={styles.name}>Yassine Elmellouki</Text>
          <Text style={styles.role}>Personal Trainer</Text>
        </View>
      </View>
      <View style={styles.followSection}>
        <View style={styles.fButton}>
          <TouchableOpacity>
            <Text style={styles.count}>210</Text>
          </TouchableOpacity>
          <Text style={styles.fTitle}>Followers</Text>
        </View>
        <Text style={styles.spacer}>|</Text>
        <View style={styles.fButton}>
          <TouchableOpacity>
            <Text style={styles.count}>402</Text>
          </TouchableOpacity>
          <Text style={styles.fTitle}>Following</Text>
        </View>
      </View>

      <Button style={styles.editBtn}>Edit Profile</Button>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  centerItems: {
    alignItems: "center",
    marginBottom: 30,
  },
  profileSection: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  followSection: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  title: {
    fontSize: 30,
    marginBottom: 50,
  },
  profileImg: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  profileDetails: {
    flexDirection: "column",
    marginLeft: 10,
  },
  username: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 2,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 2,
    textAlign: "center",
  },
  role: {
    fontSize: 15,
    marginBottom: 20,
    textAlign: "center",
  },
  fButton: {
    padding: 10,
    alignItems: "center",
  },
  fTitle: {
    fontSize: 15,
    marginBottom: 2,
  },
  count: {
    fontSize: 24,
    fontWeight: "bold",
  },
  editBtn: {
    borderRadius: 10,
    marginBottom: 20,
    height: 50,
  },
  spacer: {
    fontSize: 20,
    margin: 10,
  },
});

export default Profile;
