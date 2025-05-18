import { useState } from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { GlobalStyles, TextStyles, Colors } from "../../styles/styles";

const NavigationTopBar = ({
  primaryIcon = "chevron-back",
  SecondIcon = "heart-outline",
  onBackPress,
  onSecondIconPress,
  useBackground = true,
  useHeart = true,
  title,
}) => {
  const [isHeartActive, setIsHeartActive] = useState(false);

  const handleHeartPress = () => {
    setIsHeartActive(!isHeartActive);
  };

  // Cambia el ícono si el corazón está activo
  const secondaryIconName =
    isHeartActive && SecondIcon === "heart-outline" ? "heart" : SecondIcon;

  return (
    <View style={styles.header}>
      <View style={styles.container}>
        {/* Botón de retroceso */}
        <TouchableOpacity
          style={useBackground ? styles.iconContainer : styles.iconNoBackground}
          onPress={onBackPress}
        >
          <Ionicons style={styles.icon} name={primaryIcon} />
        </TouchableOpacity>

        {/* Título */}
        <Text style={[styles.title, !title && styles.titleHidden]}>
          {title ? title : null}
        </Text>

        {/* Ícono secundario solo si existe */}
        {SecondIcon ? (
          <TouchableOpacity
            style={
              SecondIcon === "pencil"
                ? styles.iconNoBackground
                : styles.iconContainer
            }
            onPress={
              SecondIcon === "pencil"
                ? onSecondIconPress
                : useHeart && SecondIcon === "heart-outline"
                ? handleHeartPress
                : null
            }
            disabled={!useHeart && SecondIcon === "heart-outline"}
          >
            <Ionicons style={styles.icon} name={secondaryIconName} />
          </TouchableOpacity>
        ) : (
          <View style={styles.emptySpace} />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    width: "100%",
    position: "relative", // Necesario para posicionamiento absoluto del título
  },
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    position: "relative", // Para que el título se posicione relativo a este contenedor
  },
  iconContainer: {
    backgroundColor: Colors.BackgroundPage,
    borderRadius: 30,
    borderWidth: 3,
    borderColor: Colors.LightGray,
    padding: 7,
    zIndex: 2, // Para que esté por encima del título
  },
  icon: {
    color: Colors.ColorPrimary,
    fontSize: 22,
  },
  iconNoBackground: {
    color: Colors.ColorPrimary,
    paddingHorizontal: 10,
    zIndex: 2, // Para que esté por encima del título
  },
  hiddenIcon: {
    opacity: 0,
  },
  title: {
    ...TextStyles.PoppinsSemiBold15,
    position: "absolute", // Posicionamiento absoluto
    left: 0,
    right: 0, // Extender al ancho completo
    textAlign: "center",
    color: Colors.ColorPrimary,
    zIndex: 1, // Asegura que esté sobre los otros elementos
    top: "50%", // Centra verticalmente
    transform: [{ translateY: -10 }], // Ajusta verticalmente (la mitad de la altura del texto aproximadamente)
  },
  titleHidden: {
    opacity: 0,
  },
});

export default NavigationTopBar;
