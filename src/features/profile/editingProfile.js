import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
} from "react-native";
import Button from "../../components/button";

import { useSelector } from "react-redux";
import {
  useFetchUserProfileQuery,
  useUpdateUserProfileMutation,
} from "../../api/usersApi";
import { selectUserById } from "../auth/usersSlice";
import edit from "../../assets/icons/editimg.png";
import PrivacyMenu from "../../components/privacyMenu";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const EditingProfile = ({ navigation }) => {
  const [image, setImage] = useState(null);
  const [accountType, setAccountType] = useState("");
  const [name, setName] = useState("");
  const [userBio, setUserBio] = useState("");
  const userId = useSelector(selectUserById);

  const [updateUserProfile] = useUpdateUserProfileMutation();

  useEffect(() => {
    if (userData) {
      setName(userData.username);
      setUserBio(userData.bio);
      setAccountType(userData.accountType);
    }
  }, [userData]);

  console.log("accountType", accountType);

  const { data: userData, refetch } = useFetchUserProfileQuery(userId);
  console.log("Editing Profile Data: ", userData);

  const handleUpdateUserProfile = async () => {
    try {
      await updateUserProfile({ userBio, name, accountType, userId });
      refetch();
      navigation.goBack();
    } catch (err) {
      console.log("Add Group Error: ", err);
    }
  };
  const handlePrivacy = (type) => {
    setAccountType(type);
    console.log("accountType", accountType);
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
        <Text style={styles.title}>Edit Profile</Text>
        <Button
          style={styles.cancelButton}
          textStyle={styles.cancelButtonText}
          onPress={handleUpdateUserProfile}
        >
          Save
        </Button>
      </View>
      <ImageBackground
        source={require("../../assets/icons/profilepic.png")}
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
          <Text style={styles.inputLabel}>Name</Text>
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
          <Text style={styles.inputLabel}>Bio</Text>
          <TextInput
            style={styles.input}
            value={userBio}
            onChangeText={(userBio) => setUserBio(userBio)}
            placeholder="Enter Fitspace Bio"
            autoCorrect={false}
            spellCheck={false}
            keyboardAppearance="dark"
          />
        </View>
      </View>
      <PrivacyMenu handlePrivacy={handlePrivacy} />
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
    width: screenWidth * 0.25,
    height: screenWidth * 0.25,
    borderRadius: 18,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
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

export default EditingProfile;
