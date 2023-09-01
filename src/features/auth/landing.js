import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import Svg, {Path} from 'react-native-svg';
import {Animated} from 'react-native';
import GoogleIcon from '../../assets/icons/googleicon.png';
import FacebookIcon from '../../assets/icons/facebookicon.png';
import AppleIcon from '../../assets/icons/appleicon.png';
import Button from '../../components/button';
import Graphic from '../../assets/icons/graphic.png';

const {height} = Dimensions.get('window');
const Landing = ({onLoginForm, onSignUpForm}) => {
  const [userInfo, setUserInfo] = useState(null);

  const textOpacity = useRef(new Animated.Value(0)).current;
  const buttonOpacity = useRef(new Animated.Value(0)).current;
  const textTranslateY = useRef(new Animated.Value(height / 4)).current;
  const buttonTranslateY = useRef(new Animated.Value(height / 4)).current;

  useEffect(() => {
    // Animate the opacity from 0 to 1 over 1500ms
    Animated.timing(textOpacity, {
      toValue: 1,
      duration: 2500,
      useNativeDriver: true,
    }).start();

    Animated.timing(buttonOpacity, {
      toValue: 1,
      duration: 2500,
      useNativeDriver: true,
    }).start();

    // Animate the Y translation from 20 to 0 over 1500ms
    Animated.timing(textTranslateY, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: true,
    }).start();

    Animated.timing(buttonTranslateY, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  const translateY = useRef(new Animated.Value(-100)).current;

  useEffect(() => {
    Animated.timing(translateY, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  const SlopedView = ({children}) => (
    <Animated.View
      style={{
        overflow: 'hidden',
        width: '100%',
        position: 'absolute',
        bottom: 0,
        zIndex: 1,
        transform: [{translateY}],
      }}>
      <Svg height="50" width="100%">
        <Path d="M0,40 Q200,50 400,10 L400,50 L0,50" fill="#FBFBFB" />
      </Svg>
      <View style={{backgroundColor: '#FBFBFB', alignItems: 'center'}}>
        {children}
      </View>
    </Animated.View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.graphicContainer}>
        <Image source={Graphic} style={styles.graphic} />
      </View>
      <SlopedView>
        <Animated.View
          style={[
            styles.textContainer,
            {
              opacity: textOpacity,
              transform: [{translateY: textTranslateY}],
            },
          ]}>
          <Text style={styles.text}>
            Plan workouts, message people, and handle money
          </Text>
          <Text style={styles.text1}>
            We're the first app, that allows coachs and athletes to connect,
            organize, and transact easily
          </Text>
        </Animated.View>
        <Animated.View
          style={[
            styles.buttonContainer,
            {
              opacity: buttonOpacity,
              transform: [{translateY: buttonTranslateY}],
            },
          ]}>
          <Button
            style={styles.signInButton}
            textStyle={styles.signInButtonText}
            onPress={onLoginForm}>
            Sign In
          </Button>
          <Button
            style={styles.signUpButton}
            textStyle={styles.signUpButtonText}
            onPress={onSignUpForm}>
            Sign Up
          </Button>
        </Animated.View>
        <View style={styles.iconContainer}>
          <TouchableOpacity onPress={() => {}}>
            <Image source={AppleIcon} style={styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {}}>
            <Image source={GoogleIcon} style={styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {}}>
            <Image source={FacebookIcon} style={styles.icon} />
          </TouchableOpacity>
        </View>
      </SlopedView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: -50, // Add this line
  },
  graphicContainer: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -50, // Add this line
    backgroundColor: '#FBFBFB',
  },
  graphic: {
    width: '130%',
    height: '130%',
    resizeMode: 'contain',
    zIndex: 0,
  },
  textContainer: {
    alignItems: 'center',
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
  },
  text: {
    fontSize: 26,
    // fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 10,
  },
  text1: {
    fontSize: 15,
    color: '#B9B7BD',
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    marginTop: 40,
  },
  signInButton: {
    width: '47%',
    marginRight: '5%',
    backgroundColor: 'transparent',
    borderColor: 'black',
    borderWidth: 3,
  },
  signInButtonText: {
    color: 'black',
    // fontFamily: 'bold',
    fontSize: 20,
  },
  signUpButton: {
    width: '47%',
  },
  signUpButtonText: {
    // fontFamily: 'bold',
    fontSize: 20,
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '60%',
    marginTop: 20,
    marginBottom: 40,
  },
  icon: {
    width: 40,
    height: 40,
  },
});

export default Landing;
