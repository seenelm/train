import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import AsyncStorage from "@react-native-async-storage/async-storage";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import CustomButton from "../components/CustomButton";
import { useSafeAreaInsets } from "react-native-safe-area-context";

WebBrowser.maybeCompleteAuthSession();

const SignUpScreen = ({ navigation, onLoginScreen }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const insets = useSafeAreaInsets();

  const handleTap = () => {
    navigation.navigate("Sign up");
  };
  const handleLoginScreen = () => {
    onLoginScreen();
  };

  const [userInfo, setUserInfo] = useState(null);
  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId:
      "420363198912-cfmnkd100c12e2pvida6tchtj9cqn7mk.apps.googleusercontent.com",
    androidClientId:
      "420363198912-cfmnkd100c12e2pvida6tchtj9cqn7mk.apps.googleusercontent.com",
    iosClientId:
      "420363198912-fj4tprgq6br68m7l5rbke0nrig7eogrg.apps.googleusercontent.com",
    webClientId:
      "420363198912-9cn25b815cjqe386fa7mdkggsuevt1md.apps.googleusercontent.com",
  });

  useEffect(() => {
    handleSignInWithGoogle();
  }, [response]);

  async function handleSignInWithGoogle() {
    const user = await AsyncStorage.getItem("@user");
    if (!user) {
      if (response?.type === "success") {
        await getUserInfo(response.authentication.accessToken);
      }
    } else {
      setUserInfo(JSON.parse(user));
      console.log(userInfo);
    }
  }

  const getUserInfo = async (token) => {
    if (!token) return;
    try {
      const response = await fetch(
        "https://www.googleapis.com/userinfo/v2/me",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const user = await response.json();
      await AsyncStorage.setItem("@user", JSON.stringify(user));
      setUserInfo(user);
    } catch (error) {}
  };

  return (
    <View style={loginStyles.container}>
      <View style={loginStyles.signupContainer}>
        <Text style={loginStyles.header}>Sign Up for Train</Text>
        <View style={loginStyles.inputContainer}>
          <CustomButton
            title="Sign up with User / Pass"
            onPress={handleTap}
            style={{ buttonContainer: loginStyles.button }}
          />
          <CustomButton
            title="Sign up with Apple"
            style={{ buttonContainer: loginStyles.button }}
            icon={
              <FontAwesome5
                name="apple"
                size={20}
                color="black"
                style={loginStyles.buttonIcon}
              />
            }
          />
          <CustomButton
            title="Sign up with Google"
            onPress={() => promptAsync()}
            style={{ buttonContainer: loginStyles.button }}
            icon={
              <FontAwesome5
                name="google"
                size={18}
                color="black"
                style={loginStyles.buttonIcon}
              />
            }
          />
        </View>
      </View>
      <View
        style={[
          loginStyles.loginContainer,
          { paddingBottom: 10 + insets.bottom },
        ]}
      >
        <Text>Already have an account?</Text>
        <TouchableOpacity onPress={handleLoginScreen}>
          <Text style={loginStyles.loginText}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const loginStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "space-between",
  },
  header: {
    fontSize: 48,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 50,
  },
  inputContainer: {
    marginTop: 40,
  },
  input: {
    height: 50,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 20,
    paddingHorizontal: 15,
    backgroundColor: "#f0f0f0",
  },
  button: {
    borderColor: "lightgray",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 8,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "transparent",
    marginBottom: 10,
  },
  boxyButton: {
    backgroundColor: "transparent",
  },
  buttonIcon: {
    marginRight: 10,
  },
  loginContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
    padding: 20,
  },
  signupContainer: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  loginButton: {
    backgroundColor: "white",
  },
  loginText: {
    fontFamily: "bold",
    textDecorationLine: "underline",
  },
});

export default SignUpScreen;
