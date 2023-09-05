import React from 'react';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import {TouchableOpacity, Text, View} from 'react-native';
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
          options={{
            headerShown: false,
          }}
        />
        <MainStack.Screen
          name="ProfileScreen"
          component={Profile}
          options={{headerShown: false}}
        />
        <MainStack.Screen
          name="EditGroup"
          component={EditGroup}
          options={{headerShown: false}}
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
                elevation: 0, // remove shadow on Android
                shadowOpacity: 0, // remove shadow on iOS
              },
              headerTitle: () => (
                <TouchableOpacity
                  onPress={() => navigation.navigate('EditGroup')}>
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
              //   headerLeft: () => (
              //     <Ionicons
              //       name="arrow-back"
              //       size={24}
              //       color="black"
              //       style={{ paddingLeft: 15 }}
              //       onPress={() => navigation.goBack()}
              //     />
              //   ),
              //   headerRight: () => (
              //     <MaterialIcons
              //       name="more-horiz"
              //       size={24}
              //       color="black"
              //       style={{ paddingRight: 15 }}
              //       onPress={() => navigation.navigate("EditGroup")}
              //     />
              //   ),
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
          name="Profile"
          component={Profile}
          options={{headerShown: false}}
        />
      </MainStack.Navigator>
    </View>
  );
};

export default MainNav;
