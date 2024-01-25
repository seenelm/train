import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import Button from "./button";
import Close from "../assets/icons/close-white.png";
import Approve from "../assets/icons/approve.png";

const Request = ({ userName, groupName, profilePic }) => {
  const handleApprove = () => {
    // Logic for approving the request
  };

  const handleDecline = () => {
    // Logic for declining the request
  };

  return (
    <View style={styles.requestContainer}>
      <Image source={profilePic} style={styles.profilePic} />
      <View style={styles.textContainer}>
        <Text style={styles.requestText}>
          <Text style={{ fontWeight: "bold" }}>{userName}</Text> requested to
          join <Text style={{ fontWeight: "bold" }}>{groupName}</Text>
        </Text>
      </View>
      <View style={styles.buttonsContainer}>
        <Button
          onPress={handleApprove}
          style={styles.approveBtn}
          imgSource={Approve}
          imgStyle={styles.btnImg}
        />
        <Button
          onPress={handleDecline}
          style={styles.declineBtn}
          imgSource={Close}
          imgStyle={styles.btnImg}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  requestContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    marginVertical: 5,
    backgroundColor: "#fff",
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
    elevation: 3,
    width: "95%", // Stretches almost across the screen
  },
  profilePic: {
    width: 40,
    height: 40,
    borderRadius: 25, // Circular image
    marginRight: 10,
  },
  textContainer: {
    flex: 1, // Takes up remaining space
    flexDirection: "row",
    flexWrap: "wrap",
  },
  requestText: {
    fontSize: 16,
    color: "#333",
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  approveBtn: {
    backgroundColor: "white",
    borderRadius: 30,
    height: 30,
    width: 30,
    borderColor: "black",
    borderWidth: 2,
    marginHorizontal: 3,
  },
  btnImg: {
    width: 15,
    height: 15,
  },
  declineBtn: {
    backgroundColor: "black",
    borderRadius: 30,
    height: 30,
    width: 30,
    marginHorizontal: 3,
  },
});

export default Request;
