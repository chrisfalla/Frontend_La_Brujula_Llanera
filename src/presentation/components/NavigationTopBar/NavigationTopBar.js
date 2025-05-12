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
  },
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  iconContainer: {
    backgroundColor: Colors.BackgroundPage,
    borderRadius: 30,
    borderWidth: 3,
    borderColor: Colors.LightGray,
    padding: 7,
  },
  icon: {
    color: Colors.ColorPrimary,
    fontSize: 22,
  },
  iconNoBackground: {
    color: Colors.ColorPrimary,
    paddingHorizontal: 10,
  },
  hiddenIcon: {
    opacity: 0,
  },
  title: {
    ...TextStyles.PoppinsSemiBold15,
    textAlign: "center",
    color: Colors.ColorPrimary,
  },
  titleHidden: {
    opacity: 0,
  },
});

export default NavigationTopBar;
