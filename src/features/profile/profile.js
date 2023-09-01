import React from 'react';
import {useSelector} from 'react-redux';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import profile from '../../assets/icons/noahprofile.png';
import settings from '../../assets/icons/setting.png';
import profSettings from '../../assets/icons/profchange.png';
import payments from '../../assets/icons/payment.png';
import privacy from '../../assets/icons/lock1.png';
import logout from '../../assets/icons/logout.png';
import {SafeAreaView} from 'react-native-safe-area-context';

const Profile = ({navigation}) => {
  const username = useSelector(state => state.users.username);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.profileSection}>
        <Image style={styles.profileImg} source={profile} />
        <View style={styles.profileDetails}>
          <Text style={styles.username}>@{username}</Text>
          <Text style={styles.name}>Noah Gross</Text>
          <Text style={styles.role}>Personal Trainer</Text>
        </View>
      </View>

      <View style={styles.optionsContainer}>
        <TouchableOpacity
          style={styles.optionButton}
          onPress={() => alert('Edit Profile pressed!')}>
          <View style={styles.option}>
            <Image source={profSettings} style={styles.optionImg} />
          </View>
          <Text style={styles.optionText}>Edit Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.optionButton}
          onPress={() => alert('Settings pressed!')}>
          <View style={styles.option}>
            <Image source={settings} style={styles.optionImg} />
          </View>
          <Text style={styles.optionText}>Settings</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.optionButton}
          onPress={() => alert('App Info pressed!')}>
          <View style={styles.option}>
            <Image source={payments} style={styles.optionImg} />
          </View>
          <Text style={styles.optionText}>App Info</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.optionButton}
          onPress={() => alert('Change Password pressed!')}>
          <View style={styles.option}>
            <Image source={privacy} style={styles.optionImg} />
          </View>
          <Text style={styles.optionText}>Change Password</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.optionButton}
          onPress={() => navigation.goBack()}>
          <View style={[styles.option, styles.logoutOption]}>
            <Image source={logout} style={styles.optionImg} />
          </View>
          <Text style={styles.optionText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  centerItems: {
    alignItems: 'center',
    marginBottom: 30,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 30,
    // fontWeight: 'bold',
    marginBottom: 50,
  },
  profileImg: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
    marginRight: 10,
  },
  profileDetails: {
    flexDirection: 'column',
    marginLeft: 10,
  },
  username: {
    fontSize: 20,
    // fontWeight: 'bold',
    marginBottom: 2,
  },
  name: {
    fontSize: 18,
    // fontWeight: 'bold',
    // fontStyle: 'italic',
    marginBottom: 2,
  },
  role: {
    fontSize: 15,
    marginBottom: 20,
  },
  optionsContainer: {
    justifyContent: 'space-between',
    width: '60%',
    alignSelf: 'flex-start',
    marginTop: 20,
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    marginLeft: 30,
  },
  option: {
    backgroundColor: 'black',
    borderRadius: 20,
    padding: 2,
    marginRight: 10,
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionImg: {
    width: 24,
    height: 24,
  },
  optionText: {
    fontSize: 18,
    // fontWeight: 'bold',
  },
  logoutOption: {
    backgroundColor: 'red',
  },
});

export default Profile;
