import React from 'react';
import {View, Image, StyleSheet} from 'react-native';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import profile from '../assets/icons/noahprofile.png';

function CustomDrawer(props) {
  const {navigation} = props;

  return (
    <DrawerContentScrollView {...props}>
      <DrawerItem
        label=""
        icon={() => (
          <View style={styles.circularContainer}>
            <Image source={profile} style={styles.imageStyle} />
          </View>
        )}
        onPress={() => navigation.navigate('Profile')}
      />
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  circularContainer: {
    width: 100,
    height: 100,
    borderRadius: 20, // half of the width and height
    overflow: 'hidden',
    marginLeft: 55,
  },
  imageStyle: {
    width: 100,
    height: 100,
    borderRadius: 50, // half of the width and height
  },
});

export default CustomDrawer;
