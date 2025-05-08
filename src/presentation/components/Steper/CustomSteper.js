import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { GlobalStyles, Colors, TextStyles } from "../../styles/styles";

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
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  circleActive: {
    backgroundColor: Colors.ColorOnPrimary,
  },
  circleInactive: {
    backgroundColor: Colors.DarkGray,
  },
  line: {
    width: 100,
    height: 4,
  },
  lineActive: {
    backgroundColor:Colors.ColorOnPrimary,
  },
  lineInactive: {
    backgroundColor: Colors.DarkGray,
  },
  text: {
    ...TextStyles.PoppinsBold15,
  },
});

export default CustomStepper;
