import React from 'react';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import {TouchableOpacity, Text, View, StyleSheet} from 'react-native';
import TopNav from './topNav';
import AddGroup from '../features/groups/createGroup';
import Search from '../features/search/search';
import Profile from '../features/profile/profile';
import {BottomNav} from './bottomNav';
import Chat from '../features/chat/chat';
import Back from '../assets/icons/back.png';
import EditGroup from '../features/groups/editGroup';
import Button from '../components/button';
import {appIcons} from '../styles/styles';
import ConnectedHeader from '../features/groups/editGroupHeader';

import Request from '../features/requests/request';

const MainStack = createStackNavigator();

const MainNav = () => {
  return (
    <View style={{flex: 1}}>
      <MainStack.Navigator>
        <MainStack.Screen
          name="BottomNav"
          component={BottomNav}
          options={{headerShown: false}}
        />
        <MainStack.Screen
          name="SearchScreen"
          component={Search}
          options={{headerShown: false}}
        />
        <MainStack.Screen
          name="ProfileScreen"
          component={Profile}
          options={{headerShown: false}}
        />
        <MainStack.Screen
          name="Fitspace Info"
          component={EditGroup}
          options={({navigation}) => {
            return {
              headerShown: true,
              headerStyle: {
                borderBottomColor: 'white',
                elevation: 0,
                shadowOpacity: 0,
              },
              header: props => (
                <ConnectedHeader {...props}>
                  <Button
                    onPress={() => navigation.goBack()}
                    imgSource={Back}
                    imgStyle={appIcons.icon}
                    style={appIcons.button}
                  />
                </ConnectedHeader>
              ),
            };
          }}
        />

        <MainStack.Screen
          name="Group"
          component={TopNav}
          options={({route, navigation}) => {
            const {groupName} = route.params;
            return {
              headerShown: true,
              headerStyle: {
                borderBottomColor: 'white',
                elevation: 0,
                shadowOpacity: 0,
              },
              headerTitle: () => (
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('Fitspace Info', {groupName})
                  }>
                  <Text>{groupName}</Text>
                </TouchableOpacity>
              ),
              headerLeft: () => (
                <Button
                  onPress={() => navigation.goBack()}
                  imgSource={Back}
                  imgStyle={appIcons.icon}
                  style={appIcons.button}
                />
              ),
            };
          }}
        />

        <MainStack.Screen
          name="AddGroup"
          component={AddGroup}
          options={{
            headerShown: false,
            cardStyleInterpolator:
              CardStyleInterpolators.forModalPresentationIOS,
          }}
        />
        <MainStack.Screen
          name="ChatScreen"
          component={Chat}
          options={{headerShown: false}}
        />
        <MainStack.Screen
          name="Request"
          component={Request}
          options={{headerShown: false}}
        />
        <MainStack.Screen
          name="Profile"
          component={Profile}
          options={{headerShown: false}}
        />
      </MainStack.Navigator>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.3)', // Semi-transparent black
    zIndex: 0,
  },
});
export default MainNav;