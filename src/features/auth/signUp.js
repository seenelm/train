import React, { useState, useEffect } from "react";
import { View, TextInput, StyleSheet, Text, Image } from "react-native";
import { loginStyles } from "../../styles/styles";
import Button from "../../components/button";
import { SafeAreaView } from "react-native-safe-area-context";
import logo from "../../assets/icons/logo3.png";
import * as Keychain from "react-native-keychain";

import {
  setUsername,
  setPassword,
  setName,
  setIsLoggedIn,
} from "./usersSlice.js";
import { useSelector, useDispatch } from "react-redux";
import { useRegisterUserMutation } from "./authSlice";
import { useRegister } from "../../services/actions/authActions";

const SignUp = ({ navigation }) => {
  const dispatch = useDispatch();
  const { name, username, password } = useSelector((state) => state.users);
  const [errors, setErrors] = useState({
    username: "",
    password: "",
    name: "",
  });

  const [registerUser, { isError, error }] = useRegisterUserMutation();
  //const { isError, error } = useRegister();

  useEffect(() => {
    if (isError && error) {
      const newErrors = {
        username: error.username || "",
        password: error.password || "",
        name: error.name || "",
      };
      setErrors(newErrors);
    } else {
      setErrors({ username: "", password: "", name: "" });
    }
  }, [isError, error]);

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      // const response = useRegister();
      // // To call the mutation
      // response.mutate({ username: username, password: password, name: name });
      // // To access the response data
      // console.log(response.data);

      const response = await registerUser({
        username,
        password,
        name,
      }).unwrap();
      await Keychain.setGenericPassword(response.username, response.token);
      dispatch(setIsLoggedIn(true));
    } catch (err) {
      console.log("SignUp Error: ", err);
    }
  };

  const inputStyleWithError = (fieldName) =>
    errors[fieldName]
      ? [loginStyles.input, loginStyles.inputError]
      : loginStyles.input;

  const clearErrors = () => setErrors({ username: "", password: "", name: "" });

  const handlePress = () => {
    navigation.replace("Login");
    clearErrors();
  };

  return (
    <SafeAreaView style={loginStyles.container}>
      <View style={loginStyles.headerContainer}>
        <Image source={logo} style={loginStyles.logo} />
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
            style={inputStyleWithError("name")}
            autoCorrect={false}
          />
          {errors.name && (
            <View style={signupStyle.errorContainer}>
              <Text style={signupStyle.error}>{errors.name}</Text>
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
            style={inputStyleWithError("username")}
            textContentType="oneTimeCode"
            autoCorrect={false}
          />
          {errors.username && (
            <View style={signupStyle.errorContainer}>
              <Text style={signupStyle.error}>{errors.username}</Text>
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
            style={inputStyleWithError("password")}
            textContentType="oneTimeCode"
          />
          {errors.password && (
            <View style={signupStyle.errorContainer}>
              <Text style={signupStyle.error}>{errors.password}</Text>
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
