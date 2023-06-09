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

const LoginForm = ({ onLogin, navigation }) => {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState("");
  const [hasError, setHasError] = React.useState(false);

  const handleLogin = async () => {
    try {
      console.log(
        `Logging in with username: ${username} and password: ${password}`
      );
      const res = await checkCredentials(username, password);
      if (res.data.authenticated) {
        setHasError(false);
        setErrorMessage("");
        onLogin();
      } else {
        setHasError(true);
        setErrorMessage("Incorrect username or password");
      }
    } catch (err) {
      console.log("An error occurred during login", err);
    }
  };

  const clearError = () => {
    setHasError(false);
    setErrorMessage("");
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
          onChangeText={setUsername}
          onFocus={clearError}
          style={inputStyle}
        />
        <View style={loginStyles.passwordInputContainer}>
          <TextInput
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
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
