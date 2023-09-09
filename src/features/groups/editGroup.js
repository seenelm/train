import React from 'react';
import {View, Text, StyleSheet, Image, FlatList} from 'react-native';
import Button from '../../components/button';

function EditGroup({route}) {
  const {groupName} = route.params;

  // Sample list of members (replace with your actual data)
  const members = [
    {id: '1', name: 'Seen Elm'},
    {id: '2', name: 'Noah Gross'},
    {id: '3', name: 'Myah Gross'},
    {id: '4', name: 'Badr Elm'},
    {id: '5', name: 'Mouad Elm'},
  ];

  return (
    <View style={styles.container}>
      <View style={styles.groupImageContainer}>
        <Image
          source={require('../../assets/trainer.jpg')}
          style={styles.groupImage}
        />
      </View>
      <Text style={styles.groupName}>{groupName}</Text>
      <Text style={styles.groupMembers}>fitspace • 5 people</Text>

      <View style={styles.members}>
        <Text style={styles.membersTitle}>5 People</Text>
        <View style={styles.membersContainer}>
          <FlatList
            data={members}
            renderItem={({item}) => (
              <Text style={styles.memberItem}>{item.name}</Text>
            )}
            keyExtractor={item => item.id}
          />
        </View>
        <Button>Leave Fitspace</Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 20, // Add paddingTop to push content down
    backgroundColor: 'white',
  },
  groupImageContainer: {
    width: '100%', // Use percentage to center the image
    alignItems: 'center', // Center the image horizontally
  },
  groupImage: {
    width: 150, // Set the desired width
    height: 150, // Set the desired height
    aspectRatio: 1, // Maintain the aspect ratio (1:1 for a square image)
    borderRadius: 18, // Make it a circle
    overflow: 'hidden',
  },
  groupName: {
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 20,
  },
  groupMembers: {
    fontSize: 18,
    marginTop: 10,
    color: 'gray',
  },
  members: {
    width: '90%', // Set the desired width
  },
  membersContainer: {
    backgroundColor: '#F6F6F8', // Background color for the member list container
    paddingHorizontal: 20, // Add horizontal padding
    marginTop: 10, // Add margin from the title
    borderRadius: 10, // Add border radius for a rounded look
  },
  membersTitle: {
    fontSize: 20,
    marginTop: 10,
    fontWeight: 'bold',
  },
  memberItem: {
    fontSize: 18,
    marginTop: 10,
  },
});

export default EditGroup;
