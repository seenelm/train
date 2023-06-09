import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import profile from "../assets/icons/seenprofile.png";

const ProfileScreen = () => {
  return (
    <View style={styles.container}>
      <Image style={styles.profileImg} source={profile} />
      <Text style={styles.name}>Your Name</Text>

      <View style={styles.socialMediaContainer}>
        <TouchableOpacity onPress={() => alert("Facebook pressed!")}>
          <Text style={styles.socialMediaText}>Facebook</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => alert("Twitter pressed!")}>
          <Text style={styles.socialMediaText}>Twitter</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => alert("Instagram pressed!")}>
          <Text style={styles.socialMediaText}>Instagram</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  profileImg: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginBottom: 20,
  },
  name: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
  },
  socialMediaContainer: {
    justifyContent: "space-between",
    width: "60%",
  },
  socialMediaText: {
    fontSize: 18,
    color: "blue",
    textDecorationLine: "underline",
    marginBottom: 10,
  },
});

export default ProfileScreen;
