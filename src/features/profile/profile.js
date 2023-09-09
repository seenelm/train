import React from 'react';
import {useSelector} from 'react-redux';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import profile from '../../assets/icons/profilepic.png';
import {SafeAreaView} from 'react-native-safe-area-context';

const Profile = () => {
  const username = useSelector(state => state.users.username);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.profileSection}>
        <Image style={styles.profileImg} source={profile} />
        <View style={styles.profileDetails}>
          <Text style={styles.username}>@{username}</Text>
          <Text style={styles.name}>Yassine Elmellouki</Text>
          <Text style={styles.role}>Personal Trainer</Text>
        </View>
      </View>
      <View style={styles.followSection}>
        <View style={styles.fButton}>
          <TouchableOpacity>
            <Text>200</Text>
          </TouchableOpacity>
          <Text style={styles.fTitle}>Followers</Text>
        </View>

        <View style={styles.fButton}>
          <TouchableOpacity>
            <Text>200</Text>
          </TouchableOpacity>
          <Text style={styles.fTitle}>Following</Text>
        </View>
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
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  followSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 30,
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
    fontWeight: 'bold',
    marginBottom: 2,
  },
  name: {
    fontSize: 18,
    marginBottom: 2,
  },
  role: {
    fontSize: 15,
    marginBottom: 20,
  },
  fButton: {
    padding: 10,
    alignItems: 'center',
  },
  fTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    marginBottom: 2,
  },
});

export default Profile;
