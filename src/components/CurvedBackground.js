import React from "react";
import { View, StyleSheet } from "react-native";
import Svg, { Path } from "react-native-svg";

const CurvedBackground = () => {
  return (
    <View style={styles.container}>
      <Svg height="200" width="200" viewBox="0 0 200 200">
        <Path
          d="M 0 200 Q 50 100 200 0 L 0 0 Z"
          fill="#A8C7A1" // Color verde claro
        />
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: 200,
    height: 200,
  },
});

export default CurvedBackground;
