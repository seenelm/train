import React, { useState, useEffect } from "react";
import { View, TextInput, StyleSheet, Text, Image } from "react-native";
import { loginStyles } from "../../styles/styles";
import Button from "../../components/button";
import { SafeAreaView } from "react-native-safe-area-context";
import logo from "../../assets/icons/logo3.png";
import * as Keychain from "react-native-keychain";

import {
  registerUser,
  setUsername,
  setPassword,
  setName,
} from "../../api/store";
import { useSelector, useDispatch } from "react-redux";
import { useRegisterUserMutation } from "../../api/apiSlice";

const SignUp = ({ onSignUp, navigation }) => {
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [nameError, setNameError] = useState("");
  const dispatch = useDispatch();
  const { name, username, password } = useSelector((state) => state.users);

  const [registerUser, { isError, error }] = useRegisterUserMutation();

  useEffect(() => {
    renderUsernameError();
    renderPasswordError();
    renderNameError();
  }, [isError, error]);

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const response = await registerUser({
        username,
        password,
        name,
      }).unwrap();
      console.log("Signup Response: ", response);
      onSignUp();
    } catch (err) {
      console.log("SignUp Error: ", err);
    }
  };

  const renderUsernameError = () => {
    if (isError && error.username !== "") {
      setUsernameError(error.username);
    } else {
      setUsernameError("");
    }
  };

  const renderPasswordError = () => {
    if (isError && error.password !== "") {
      setPasswordError(error.password);
    } else {
      setPasswordError("");
    }
  };
  const renderNameError = () => {
    if (isError && error.name !== "") {
      setNameError(error.name);
    } else {
      setNameError("");
    }
  };

  const clearErrors = () => {
    setNameError("");
    setUsernameError("");
    setPasswordError("");
  };

  const inputStyleWithError = (hasError) => {
    return hasError
      ? [loginStyles.input, loginStyles.inputError]
      : loginStyles.input;
  };

  const handlePress = () => {
    navigation.replace("Login");
    clearErrors();
  };

  return (
    <SafeAreaView style={loginStyles.container}>
      <View style={loginStyles.headerContainer}>
        <Image source={logo} style={loginStyles.logo} />
        {/* <TouchableOpacity
          onPress={() => navigation.goBack()}
          activeOpacity={0.6}
          style={signupStyle.icon}
        >
          <Ionicons name="chevron-back" size={24} color="black" />
        </TouchableOpacity> */}
        <Text style={loginStyles.header}>Sign up for Train</Text>
      </View>
      <View style={loginStyles.inputContainer}>
        <View style={signupStyle.inputWithErrorContainer}>
          <TextInput
            placeholder="Name"
            value={name}
            onChangeText={(value) => {
              dispatch(setName(value));
              clearErrors();
            }}
            style={inputStyleWithError(nameError)}
            autoCorrect={false}
          />
          {nameError && (
            <View style={signupStyle.errorContainer}>
              <Text style={signupStyle.error}>{nameError}</Text>
            </View>
          )}
        </View>
        <View style={signupStyle.inputWithErrorContainer}>
          <TextInput
            placeholder="Username"
            value={username}
            onChangeText={(value) => {
              dispatch(setUsername(value));
              clearErrors();
            }}
            style={inputStyleWithError(usernameError)}
            textContentType="oneTimeCode"
            autoCorrect={false}
          />
          {usernameError && (
            <View style={signupStyle.errorContainer}>
              <Text style={signupStyle.error}>{usernameError}</Text>
            </View>
          )}
        </View>

        <View style={signupStyle.inputWithErrorContainer}>
          <TextInput
            placeholder="Password"
            value={password}
            onChangeText={(value) => {
              dispatch(setPassword(value));
              clearErrors();
            }}
            secureTextEntry
            style={inputStyleWithError(passwordError)}
            textContentType="oneTimeCode"
          />
          {passwordError && (
            <View style={signupStyle.errorContainer}>
              <Text style={signupStyle.error}>{passwordError}</Text>
            </View>
          )}
        </View>
      </View>
      <Button
        onPress={handleSignUp}
        style={signupStyle.signUpButton}
        textStyle={signupStyle.buttonText}
      >
        Sign up
      </Button>
      <Text style={signupStyle.haveAccount} onPress={handlePress}>
        Have an account?
      </Text>
    </SafeAreaView>
  );
};

const signupStyle = StyleSheet.create({
  inputWithErrorContainer: {
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
  },
  errorContainer: {
    width: "90%",
    paddingLeft: 10,
  },
  signUpButton: {
    alignSelf: "center",
    borderRadius: 10,
    width: "90%",
  },
  buttonText: {
    // fontFamily: 'bold',
    fontSize: 20,
  },
  icon: {
    position: "absolute",
    left: -10,
  },
  haveAccount: {
    margin: 20,
    alignSelf: "center",
    color: "black",
    fontSize: 15,
  },
  error: {
    marginTop: -20,
    color: "red",
    fontSize: 12,
    // fontFamily: 'bold',
    textAlign: "left",
    alignSelf: "flex-start",
  },
});
export default SignUp;
