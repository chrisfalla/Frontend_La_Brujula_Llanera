import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Colors, TextStyles } from "../../styles/styles";

const CustomStepper = ({ step, totalSteps = 3 }) => {
  {/*  Step es donde se define el paso actual y totalSteps definira en cuántos pasos se divide el proceso */}
  const lista = Array.from({ length: totalSteps }, (_, i) => i + 1);
  
  return (
    <View style={styles.containerlinea}>
      {lista.map((value, index) => (
          // <React.Fragment> se utiliza para agrupar los elementos de cada paso
        // sin agregar un contenedor extra en el árbol de componentes.
        // Esto permite evitar un nodo visual adicional que podría afectar el layout
        // manteniendo el árbol de componentes más limpio.
        <React.Fragment key={value}>
          {/* Línea a la izquierda excepto para el primer círculo */}
          {index > 0 && (
            <View
              style={[
                styles.line,
                step >= value ? styles.lineActive : styles.lineInactive,
              ]}
            />
          )}

          {/* Círculo */}
          <View
            style={[
              styles.circle,
              step >= value ? styles.circleActive : styles.circleInactive,
            ]}
          >
            <Text style={styles.text}>{value}</Text>
          </View>
        </React.Fragment>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  containerlinea: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },
  circle: {
    width: 47,
    height: 47,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
  },
  circleActive: {
    backgroundColor: Colors.ColorOnPrimary,
  },
  circleInactive: {
    backgroundColor: Colors.DarkGray,
  },
  line: {
    height: 4,
    flex: 1,
  },
  lineActive: {
    backgroundColor: Colors.ColorOnPrimary,
  },
  lineInactive: {
    backgroundColor: Colors.DarkGray,
  },
  text: {
    ...TextStyles.PoppinsBold15,
  },
});

export default CustomStepper;
