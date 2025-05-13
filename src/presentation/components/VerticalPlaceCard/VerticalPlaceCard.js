import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {
  Colors,
  TextStyles,
  GlobalStyles,
} from "../../../presentation/styles/styles";
import Rating from "../Rating/Rating";
// No importamos todo NavigationTopBar porque solo necesitamos la funcionalidad del corazón

const VerticalPlaceCard = ({
  NameCard,
  ImagenPlaceCard,
  ratingStars,
  imageCategoryName,
  onPress,
}) => {
  // Estado para controlar si el lugar está marcado como favorito
  const [isFavorite, setIsFavorite] = React.useState(false);

  // Si recibimos placeName y imageUrl en lugar de NameCard y ImagenPlaceCard
  // esto permite compatibilidad con los datos que vienen del modelo Place
  const name = NameCard || "";
  const imageUrl = ImagenPlaceCard || "";
  const rating = ratingStars || ""; // Valor por defecto de 5 estrellas si no se proporciona

  const handleFavoritePress = () => {
    setIsFavorite(!isFavorite);
    // Aquí podrías agregar lógica adicional para guardar el favorito en Redux o API
  };
  return (
    <TouchableOpacity 
      style={styles.mainContainer}
      onPress={onPress} // Aquí añadimos el evento onPress al componente completo
      activeOpacity={0.9}
    >
      {/* Contenedor relativo para imagen y rating */}
      <View style={styles.imageWrapper}>
        <Image source={{ uri: imageUrl }} style={styles.imageContainer} />
        {/* Botón de favorito (corazón) */}
        <TouchableOpacity
          style={styles.favoriteButton}
          onPress={(e) => {
            e.stopPropagation(); // Evitar que el evento se propague al padre
            handleFavoritePress();
          }}
        >
          <Ionicons
            name={isFavorite ? "heart" : "heart-outline"}
            size={22}
            color={Colors.ColorPrimary}
          />
        </TouchableOpacity>
        {/* Rating sobre la imagen */}
        <View style={styles.ratingContainer}>
          <Rating average={rating} useBackground={false} size={18} />
        </View>
      </View>
      <Text style={styles.textStyle} numberOfLines={1} ellipsizeMode="tail">
        {name}
      </Text>
      <View style={styles.iconStyle}>
        <Ionicons name="location" size={28} color={Colors.ColorPrimary} />
        <View style={styles.locationTextContainer}>
          {/* Mostramos el nombre de la categoría solo si existe y no contiene "SmallCard" */}
          {imageCategoryName && !String(imageCategoryName).includes("SmallCard") ? (
            <Text
              style={styles.locationText}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {imageCategoryName}
            </Text>
          ) : null}
        </View>
        <Ionicons
          name="chevron-forward-circle"
          size={28}
          color={Colors.ColorPrimary}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    width: '48%', // Ligeramente ajustado para mejor espacio entre cards
    marginHorizontal: 0, // Quitamos el margen horizontal para evitar el espacio extra
    alignItems: "center",
    alignSelf: 'flex-start',
    position: "relative",
    overflow: "visible", 
    borderRadius: GlobalStyles.borderRadius,
    ...GlobalStyles.CardBaseStyle,
    padding: 0,//se deja 
  },
  imageWrapper: {
    width: "100%",
    height: 150,
    position: "relative", // Para posicionar el rating sobre la imagen
  },
  imageContainer: {
    width: "100%",
    height: 140,
    borderTopLeftRadius: GlobalStyles.borderRadius,
    borderTopRightRadius: GlobalStyles.borderRadius,
  },
  favoriteButton: {
    position: "absolute",
    top: 10,
    right: 10,
    zIndex: 3,
    backgroundColor: "white",
    width: 36,
    height: 36,
    borderRadius: 18, // Exactamente la mitad del ancho/alto
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3,
    elevation: 5, // Aumentado para Android para mejor visibilidad
  },
  ratingContainer: {
    position: "absolute",
    bottom: -3, // Ahora justo en el borde de la imagen
    left: "10%",
    width: "80%",
    alignItems: "center",
    backgroundColor: Colors.BackgroundPage,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: GlobalStyles.borderRadius,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: GlobalStyles.elevation,
    zIndex: 2,
  },
  textStyle: {
    ...TextStyles.PoppinsBold15,
    marginTop: 16, // Aumentado el margen para adaptarse a la nueva posición del rating
    width: "88%",
    textAlign: "center",
    color: Colors.Black,
  },
  iconStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 11,
    width: "40%",
    paddingHorizontal: 5,
  },
  locationTextContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  locationText: {
    ...TextStyles.PoppinsRegular14,
    color: Colors.DarkGray,
    textAlign: "center",
  },
});

export default VerticalPlaceCard;
