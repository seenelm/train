import React from 'react';
import {View, Image, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {useSelector} from 'react-redux';
import {DrawerContentScrollView} from '@react-navigation/drawer';
import profile from '../assets/icons/seenprofile.png';

function CustomDrawer(props) {
  const {navigation} = props;
  const name = useSelector(state => state.users.username);

  return (
    <DrawerContentScrollView {...props}>
      <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
        <View style={styles.profileContainer}>
          <View style={styles.circularContainer}>
            <Image source={profile} style={styles.imageStyle} />
          </View>
          <Text style={styles.name}>{name}</Text>
        </View>
      </TouchableOpacity>

      {/* You can add other DrawerItems below if needed */}
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  profileContainer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  circularContainer: {
    width: 100,
    height: 100,
    borderRadius: 50, // half of the width and height
    overflow: 'hidden',
  },
  imageStyle: {
    width: 100,
    height: 100,
    borderRadius: 50, // half of the width and height
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },
});

export default CustomDrawer;
