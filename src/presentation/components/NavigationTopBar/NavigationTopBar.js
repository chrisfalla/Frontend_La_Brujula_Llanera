import { useState } from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { GlobalStyles, TextStyles, Colors } from "../../styles/styles";

const NavigationTopBar = ({
  primaryIcon = "chevron-back",
  SecondIcon, // Permitir que SecondIcon sea undefined
  onBackPress,
  onSecondIconPress,
  useBackground = true,
  useHeart = true,
  title,
  showSecondIcon = false, // Nueva prop para controlar la visibilidad del segundo icono
  removeBackground = false, // Nueva prop para eliminar el fondo
}) => {
  const [isHeartActive, setIsHeartActive] = useState(false);

  const handleHeartPress = () => {
    setIsHeartActive(!isHeartActive);
  };

  // Cambia el ícono si el corazón está activo
  const secondaryIconName =
    isHeartActive && SecondIcon === "heart-outline" ? "heart" : SecondIcon;

  // Determinar el manejador de eventos correcto para el segundo icono
  const handleSecondIconPress = () => {
    if (SecondIcon === "heart-outline" && useHeart) {
      handleHeartPress();
    } else if (onSecondIconPress) {
      onSecondIconPress();
    }
  };

  return (
    <View style={styles.header}>
      <View style={styles.container}>
        {/* Botón de retroceso */}
        <TouchableOpacity
          style={removeBackground ? styles.iconNoBackground : styles.iconContainer}
          onPress={onBackPress}
        >
          <Ionicons style={styles.icon} name={primaryIcon} />
        </TouchableOpacity>

        {/* Título siempre centrado */}
        <View style={styles.titleContainer}>
          <Text style={[styles.title, !title && styles.titleHidden]}>
            {title ? title : null}
          </Text>
        </View>

        {/* Ícono secundario o espacio invisible del mismo ancho */}
        {showSecondIcon && SecondIcon ? (
          <TouchableOpacity
            style={
              SecondIcon === "pencil"
                ? styles.iconNoBackground
                : styles.iconContainer
            }
            onPress={handleSecondIconPress}
            disabled={!useHeart && SecondIcon === "heart-outline"}
          >
            <Ionicons style={styles.icon} name={secondaryIconName} />
          </TouchableOpacity>
        ) : (
          // Espacio invisible que ocupa el mismo ancho que el icono
          <View style={[removeBackground ? styles.iconNoBackground : styles.iconContainer, styles.invisibleIcon]} />
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
    height: 45, // Altura fija para calcular mejor la posición del título
    position: "relative", // Para que el título se posicione relativo a este contenedor
    paddingHorizontal: 0, // Eliminamos el padding horizontal para que los iconos estén más cerca de los bordes
  },
  iconContainer: {
    backgroundColor: Colors.BackgroundPage,
    borderRadius: 30,
    borderWidth: 3,
    borderColor: Colors.LightGray,
    padding: 7,
    zIndex: 2, // Para que esté por encima del título
    minWidth: 40, // Ancho mínimo para el icono
  },
  icon: {
    color: Colors.ColorPrimary,
    fontSize: 22,
    textAlign: 'center', // Centra el icono horizontalmente
  },
  iconNoBackground: {
    zIndex: 2, // Para que esté por encima del título
    paddingHorizontal: 10,
    minWidth: 30, // Ancho mínimo reducido
    marginLeft: -10, // Margen negativo para acercar más al borde
  },
  titleContainer: {
    flex: 1, // Ocupa todo el espacio disponible
    alignItems: 'center', // Centra el título horizontalmente
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
  invisibleIcon: {
    opacity: 0, // Hace que el elemento sea invisible
  },
});

export default NavigationTopBar;
