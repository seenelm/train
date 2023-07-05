import React from "react";
import { View, Text, StyleSheet } from "react-native";

function Feed() {
  return (
    <View style={styles.container}>
      <Text>FeedScreen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Feed;
