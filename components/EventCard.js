import React from "react";
import {
  TouchableOpacity,
  View,
  Text,
  Image,
  StyleSheet,
  Button,
} from "react-native";
import ProfilePic from "../assets/icons/profpic.png";
import CancelButton from "../buttons/CancelButton";

const EventCard = ({
  eventType,
  eventName,
  eventTime,
  eventLocation,
  onPress,
}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <View style={styles.cardContainer}>
        <View style={styles.eventInfoContainer}>
          <Text style={styles.type}>{eventType}</Text>
          <Text style={styles.name} numberOfLines={2} ellipsizeMode="tail">
            {eventName}
          </Text>
          <Text style={styles.time}>{eventTime}</Text>
          <Text style={styles.location}>{eventLocation}</Text>
          <View style={styles.buttonContainer}>
            <CancelButton title="Cancel" onPress={() => {}}></CancelButton>
          </View>
          <View style={styles.imageContainer}>
            <Image source={ProfilePic} style={styles.image} />
          </View>
        </View>
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
    backgroundColor: "lightgray",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    alignItems: "stretch",
  },
  eventInfoContainer: {
    flex: 2,
    backgroundColor: "#e1e1e1",
    borderRadius: 10,
    padding: 10,
  },
  imageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  type: {
    fontSize: 13,
    fontWeight: "bold",
    marginBottom: 5,
  },
  name: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 5,
  },
  time: {
    fontSize: 14,
    marginBottom: 5,
  },
  location: {
    fontSize: 14,
    marginBottom: 5,
  },
  buttonContainer: {
    marginTop: "auto",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
});

export default EventCard;
