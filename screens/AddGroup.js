import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import Button from "../components/Button";
import * as ImagePicker from "expo-image-picker";
import uploadImage from "../assets/icons/uploadimg.png";
import { Dimensions } from "react-native";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const AddGroup = ({ navigation }) => {
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

      <Button
        style={styles.continueButton}
        textStyle={styles.continueButtonText}
        onPress={() => console.log("Continue Pressed")}
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
  cancelButton: {
    backgroundColor: "transparent",
    borderRadius: 5,
  },
  cancelButtonText: {
    color: "black",
    fontFamily: "bold",
  },
  continueButton: {
    borderRadius: 5,
    width: "100%",
    height: 40,
  },
  continueButtonText: {
    color: "white",
    fontFamily: "bold",
  },
  image: {
    resizeMode: "contain",
    width: screenWidth * 0.6,
    height: screenHeight * 0.2,
    marginBottom: 5,
  },
});

export default AddGroup;
