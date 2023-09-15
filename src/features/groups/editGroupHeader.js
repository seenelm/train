import React from "react";
import { useSelector } from "react-redux";
import { View, StyleSheet, Platform, SafeAreaView } from "react-native";
import Back from "../../assets/icons/back.png";
import { appIcons } from "../../styles/styles";
import Button from "../../components/button";

function ConnectedHeader({ navigation }) {
  const isOverlayVisible = useSelector((state) => state.overlay.isVisible);

  const headerStyle = isOverlayVisible ? styles.overlay : {};
  const safeAreaStyle = isOverlayVisible
    ? [styles.safeArea, styles.overlay]
    : styles.safeArea;

  return (
    <SafeAreaView style={safeAreaStyle}>
      <View style={[styles.header, headerStyle]}>
        {!isOverlayVisible ? (
          <Button
            onPress={() => navigation.goBack()}
            imgSource={Back}
            imgStyle={appIcons.icon}
            style={appIcons.button}
          />
        ) : (
          <Button
            onPress={() => {}}
            imgSource={Back}
            imgStyle={appIcons.icon}
            style={appIcons.button}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 43, // Typical height for iOS headers without a notch.
    paddingHorizontal: 15,
    backgroundColor: "white",
    ...Platform.select({
      ios: {
        borderBottomWidth: 1,
        borderBottomColor: "rgba(0,0,0,0.1)", // Light shadow for iOS look
      },
    }),
  },
  overlay: {
    backgroundColor: "rgba(0,0,0,0.007)",
  },
  safeArea: {
    backgroundColor: "white",
  },
});

export default ConnectedHeader;
