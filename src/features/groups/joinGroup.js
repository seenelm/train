import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { useJoinGroupMutation, useFetchGroupQuery } from "../../api/groupsApi";
import Button from "../../components/button";

function JoinGroup({ route, navigation }) {
  const { groupId } = route.params;
  const { data: groupProfile } = useFetchGroupQuery(groupId);
  console.log("GroupProfile", groupProfile);
  const [joinGroup] = useJoinGroupMutation();

  const handleJoinGroup = async () => {
    try {
      await joinGroup({ groupId });
      navigation.replace("Group", { groupName: name, groupId: groupId });
    } catch (err) {
      console.log("Add Group Error: ", err);
    }
  };

  return (
    <View style={styles.parentContainer}>
      <View style={styles.container}>
        <View style={styles.groupImageContainer}>
          <Image
            source={require("../../assets/trainer.jpg")}
            style={styles.groupImage}
          />
        </View>
        {groupProfile && (
          <Text style={styles.groupName}>{groupProfile.groupName}</Text>
        )}
        <Text style={styles.groupMembers}>fitspace • 10 people</Text>
        {groupProfile && (
          <Text style={styles.groupMembers}>{groupProfile.bio}</Text>
        )}
        <View style={styles.members}>
          <Button style={styles.deleteBtn} onPress={handleJoinGroup}>
            Join Fitspace
          </Button>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  parentContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
  optionsContainer: {
    paddingHorizontal: 20,
    borderRadius: 10,
    margin: 20,
  },
  groupImageContainer: {
    width: "100%",
    alignItems: "center",
  },
  groupImage: {
    width: 150,
    height: 150,
    aspectRatio: 1,
    borderRadius: 18,
    overflow: "hidden",
  },
  groupName: {
    fontSize: 28,
    fontWeight: "600", // slightly less bold
    color: "#333", // darker color for better readability
    marginTop: 10,
  },
  groupMembers: {
    fontSize: 18,
    margin: 10,
    color: "gray",
  },
  members: {
    width: "90%",
  },
  deleteBtn: {
    borderRadius: 10,
    height: 50,
    marginBottom: 20,
  },
});

export default JoinGroup;
