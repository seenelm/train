import * as React from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
} from "react-native";
import { loginStyles } from "../styles/Styles";
import Button from "../components/Button";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { createUser } from "../api/Api";
import logo from "../assets/icons/logo3.png";

const SignUpForm = ({ onSignUp, navigation }) => {
  const [name, setName] = React.useState("");
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
        <Image source={logo} style={loginStyles.logo} />
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          activeOpacity={0.6}
          style={signupStyle.icon}
        >
          <Ionicons name="chevron-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={loginStyles.header}>Welcome</Text>
        <Text>Please enter your details to sign up</Text>
      </View>
      <View style={loginStyles.inputContainer}>
        <TextInput
          placeholder="Name"
          value={name}
          onChangeText={setName}
          style={loginStyles.input}
        />
        <TextInput
          placeholder="Email"
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
      <Text style={signupStyle.haveAccount} onPress={() => {}}>
        Have an account?
      </Text>
    </SafeAreaView>
  );
};

const signupStyle = StyleSheet.create({
  signUpButton: {
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
  haveAccount: {
    margin: 20,
    alignSelf: "center",
    fontFamily: "bold",
    color: "black",
    fontSize: 15,
  },
});
export default SignUpForm;
