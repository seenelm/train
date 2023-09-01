import React from 'react';
import {View, TextInput, Text, StyleSheet, Image} from 'react-native';
import Button from '../components/Button';
import logo from '../assets/icons/logo3.png';
import {SafeAreaView} from 'react-native-safe-area-context';
import {loginStyles} from '../styles/Styles';

const PasswordForm = ({navigation}) => {
  const [pass, setNewPass] = React.useState('');
  const [confirm, setConfirm] = React.useState('');

  return (
    <SafeAreaView style={styles.container}>
      <View style={loginStyles.headerContainer}>
        <Image source={logo} style={loginStyles.logo} />
        <Text style={loginStyles.header}>Create a new password</Text>
      </View>
      <TextInput
        placeholder="new password"
        value={pass}
        onChangeText={setNewPass}
        style={styles.input}
        keyboardAppearance="dark"
        autoFocus={true}
      />
      <TextInput
        placeholder="confirm password"
        value={confirm}
        onChangeText={setConfirm}
        style={styles.input}
        keyboardAppearance="dark"
        autoFocus={true}
      />
      <Button
        onPress={() => navigation.navigate('Login')}
        style={styles.continueButton}
        textStyle={styles.buttonText}>
        Continue
      </Button>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  logo: {
    width: 50,
    height: 50,
  },
  title: {
    fontSize: 28,
    // fontWeight: 'bold',
    margin: 15,
  },
  input: {
    height: 50,
    width: '90%',
    borderWidth: 1,
    margin: 20,
    paddingHorizontal: 15,
    backgroundColor: '#F6F6F8',
    borderColor: 'transparent',
    borderRadius: 5,
  },
  continueButton: {
    alignSelf: 'center',
    borderRadius: 10,
    width: '90%',
  },
  buttonText: {
    fontSize: 16,
    color: 'white',
    // fontFamily: 'bold',
  },
});

export default PasswordForm;
