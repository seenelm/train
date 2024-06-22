import React from "react";
import {
  TouchableOpacity,
  View,
  Text,
  ImageBackground,
  StyleSheet,
} from "react-native";
import ContextMenu from "react-native-context-menu-view";
import { useNavigation } from "@react-navigation/native";

const Card = ({ fitspaceName, imageSource, onPress, groupId }) => {
  const navigation = useNavigation();

  const handleEditFitspace = ({ nativeEvent }) => {
    if (nativeEvent.name === "Edit Fitspace") {
      navigation.navigate("EditGroup", {
        groupName: fitspaceName,
        groupId,
      });
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={onPress}
        onLongPress={() => {}}
        delayPressIn={500} // delay in ms
        style={styles.touchableArea}
        activeOpacity={0.6}
      >
        <ContextMenu
          actions={[
            { title: "Edit Fitspace", systemIcon: "pencil" },
            { title: "Leave Fitspace", systemIcon: "trash", destructive: true },
          ]}
          onPress={handleEditFitspace}
        >
          <ImageBackground
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
    padding: 5,
    width: "100%",
  },
  touchableArea: {
    flexDirection: "column",
    alignItems: "center",
    overflow: "hidden",
    width: "85%",
    flex: 1,
    borderRadius: 15,
  },
  imageBackground: {
    justifyContent: "center",
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
    fontSize: 15,
    fontWeight: "bold",
    textAlign: "center",
    color: "#000",
  },
});

export default React.memo(Card);
