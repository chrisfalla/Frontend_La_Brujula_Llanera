import React from "react";
import { View, Text, StyleSheet } from "react-native";

const CustomStepper = ({ step }) => {
    const lista = [1, 2, 3]
return (
    <View style={styles.containerlinea}>
    {lista.map((value, index ) => (

        <View key={value} style={styles.stepContainer}>

          {index > 0 && (

            <View
              style={[
                styles.line,
                step >= value ? styles.lineActive : styles.lineInactive,
              ]}
            />
          )}

          <View
            style={[
              styles.circle,
              step >= value ? styles.circleActive : styles.circleInactive, 
            ]}
          >

            <Text style={styles.text}>{value}</Text>

          </View>

        </View>
      ))}
    </View>
  );
};

 styles = StyleSheet.create({
  containerlinea: {
    flexDirection: "row",
    alignItems: "center",
  },
  stepContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  circle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  circleActive: {
    backgroundColor: "#236A34",
  },
  circleInactive: {
    backgroundColor: "gray",
  },
  line: {
    width: 40,
    height: 4,
  },
  lineActive: {
    backgroundColor: "#236A34",
  },
  lineInactive: {
    backgroundColor: "gray",
  },
  text: {
    color: "white",
    fontWeight: "bold",
  },
});

export default CustomStepper;
