import React, { useEffect, useState } from "react";
import { View, TextInput, Text, StyleSheet, Image } from "react-native";
import { loginStyles } from "../../styles/styles";
import Button from "../../components/button";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { setUsername, setPassword } from "../../api/store.js";
import logo from "../../assets/icons/logo3.png";

import { useLoginUserMutation } from "../../api/apiSlice";
import { setIsLoggedIn } from "./usersSlice.js";
import * as Keychain from "react-native-keychain";

const SignIn = () => {
  const dispatch = useDispatch();
  const [loginError, setLoginError] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const { username, password } = useSelector((state) => state.users);

  const [loginUser, { isError, error }] = useLoginUserMutation();

  useEffect(() => {
    renderLoginError();
    renderUsernameError();
    renderPasswordError();
  }, [error]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser({ username, password }).unwrap();
      console.log("Login Response: ", response);
      const token = response.token;
      const newUsername = response.username;

      // Store the token.
      await Keychain.setGenericPassword(newUsername, token).catch((error) => {
        console.log("Error storing token in KeyChain: ", error);
      });
      dispatch(setIsLoggedIn(true));
    } catch (err) {
      console.log("Error: ", err);
    }
  };

  const renderLoginError = () => {
    if (isError && error.message !== "") {
      setLoginError(error.message);
    } else {
      setLoginError("");
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

  const clearErrors = () => {
    setUsernameError("");
    setPasswordError("");
  };

  const inputStyleWithError = (hasError) => {
    return hasError
      ? [loginStyles.input, loginStyles.inputError]
      : loginStyles.input;
  };

  return (
    <SafeAreaView style={loginStyles.container}>
      <View style={loginStyles.headerContainer}>
        <Image source={logo} style={loginStyles.logo} />
        {/* <TouchableOpacity
          onPress={() => navigation.goBack()}
          activeOpacity={0.6}
          style={loginStyle.icon}
        >
          
        </TouchableOpacity> */}
        <Text style={loginStyles.header}>Welcome back</Text>
        <Text>Please enter your details to sign in</Text>
      </View>
      <View style={loginStyles.inputContainer} importantForAutofill="yes">
        <View style={loginStyle.inputWithErrorContainer}>
          <TextInput
            textContentType="username"
            placeholder="Email or Username"
            value={username}
            autoFocus={true}
            onChangeText={(value) => {
              dispatch(setUsername(value));
              clearErrors();
            }}
            style={inputStyleWithError(loginError || usernameError)}
          />

          {usernameError && (
            <View style={loginStyle.errorContainer}>
              <Text style={loginStyle.error}>{usernameError}</Text>
            </View>
          )}

          <View style={loginStyles.passwordInputContainer}>
            <TextInput
              textContentType="password"
              placeholder="Password"
              value={password}
              onChangeText={(value) => {
                dispatch(setPassword(value));
                clearErrors();
              }}
              secureTextEntry={true}
              style={inputStyleWithError(loginError || passwordError)}
            />
          </View>
          {loginError && (
            <View style={loginStyle.errorContainer}>
              <Text style={loginStyle.error}>{loginError}</Text>
            </View>
          )}
          {passwordError && (
            <View style={loginStyle.errorContainer}>
              <Text style={loginStyle.error}>{passwordError}</Text>
            </View>
          )}
        </View>
      </View>
      <Button
        onPress={handleLogin}
        style={loginStyle.signInButton}
        textStyle={loginStyle.buttonText}
      >
        Sign in
      </Button>
      <Text style={loginStyle.forgotText} onPress={() => {}}>
        Forgot password?
      </Text>
    </SafeAreaView>
  );
};

const loginStyle = StyleSheet.create({
  signInButton: {
    alignSelf: "center",
    borderRadius: 10,
    width: "90%",
  },
  inputWithErrorContainer: {
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
  },
  errorContainer: {
    width: "90%",
    paddingLeft: 10,
  },
  buttonText: {
    // fontFamily: 'bold',
    fontSize: 20,
  },
  icon: {
    position: "absolute",
    left: -10,
  },
  forgotText: {
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

export default SignIn;
