import React from "react";
import { useSelector } from "react-redux";
import { View, StyleSheet, Platform, SafeAreaView, Text } from "react-native";
import Back from "../../assets/icons/back.png";
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
        <View style={styles.left}>
          {!isOverlayVisible ? (
            <Button
              onPress={() => navigation.goBack()}
              imgSource={Back}
              imgStyle={styles.icon}
              style={styles.button}
            />
          ) : (
            <Button
              onPress={() => {}}
              imgSource={Back}
              imgStyle={styles.icon}
              style={styles.button}
            />
          )}
        </View>
        <View style={styles.center}>
          <Text style={styles.title}>Fitspace Info</Text>
        </View>
        <View style={styles.right}>
          {/* You can put another element here if you want something on the right side of the header, or leave it empty to keep the title centered */}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 43,
    paddingHorizontal: 15,
    backgroundColor: "white",
    ...Platform.select({
      ios: {
        borderBottomWidth: 1,
        borderBottomColor: "rgba(0,0,0,0.1)",
      },
    }),
  },
  left: {
    width: "4%",
  },
  center: {
    width: "92%",
    alignItems: "center",
  },
  right: {
    width: "4%",
  },
  title: {
    fontSize: 16,
  },
  overlay: {
    backgroundColor: "rgba(0,0,0,0.007)",
  },
  safeArea: {
    backgroundColor: "white",
  },
  icon: {
    width: 23,
    height: 23,
  },
  button: {
    backgroundColor: "transparent",
  },
});

export default ConnectedHeader;
