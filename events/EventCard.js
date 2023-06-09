import React from "react";
import {
  TouchableOpacity,
  View,
  Text,
  ImageBackground,
  StyleSheet,
} from "react-native";

const EventCard = ({ fitspaceName, imageSource, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <View style={styles.cardContainer}>
        <Text style={styles.fitspaceName}>{fitspaceName}</Text>
        <ImageBackground
          defaultSource={require("../assets/adaptive-icon.png")}
          source={imageSource}
          style={styles.imageBackground}
          resizeMode="contain" // adjust this as per your requirements
        >
          <View style={styles.imageContainer} />
        </ImageBackground>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginLeft: 10,
  },
  cardContainer: {
    flexDirection: "column",
    backgroundColor: "#EAEAEA",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    overflow: "hidden",
    height: 190,
    width: 180,
  },
  imageBackground: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
  },
  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
    height: 100,
  },
  fitspaceName: {
    fontSize: 15,
    fontWeight: "bold",
    textAlign: "center",
    color: "#000",
  },
  buttonContainer: {
    marginTop: "auto",
  },
});

export default EventCard;
