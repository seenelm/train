import React, { useRef, useEffect, useMemo } from "react";
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import { loginStyles } from "../styles/Styles";
import Button from "../components/Button";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { checkCredentials } from "../api/Api";
import { useDispatch, useSelector } from "react-redux";
import {
  setUsername,
  setPassword,
  setHasError,
  setErrorMessage,
} from "../api/userSlice";
import logo from "../assets/icons/logo3.png";

const LoginForm = ({ onLogin, navigation }) => {
  const dispatch = useDispatch();
  const { username, password, hasError, errorMessage } = useSelector(
    (state) => state.user
  );

  const handleLogin = async () => {
    try {
      console.log(
        `Logging in with username: ${username} and password: ${password}`
      );
      const res = await checkCredentials(username, password);
      if (res.data.authenticated) {
        dispatch(setHasError(false));
        dispatch(setErrorMessage(""));
        onLogin();
      } else {
        dispatch(setHasError(true));
        dispatch(setErrorMessage("Incorrect username or password"));
      }
    } catch (err) {
      console.log("An error occurred during login", err);
    }
  };

  const clearError = () => {
    dispatch(setHasError(false));
    dispatch(setErrorMessage(""));
  };

  const clearPassword = () => {
    setPassword("");
    setPassword("");
    clearError();
  };

  const inputStyle = useMemo(
    () => (hasError ? loginStyles.inputError : loginStyles.input),
    [hasError]
  );

  return (
    <SafeAreaView style={loginStyles.container}>
      <View style={loginStyles.headerContainer}>
        <Image source={logo} style={loginStyles.logo} />
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          activeOpacity={0.6}
          style={loginStyle.icon}
        >
          <Ionicons name="chevron-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={loginStyles.header}>Welcome back</Text>
        <Text>Please enter your details to sign in</Text>
      </View>
      <View style={loginStyles.inputContainer} importantForAutofill="yes">
        <TextInput
          textContentType="username"
          placeholder="Email or Username"
          value={username}
          onChangeText={(value) => dispatch(setUsername(value))}
          onFocus={clearError}
          style={inputStyle}
          keyboardAppearance="dark"
          autoFocus={true}
        />
        <View style={loginStyles.passwordInputContainer}>
          <TextInput
            placeholder="Password"
            value={password}
            onChangeText={(value) => dispatch(setPassword(value))}
            secureTextEntry={true}
            onFocus={clearError}
            style={[inputStyle, loginStyles.passwordInput]}
            keyboardAppearance="dark"
            textContentType="password"
          />
          {hasError && (
            <TouchableOpacity
              onPress={clearPassword}
              style={loginStyles.clearIcon}
            >
              <MaterialIcons name="clear" size={18} color="black" />
            </TouchableOpacity>
          )}
        </View>

        {hasError && <Text style={loginStyles.errorText}>{errorMessage}</Text>}
      </View>
      <Button
        onPress={handleLogin}
        style={loginStyle.signInButton}
        textStyle={loginStyle.buttonText}
      >
        Sign in
      </Button>
      <Text
        style={loginStyle.forgotText}
        onPress={() => navigation.navigate("ForgotForm")}
      >
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
  buttonText: {
    fontFamily: "bold",
    fontSize: 20,
  },
  icon: {
    position: "absolute",
    left: -10,
  },
  forgotText: {
    margin: 20,
    alignSelf: "center",
    fontFamily: "bold",
    color: "black",
    fontSize: 15,
  },
});

export default LoginForm;
