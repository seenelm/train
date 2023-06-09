import * as React from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import { loginStyles } from "../styles/Styles";
import CustomButton from "../components/CustomButton";
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
        // User was successfully created, call the onSignUp function to navigate
        onSignUp();
      } else {
        // Handle signup error
        // You might want to set an error state variable here to display an error message
      }
    } catch (err) {
      console.log("An error occurred during sign up", err);
      // Handle network error
      // You might want to set an error state variable here to display an error message
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
        <CustomButton
          title="Sign up"
          onPress={handleSignUp}
          style={signupStyle}
        />
      </View>
    </SafeAreaView>
  );
};

const signupStyle = StyleSheet.create({
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
export default SignUpForm;
