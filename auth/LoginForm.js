import React, { useMemo } from "react";
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { loginStyles } from "../styles/Styles";
import CustomButton from "../components/CustomButton";
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
    clearError();
  };

  const inputStyle = useMemo(
    () => (hasError ? loginStyles.inputError : loginStyles.input),
    [hasError]
  );

  return (
    <SafeAreaView style={loginStyles.container}>
      <View style={loginStyles.headerContainer}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          activeOpacity={0.6}
          style={loginStyle.icon}
        >
          <Ionicons name="chevron-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={loginStyles.header}>Login</Text>
      </View>
      <View style={loginStyles.inputContainer}>
        <TextInput
          placeholder="Username"
          value={username}
          onChangeText={(value) => dispatch(setUsername(value))}
          onFocus={clearError}
          style={inputStyle}
        />
        <View style={loginStyles.passwordInputContainer}>
          <TextInput
            placeholder="Password"
            value={password}
            onChangeText={(value) => dispatch(setPassword(value))}
            secureTextEntry
            onFocus={clearError}
            style={[inputStyle, loginStyles.passwordInput]} // apply passwordInput style
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
        <CustomButton title="Login" onPress={handleLogin} style={loginStyle} />
      </View>
    </SafeAreaView>
  );
};

const loginStyle = StyleSheet.create({
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "black",
    borderRadius: 5,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  buttonText: {
    color: "white",
  },
  icon: {
    position: "absolute",
    left: -10,
  },
});

export default LoginForm;
