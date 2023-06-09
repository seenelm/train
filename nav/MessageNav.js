import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { View } from "react-native";

import ChatList from "../messages/ChatList";
import ChatScreen from "../messages/ChatScreen";

const Message = createStackNavigator();

const MessageNav = () => {
  return (
    <View style={{ flex: 1 }}>
      <Message.Navigator>
        <Message.Screen
          name="ChatList"
          component={ChatList}
          options={{ headerShown: false }}
        />
        <Message.Screen
          name="ChatScreen"
          component={ChatScreen}
          options={{ headerShown: true }}
        />
      </Message.Navigator>
    </View>
  );
};

export default MessageNav;
