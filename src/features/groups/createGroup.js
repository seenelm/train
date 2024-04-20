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
import edit from "../../assets/icons/editimg.png";
import { useSelector } from "react-redux";
import { useAddGroup } from "../../services/actions/groupActions";
import { selectUserById } from "../auth/usersSlice";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const CreateGroup = ({ navigation }) => {
  const [image, setImage] = useState(null);
  const [groupName, setGroupName] = useState("");
  const userId = useSelector(selectUserById);
  const { mutate: addGroup, isLoading, isError, error } = useAddGroup();

  const handleAddGroup = () => {
    addGroup({ groupName, userId });
    navigation.replace("Group", { groupName });
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
        <Text style={styles.title}>Create Fitspace</Text>
        <Button
          style={styles.cancelButton}
          textStyle={styles.cancelButtonText}
          onPress={handleAddGroup}
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
            value={groupName}
            onChangeText={(name) => setGroupName(name)}
            placeholder="Enter Fitspace Name"
            autoCorrect={false}
            spellCheck={false}
          />
        </View>

        <View style={styles.inputRow1}>
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
    fontSize: screenHeight * 0.022,
    fontWeight: "bold",
  },
  cancelButton: {
    backgroundColor: "transparent",
  },
  cancelButtonText: {
    color: "black",
  },
  inputContainer: {
    flexDirection: "column",
    borderTopWidth: 1,
    borderTopColor: "#e8e8e8",
    borderBottomWidth: 1,
    borderBottomColor: "#e8e8e8",
    width: "100%",
    marginTop: screenHeight * 0.02,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: screenWidth * 0.025,
  },
  inputRow1: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: screenWidth * 0.025,
  },
  inputLabel: {
    width: screenWidth * 0.3,
    fontSize: screenHeight * 0.017,
    fontWeight: "bold",
    marginRight: screenWidth * 0.02,
  },
  input: {
    flex: 1,
    height: screenHeight * 0.05,
    justifyContent: "center",
  },
  touchableArea: {
    width: "100%",
    padding: 10,
  },
  inputWithBorder: {
    borderBottomWidth: 1,
    height: screenHeight * 0.05,
    borderBottomColor: "#e8e8e8",
  },
  groupImageContainer: {
    width: screenWidth * 0.3,
    height: screenWidth * 0.3,
    borderRadius: 18,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    borderRadius: 18,
    justifyContent: "center",
  },
  iconStyle: {
    alignSelf: "center",
    width: screenWidth * 0.08,
    height: screenWidth * 0.08,
    tintColor: "white",
  },
});

export default CreateGroup;
