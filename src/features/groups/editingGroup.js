import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import Button from "../../components/button";

import { Dimensions } from "react-native";

import { useSelector } from "react-redux";
import { useAddGroupMutation } from "../../api/groupsApi";
import { selectUserById } from "../auth/usersSlice";
import edit from "../../assets/icons/editimg.png";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const EditingGroup = ({ navigation }) => {
  const [image, setImage] = useState(null);
  const [isSelected, setSelection] = useState(false);
  const [name, setName] = useState("");
  const userId = useSelector(selectUserById);

  const [addGroup] = useAddGroupMutation();

  const handlePriacy = () => {
    setSelection(isSelected === false ? true : false);
  };

  const handleAddGroup = async () => {
    try {
      await addGroup({ name, userId });
      navigation.replace("Group", { groupName: name });
    } catch (err) {
      console.log("Add Group Error: ", err);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Button
          style={styles.cancelButton}
          textStyle={styles.cancelButtonText}
          onPress={() => navigation.goBack()}
        >
          Cancel
        </Button>
        <Text style={styles.title}>Edit Fitspace</Text>
        <Button
          style={styles.cancelButton}
          textStyle={styles.cancelButtonText}
          onPress={() => navigation.goBack()}
        >
          Save
        </Button>
      </View>
      <ImageBackground
        source={require("../../assets/trainer.jpg")}
        style={styles.groupImageContainer}
      >
        <TouchableOpacity style={styles.overlay}>
          <Image style={styles.iconStyle} source={edit}></Image>
        </TouchableOpacity>
      </ImageBackground>

      {image && (
        <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
      )}
      <View style={styles.inputContainer}>
        <View style={styles.inputRow}>
          <Text style={styles.inputLabel}>Fitspace Name</Text>
          <TextInput
            style={[styles.input, styles.inputWithBorder]}
            value={name}
            onChangeText={(name) => setName(name)}
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
            value={name}
            onChangeText={(name) => setName(name)}
            placeholder="Enter Fitspace Bio"
            autoCorrect={false}
            spellCheck={false}
            keyboardAppearance="dark"
          />
        </View>
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
    padding: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  cancelButton: {
    backgroundColor: "transparent",
  },
  cancelButtonText: {
    color: "black",
  },
  inputContainer: {
    borderTopWidth: 1,
    borderTopColor: "#e8e8e8",
    borderBottomWidth: 1,
    borderBottomColor: "#e8e8e8",
    width: "100%",
    marginTop: 20,
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
  image: {
    resizeMode: "cover",
    width: screenWidth * 0.5,
    height: screenHeight * 0.2,
    marginBottom: 10,
  },
  groupImageContainer: {
    width: 150,
    height: 150,
    aspectRatio: 1,
    borderRadius: 18,
    overflow: "hidden", // Ensure the overlay respects the border radius
    alignItems: "center", // Center children horizontally
    justifyContent: "center", // Center children vertically
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.2)", // Semi-transparent overlay
    borderRadius: 18, // Match the border radius of the container
    justifyContent: "center",
  },
  iconStyle: {
    alignSelf: "center",
    width: 30,
    height: 30,
    tintColor: "white",
  },
});

export default EditingGroup;
