import React, { useEffect, useState } from "react";
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  Dimensions,
} from "react-native";
import ContextMenu from "react-native-context-menu-view";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const PrivacyMenu = ({ accountType, handlePrivacy }) => {
  const [privacy, setPrivacy] = useState(
    accountType === 1 ? "Public" : "Private"
  );

  const handleSelect = ({ nativeEvent }) => {
    const type = nativeEvent.name === "Make Public" ? "1" : "2";
    handlePrivacy(type);
  };

  useEffect(() => {
    setPrivacy(accountType === 1 ? "Public" : "Private");
  }, [accountType]);

  // console.log("privacy", privacy);

  // console.log("puborpriv", accountType);

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <View style={styles.inputRow}>
          <Text style={styles.inputLabel}>Fitspace Privacy</Text>
          <TouchableOpacity style={styles.touchableArea}>
            <ContextMenu
              actions={[
                { title: "Make Public", systemIcon: "eye" },
                {
                  title: "Make Private",
                  systemIcon: "eye.slash",
                  destructive: true,
                },
              ]}
              dropdownMenuMode="true"
              onPress={handleSelect}
            >
              <Text>{privacy}</Text>
            </ContextMenu>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  inputContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
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
    flex: 0,
    height: screenHeight * 0.05,
    justifyContent: "center",
  },
});

export default PrivacyMenu;
