import React, { useEffect, useRef, useState } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";

const OTPForm = () => {
  const [otp, setOtp] = useState(Array(4).fill(""));

  const inputRefs = useRef([]);

  useEffect(() => {
    inputRefs.current[0].focus();
  }, []);

  const focusPrevious = (index) => {
    if (index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const focusNext = (index, value) => {
    if (index < 3 && value) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleChange = (value, index) => {
    let otpArr = [...otp];
    otpArr[index] = value;

    setOtp(otpArr);

    if (value) {
      focusNext(index, value);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter your pin</Text>
      <View style={styles.inputContainer}>
        {[0, 1, 2, 3].map((i) => (
          <TextInput
            key={i}
            style={styles.input}
            onChangeText={(value) => handleChange(value, i)}
            onKeyPress={({ nativeEvent }) => {
              if (nativeEvent.key === "Backspace") {
                focusPrevious(i);
              }
            }}
            value={otp[i]}
            keyboardType="numeric"
            maxLength={1}
            ref={(ref) => {
              inputRefs.current[i] = ref;
            }}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    backgroundColor: "white",
  },
  title: {
    fontSize: 24,
    fontFamily: "bold",
    marginBottom: 24,
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
    height: 75,
  },
  input: {
    fontSize: 18,
    width: "20%",
    textAlign: "center",
    backgroundColor: "#F6F6F8",
    borderRadius: 10,
  },
});

export default OTPForm;
