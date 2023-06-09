import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import CustomButton from "../components/CustomButton";
import * as ImagePicker from "expo-image-picker";
import uploadImage from "../assets/icons/uploadimg.png";
import { Dimensions } from "react-native";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const AddGroupScreen = ({ navigation }) => {
  const [fitspaceName, setFitspaceName] = useState("");
  const [image, setImage] = useState(null);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.uri);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Your Fitspace</Text>

      <TouchableOpacity onPress={pickImage} style={{ alignItems: "center" }}>
        <Image source={uploadImage} style={styles.image} />
      </TouchableOpacity>

      {image && (
        <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
      )}
      <Text style={styles.inputLabel}>Fitspace Name</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={fitspaceName}
          onChangeText={setFitspaceName}
          placeholder="Enter Fitspace Name"
          autoCorrect={false}
          spellCheck={false}
          keyboardAppearance="dark"
        />
      </View>

      <CustomButton
        title="Continue"
        style={buttonStyles}
        onPress={() => console.log("Continue Pressed")}
      />
      <CustomButton
        title="Cancel"
        style={styles}
        onPress={() => navigation.goBack()}
      />
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
    borderColor: "lightgray",
    borderWidth: 1,
    borderRadius: 5,
    width: "100%",
    marginBottom: 15,
  },
  input: {
    height: 40,
    paddingHorizontal: 10,
  },
  inputLabel: {
    alignSelf: "flex-start",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
    marginTop: 15,
  },
  buttonContainer: {
    flexDirection: "row",
    backgroundColor: "transparent",
    borderRadius: 5,
    paddingVertical: 10,
    marginTop: 10,
  },
  buttonText: {
    color: "black",
  },
  image: {
    resizeMode: "contain",
    width: screenWidth * 0.6,
    height: screenHeight * 0.2,
    marginBottom: 5,
  },
});

const buttonStyles = StyleSheet.create({
  buttonContainer: {
    flexDirection: "row",
    backgroundColor: "black",
    borderRadius: 5,
    paddingVertical: 10,
    marginTop: 10,
    width: "100%",
  },
  buttonText: {
    color: "white",
  },
});

export default AddGroupScreen;
