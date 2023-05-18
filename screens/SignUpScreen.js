import * as React from "react";
import { View, TextInput, Button, Text } from "react-native";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { styles } from "../styles/LoginScreenStyles";

WebBrowser.maybeCompleteAuthSession();

export default function SignUpScreen({ onSignUp }) {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleSignUp = () => {
    console.log(
      `Signing up with username: ${username} and password: ${password}`
    );
    onSignUp();
  };

  const [userInfo, setUserInfo] = React.useState(null);
  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId:
      "420363198912-cfmnkd100c12e2pvida6tchtj9cqn7mk.apps.googleusercontent.com",
    iosClientId:
      "420363198912-fj4tprgq6br68m7l5rbke0nrig7eogrg.apps.googleusercontent.com",
    webClientId:
      "420363198912-9cn25b815cjqe386fa7mdkggsuevt1md.apps.googleusercontent.com",
  });

  React.useEffect(() => {
    handleSignUpWithGoogle();
  }, [response]);

  async function handleSignUpWithGoogle() {
    const user = await AsyncStorage.getItem("@user");
    if (!user) {
      if (response?.type === "success") {
        await getUserInfo(response.authentication.accessToken);
      }
    } else {
      setUserInfo(JSON.parse(user));
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
    <View style={styles.container}>
      <Text style={styles.header}>Sign Up</Text>
      <Text>{JSON.stringify(userInfo, null, 2)}</Text>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
          style={styles.input}
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={styles.input}
        />
        <Button title="Sign Up" onPress={handleSignUp} />
        <Button title="sign up with google" onPress={() => promptAsync()} />
        <Button
          title="Delete"
          onPress={() => AsyncStorage.removeItem("@user")}
        />
      </View>
    </View>
  );
}
