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
            onPress={
              SecondIcon === "pencil"
                ? onSecondIconPress
                : useHeart && SecondIcon === "heart-outline"
                ? handleHeartPress
                : onSecondIconPress
            }
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
  },
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 0, // Eliminamos el padding horizontal para que los iconos estén más cerca de los bordes
  },
  iconContainer: {
    backgroundColor: Colors.BackgroundPage,
    borderRadius: 30,
    borderWidth: 3,
    borderColor: Colors.LightGray,
    padding: 7,
    minWidth: 4, // Reducimos el ancho mínimo
  },
  icon: {
    color: Colors.ColorPrimary,
    fontSize: 22,
    textAlign: 'center', // Centra el icono horizontalmente
  },
  iconNoBackground: {
    color: Colors.ColorPrimary,
    paddingHorizontal: 0, // Eliminamos el padding horizontal
    minWidth: 30, // Reducimos aún más el ancho mínimo
    marginHorizontal: 0, // Eliminamos el margen horizontal
    marginLeft: -10, // Agregamos un margen negativo para acercar más al borde
  },
  titleContainer: {
    flex: 1, // Ocupa todo el espacio disponible
    alignItems: 'center', // Centra el título horizontalmente
    // Agregamos un padding horizontal para que el texto tenga más espacio
    paddingHorizontal: 0, // Ajustamos el padding horizontal del título
  },
  title: {
    ...TextStyles.PoppinsSemiBold15,
    textAlign: "center",
    color: Colors.ColorPrimary,
  },
  titleHidden: {
    opacity: 0,
  },
  invisibleIcon: {
    opacity: 0, // Hace que el elemento sea invisible
  },
});

export default NavigationTopBar;
