import React from "react";
import { TouchableOpacity, Text, Image, StyleSheet } from "react-native";

const Button = ({
  onPress,
  children,
  imgSource,
  imgStyle,
  style,
  textStyle,
}) => {
  return (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
      <Text style={[styles.buttonText, textStyle]}>{children}</Text>
      <Image source={imgSource} style={[styles.image, imgStyle]} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "black",
    height: 60,
    paddingVertical: 10,
    borderRadius: 30,
    justifyContent: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    alignSelf: "center",
  },
  image: {
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Button;
