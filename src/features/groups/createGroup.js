import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import Button from '../../components/button';
import uploadImage from '../../assets/icons/uploadimg.png';
import {Dimensions} from 'react-native';

import {useDispatch, useSelector} from 'react-redux';
import {setGroupName} from './groupsSlice';
import {addGroup} from './addGroup';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const CreateGroup = ({navigation}) => {
  const [image, setImage] = useState(null);

  const dispatch = useDispatch();
  const {name} = useSelector(state => state.groups);
  const {userId} = useSelector(state => state.users);

  const handleAddGroup = async e => {
    e.preventDefault();
    try {
      const response = await dispatch(addGroup({name, userId})).unwrap();
      navigation.replace('Group', {groupName: name});
    } catch (err) {
      console.log('Error: ', err);
    }
  };

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const {status} =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Your Fitspace</Text>

      <TouchableOpacity onPress={() => {}} style={{alignItems: 'center'}}>
        <Image source={uploadImage} style={styles.image} />
      </TouchableOpacity>

      {image && (
        <Image source={{uri: image}} style={{width: 200, height: 200}} />
      )}
      <Text style={styles.inputLabel}>Fitspace Name</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={value => dispatch(setGroupName(value))}
          placeholder="Enter Fitspace Name"
          autoCorrect={false}
          spellCheck={false}
          keyboardAppearance="dark"
        />
      </View>

      <Button
        style={styles.continueButton}
        textStyle={styles.continueButtonText}
        onPress={handleAddGroup}>
        Continue
      </Button>
      <Button
        style={styles.cancelButton}
        textStyle={styles.cancelButtonText}
        onPress={() => navigation.goBack()}>
        Cancel
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  inputContainer: {
    borderColor: 'lightgray',
    borderWidth: 1,
    borderRadius: 5,
    width: '100%',
    marginBottom: 15,
  },
  input: {
    height: 40,
    paddingHorizontal: 10,
  },
  inputLabel: {
    alignSelf: 'flex-start',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    marginTop: 15,
  },
  cancelButton: {
    backgroundColor: 'transparent',
    borderRadius: 5,
  },
  cancelButtonText: {
    color: 'black',
    fontFamily: 'bold',
  },
  continueButton: {
    borderRadius: 5,
    width: '100%',
    height: 40,
  },
  continueButtonText: {
    color: 'white',
    fontFamily: 'bold',
  },
  image: {
    resizeMode: 'contain',
    width: screenWidth * 0.6,
    height: screenHeight * 0.2,
    marginBottom: 5,
  },
});

export default CreateGroup;
