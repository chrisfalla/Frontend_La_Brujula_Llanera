import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors, TextStyles, GlobalStyles } from "../../../presentation/styles/styles";
import Rating from "../Rating/Rating";
import { useSelector, useDispatch } from "react-redux";
import { addFavorite, deleteFavorite } from "../../../shared/store/favoritesSlice/favoritesSlice";

const VerticalPlaceCard = ({
  NameCard,
  ImagenPlaceCard,
  ratingStars,
  imageCategoryName,
  onPress,
  idPlace, // Esta prop es crítica para la funcionalidad de favoritos
}) => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user);
  const favorites = useSelector(state => state.favorites.favorites);
  const [isFavorite, setIsFavorite] = useState(false);

  // Obtener el ID del lugar directamente de la prop o del atributo
  const placeId = idPlace;

  // Log para depuración
  useEffect(() => {
    console.log(`🔄 [VerticalPlaceCard] Inicializando tarjeta para lugar: ${NameCard}, ID: ${placeId}`);
  }, [NameCard, placeId]);

  // Verificar si este lugar está en favoritos
  useEffect(() => {
    if (user?.id && placeId && Array.isArray(favorites)) {
      const favorite = favorites.some(fav => 
        (fav.idPlaceFk === placeId && fav.idUserFk === user.id) || 
        (fav.idPlace === placeId && fav.userId === user.id)
      );
      setIsFavorite(favorite);
      console.log(`🔍 [VerticalPlaceCard] Verificando favorito - Place: ${placeId}, Es favorito: ${favorite}`);
    }
  }, [favorites, user, placeId]);

  const handleFavoritePress = async (e) => {
    if (e) e.stopPropagation(); // Evitar que se active onPress del card
    
    // Depuración para ver qué valores están llegando
    console.log(`📝 Debug VerticalPlaceCard - idPlace: ${placeId}, User ID: ${user?.id}`);
    
    if (!user?.id || !placeId) {
      console.log(`⚠️ [VerticalPlaceCard] No se puede gestionar favorito: usuario=${user?.id} o placeId=${placeId} no disponible`);
      return;
    }

    try {
      console.log(`🔄 [VerticalPlaceCard] ${isFavorite ? 'Eliminando' : 'Añadiendo'} favorito - User: ${user.id}, Place: ${placeId}`);
      
      if (isFavorite) {
        await dispatch(deleteFavorite({ 
          idUserFk: user.id, 
          idPlaceFk: placeId 
        })).unwrap();
        console.log('✅ [VerticalPlaceCard] Favorito eliminado correctamente');
      } else {
        await dispatch(addFavorite({ 
          idUserFk: user.id, 
          idPlaceFk: placeId 
        })).unwrap();
        console.log('✅ [VerticalPlaceCard] Favorito añadido correctamente');
      }
    } catch (error) {
      console.error('❌ [VerticalPlaceCard] Error al gestionar favorito:', error);
    }
  };

  // Si recibimos placeName y imageUrl en lugar de NameCard y ImagenPlaceCard
  const name = NameCard || "";
  const imageUrl = ImagenPlaceCard || "";
  const rating = ratingStars || 0; 

  // Limpiar URL de imagen si tiene errores tipográficos
  const cleanImageUrl = imageUrl
    .replace('httpps://', 'https://')
    .replace('https:///', 'https://');

  return (
    <TouchableOpacity 
      style={styles.mainContainer}
      onPress={onPress}
      activeOpacity={0.9}
    >
      {/* Contenedor relativo para imagen y rating */}
      <View style={styles.imageWrapper}>
        <Image source={{ uri: cleanImageUrl }} style={styles.imageContainer} />
        {/* Botón de favorito (corazón) */}
        <TouchableOpacity
          style={styles.favoriteButton}
          onPress={handleFavoritePress}
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
    width: '100%', // Ligeramente ajustado para mejor espacio entre cards
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
    borderRadius: GlobalStyles.borderRadius,
  },
  favoriteButton: {
    position: "absolute",
    top: 4,
    right: 4,
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
    // left: "10%",
    width: "75%",
    marginLeft: "12%",
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
