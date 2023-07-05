import * as React from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import { loginStyles } from "../styles/Styles";
import Button from "../components/Button";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { createUser } from "../api/Api";

const SignUpForm = ({ onSignUp, navigation }) => {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleSignUp = async () => {
    console.log(
      `Signing up with username: ${username} and password: ${password}`
    );
    try {
      const res = await createUser(username, password);
      if (res.data.success) {
        onSignUp();
      } else {
      }
    } catch (err) {
      console.log("An error occurred during sign up", err);
    }
  };

  return (
    <SafeAreaView style={loginStyles.container}>
      <View style={loginStyles.headerContainer}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          activeOpacity={0.6}
          style={signupStyle.icon}
        >
          <Ionicons name="chevron-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={loginStyles.header}>Sign Up</Text>
      </View>
      <View style={loginStyles.inputContainer}>
        <TextInput
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
          style={loginStyles.input}
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={loginStyles.input}
        />
      </View>
      <Button
        onPress={handleSignUp}
        style={signupStyle.signUpButton}
        textStyle={signupStyle.buttonText}
      >
        Sign up
      </Button>
    </SafeAreaView>
  );
};

const signupStyle = StyleSheet.create({
  signUpButton: {
    borderRadius: 5,
  },
  buttonText: {
    fontFamily: "bold",
    fontSize: 20,
  },
  icon: {
    position: "absolute",
    left: -10,
  },
});
export default SignUpForm;
