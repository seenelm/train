import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
import Request from "../../components/request";
import { useGroupRequestsQuery } from "../../api/groupsApi";
import { selectUserById } from "../auth/usersSlice";
import { useSelector } from "react-redux";
import ProfilePic from "../../assets/icons/profilepic.png";
import { Image } from "react-native-svg";

function Requests() {
  const userId = useSelector(selectUserById);
  const { data: groupsWithRequests } = useGroupRequestsQuery(userId);
  console.log("GroupsWithRequests", groupsWithRequests);

  if (!groupsWithRequests || groupsWithRequests.length === 0) {
    return (
      <View style={styles.container}>
        <Image source={ProfilePic} style={styles.profilePic} />
        <Text>No notifications available</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {groupsWithRequests.map((group, groupIndex) =>
        group.joinRequests.map((joinRequest, requestIndex) => (
          <Request
            key={`${groupIndex}-${requestIndex}`}
            userName={joinRequest.username}
            groupName={group.groupName}
            profilePic={ProfilePic}
          />
        ))
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "white",
  },
  profilePic: {
    width: 40,
    height: 40,
    borderRadius: 25, // Circular image
    marginRight: 10,
  },
});

export default Requests;
