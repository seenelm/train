import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

function GroupPayments() {
  return (
    <View style={styles.container}>
      <Text>GroupPayments</Text>
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

export default GroupPayments;
