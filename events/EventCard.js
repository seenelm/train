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
        <ImageBackground
          defaultSource={require("../assets/adaptive-icon.png")}
          source={imageSource}
          style={styles.imageBackground}
          resizeMode="cover"
          imageStyle={{ borderRadius: 40 }}
        >
          <View style={styles.overlay} />
        </ImageBackground>
        <Text style={styles.fitspaceName}>{fitspaceName}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cardContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "transparent",
    padding: 10,
    marginBottom: 10,
    overflow: "hidden",
    height: 150,
    width: "100%",
    borderBottomWidth: 0.5, // added borderBottomWidth
    borderColor: "#E9E9E9", // added borderColor
  },
  imageBackground: {
    width: 100,
    height: 100,
    justifyContent: "center",
    marginRight: 10,
    color: "black",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "transparent",
  },
  fitspaceName: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "left",
    color: "#000",
    flex: 1,
    alignSelf: "center",
  },
});

export default EventCard;
