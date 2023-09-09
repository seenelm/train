import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

function Request() {
  return (
    <View style={styles.container}>
      <Text>Request</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Request;
