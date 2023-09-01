import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

function ChatList() {
  return (
    <View style={styles.container}>
      <Text>ChatList</Text>
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

export default ChatList;
