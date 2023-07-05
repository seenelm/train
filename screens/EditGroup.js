import React from "react";
import { View, Text, StyleSheet } from "react-native";

function EditGroup() {
  return (
    <View style={styles.container}>
      <Text>Edit Group Screen</Text>
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

export default EditGroup;
