import React from "react";
import { View, Text, StyleSheet } from "react-native";

const RowLine = () => {
  return (
    <View style={styles.container}>
      <View style={styles.line} />
      <Text style={styles.text}>ó</Text>
      <View style={styles.line} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10, // Espacio vertical entre los elementos
  },
  line: {
    width: 151,
    height: 1,
    backgroundColor: "#E6E6E6",
  },
  text: {
    fontSize: 14,
    lineHeight: 20,
    textAlign: "center",
    color: "#CB1517",
    marginHorizontal: 8, // Espacio a ambos lados del "ó"
  },
});

export default RowLine;
