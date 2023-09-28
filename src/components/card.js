import React, { useEffect, useState } from "react";
import {
  TouchableOpacity,
  View,
  Text,
  ImageBackground,
  StyleSheet,
} from "react-native";
import ContextMenu from "react-native-context-menu-view";
import { useNavigation } from "@react-navigation/native";

const Card = ({ fitspaceName, imageSource, onPress }) => {
  const navigation = useNavigation();
  const [timer, setTimer] = useState(null);
  const [longPressed, setLongPressed] = useState(false);

  const handlePress = () => {
    // Avoid triggering if it is a long press
    if (!longPressed) onPress();
  };

  const handleLongPress = () => {
    setLongPressed(true); // Indicate that it was a long press
  };

  const handlePressIn = () => {
    // Start a timer on press in
    setTimer(
      setTimeout(() => {
        handleLongPress();
      }, 300)
    ); // 500ms delay
  };

  const handlePressOut = () => {
    // Clear timer on press out, and reset the long press state
    clearTimeout(timer);
    setLongPressed(false);
  };

  const handleEditFitspace = ({ nativeEvent }) => {
    if (nativeEvent.name === "Edit Fitspace") {
      // Navigate to the "Fitspace Info" screen only when "Edit Fitspace" is pressed
      navigation.navigate("Fitspace Info", { groupName: fitspaceName });
    }
  };

  // console.log("isLongpress?", );

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={handlePress}
        onLongPress={handleLongPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={styles.touchableArea}
        activeOpacity={0.6}
      >
        <ContextMenu
          actions={[
            { title: "Edit Fitspace", systemIcon: "pencil" },
            { title: "Leave Fitspace", systemIcon: "trash" },
          ]}
          onPress={handleEditFitspace}
        >
          <ImageBackground
            defaultSource={require("../assets/trainer.jpg")}
            source={imageSource}
            style={styles.imageBackground}
            resizeMode="cover"
          >
            <View style={styles.overlay} />
          </ImageBackground>
        </ContextMenu>
      </TouchableOpacity>
      <Text style={styles.fitspaceName}>{fitspaceName}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginBottom: 10,
    flex: 1,
    width: "100%",
  },
  touchableArea: {
    flexDirection: "column",
    alignItems: "center",
    padding: 10,
    overflow: "hidden",
    width: "80%",
    flex: 1,
  },
  imageBackground: {
    justifyContent: "center",
    marginBottom: 10,
    width: "100%",
    aspectRatio: 1,
    borderRadius: 15,
    overflow: "hidden",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "transparent",
  },
  fitspaceName: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    color: "#000",
  },
});

export default Card;
