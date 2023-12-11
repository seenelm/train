import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import Button from "../../components/button";
import uploadImage from "../../assets/icons/uploadimg.png";
import { Dimensions } from "react-native";

import { useSelector } from "react-redux";
import { useAddGroupMutation } from "../../api/groupsApi";
import { selectUserById } from "../auth/usersSlice";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const CreateGroup = ({ navigation }) => {
  const [image, setImage] = useState(null);
  const [groupName, setGroupName] = useState("");
  const userId = useSelector(selectUserById);

  const [addGroup] = useAddGroupMutation();

  const handleAddGroup = async () => {
    try {
      await addGroup({ groupName, userId });
      navigation.replace("Group", { groupName });
    } catch (err) {
      console.log("Add Group Error: ", err);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Your Fitspace</Text>

      <TouchableOpacity onPress={() => {}} style={{ alignItems: "center" }}>
        <Image source={uploadImage} style={styles.image} />
      </TouchableOpacity>

      {image && (
        <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
      )}

      <View style={styles.inputContainer}>
        <View style={styles.inputRow}>
          <Text style={styles.inputLabel}>Fitspace Name</Text>
          <TextInput
            style={[styles.input, styles.inputWithBorder]}
            value={groupName}
            onChangeText={(name) => setGroupName(name)}
            placeholder="Enter Fitspace Name"
            autoCorrect={false}
            spellCheck={false}
            keyboardAppearance="dark"
          />
        </View>

        <View style={styles.inputRow}>
          <Text style={styles.inputLabel}>Fitspace Bio</Text>
          <TextInput
            style={styles.input}
            value={groupName}
            onChangeText={(name) => setGroupName(name)}
            placeholder="Enter Fitspace Bio"
            autoCorrect={false}
            spellCheck={false}
            keyboardAppearance="dark"
          />
        </View>
        <View style={styles.inputContainer}>
          <View style={styles.inputRow}>
            <Text style={styles.inputLabel}>Fitspace Privacy</Text>
            <TouchableOpacity style={styles.input}>
              <Text>Public</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <Button
        style={styles.continueButton}
        textStyle={styles.continueButtonText}
        onPress={handleAddGroup}
      >
        Continue
      </Button>
      <Button
        style={styles.cancelButton}
        textStyle={styles.cancelButtonText}
        onPress={() => navigation.goBack()}
      >
        Cancel
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 30,
  },
  inputContainer: {
    borderTopWidth: 1,
    borderTopColor: "#e8e8e8",
    borderBottomWidth: 1,
    borderBottomColor: "#e8e8e8",
    width: "100%",
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 10,
    paddingTop: 5,
  },
  inputLabel: {
    width: 120,
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 40,
    justifyContent: "center",
  },
  inputWithBorder: {
    borderBottomWidth: 1,
    borderBottomColor: "#e8e8e8",
  },
  cancelButton: {
    backgroundColor: "transparent",
    borderRadius: 5,
  },
  cancelButtonText: {
    color: "black",
    fontWeight: "bold",
  },
  continueButton: {
    borderRadius: 5,
    width: "100%",
    height: 40,
    marginTop: 20,
  },
  continueButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  image: {
    resizeMode: "contain",
    width: screenWidth * 0.6,
    height: screenHeight * 0.2,
    marginBottom: 20,
  },
});

export default CreateGroup;
