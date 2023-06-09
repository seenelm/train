import React from "react";
import { TextInput } from "react-native";
import { loginStyles } from "../styles/Styles";

const CustomTextInput = ({ placeholder, value }) => {
  return (
    <TextInput
      placeholder={placeholder}
      value={value}
      style={loginStyles.input}
    />
  );
};

export default CustomTextInput;
