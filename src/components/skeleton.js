import React from "react";
import { View, StyleSheet, Animated } from "react-native";

const Skeleton = ({ style }) => {
  const animatedValue = new Animated.Value(0);

  const runAnimation = () => {
    animatedValue.setValue(0);
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
      isInteraction: false,
    }).start(() => runAnimation());
  };

  React.useEffect(() => {
    runAnimation();
  }, []);

  const translateX = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [-350, 350],
  });

  return (
    <View style={[styles.skeleton, style]}>
      <Animated.View
        style={[
          styles.shimmer,
          {
            transform: [{ translateX }],
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  skeleton: {
    backgroundColor: "lightgrey",
    overflow: "hidden",
    position: "relative",
    width: 150,
    height: 150,
  },
  shimmer: {
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(255,255,255,0.7)",
    position: "absolute",
    transform: [{ translateX: -350 }],
  },
});

export default Skeleton;
