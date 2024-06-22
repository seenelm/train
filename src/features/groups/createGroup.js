import React, { useState } from "react";
import { View, Text, TextInput, Image, StyleSheet } from "react-native";
import Button from "../../components/button";
import { Dimensions } from "react-native";
import { useSelector } from "react-redux";
import { useAddGroup } from "../../services/actions/groupActions";
import { selectUserById } from "../auth/usersSlice";
import down from "../../assets/icons/down.png";
import pencil from "../../assets/icons/pencil.png";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const CreateGroup = ({ navigation }) => {
  const [groupName, setGroupName] = useState("");
  const userId = useSelector(selectUserById);
  const { mutate: addGroup, isLoading, isError, error } = useAddGroup();

  const handleAddGroup = () => {
    addGroup(
      { groupName, userId },
      {
        onSuccess: (response) => {
          const groupId = response.groupId;
          navigation.replace("Group", { groupName, groupId });
        },
        onError: (error) => {
          console.error("Failed to create group", error);
        },
      }
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Button
          style={styles.cancelButton}
          imgStyle={{ width: 20, height: 20 }}
          imgSource={down}
          textStyle={styles.cancelButtonText}
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.title}>Create a Fitspace</Text>
        <Button
          style={styles.cancelButton}
          textStyle={styles.cancelButtonText}
          onPress={handleAddGroup}
        >
          Save
        </Button>
      </View>

      <View style={styles.inputRow}>
        <Image source={pencil} style={{ width: 25, height: 25 }} />
        <TextInput
          style={styles.input}
          value={groupName}
          onChangeText={(name) => setGroupName(name)}
          placeholder="Name your Fitspace"
          autoCorrect={false}
          spellCheck={false}
          autoFocus={true}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingVertical: screenHeight * 0.02,
    paddingHorizontal: screenWidth * 0.05,
  },
  title: {
    fontSize: screenHeight * 0.025,
    fontWeight: "bold",
  },
  cancelButton: {
    backgroundColor: "transparent",
  },
  cancelButtonText: {
    color: "black",
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: screenWidth * 0.05,
    paddingHorizontal: screenWidth * 0.025,
    borderColor: "lightgrey",
    borderWidth: 0.2,
    borderRadius: 10,
    backgroundColor: "#F6F6F8",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 0.5 },
    shadowOpacity: 0.3,
    shadowRadius: 1,
    elevation: 2,
  },
  input: {
    flex: 1,
    paddingHorizontal: screenWidth * 0.03,
    height: screenHeight * 0.06,
    justifyContent: "center",

    fontSize: screenHeight * 0.02,
  },
});

export default CreateGroup;
