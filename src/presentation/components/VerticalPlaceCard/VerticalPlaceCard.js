import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors, TextStyles, GlobalStyles } from "../../../presentation/styles/styles";
import Rating from "../Rating/Rating";
import { useSelector, useDispatch } from "react-redux";
import { addFavorite, deleteFavorite, fetchFavorites } from "../../../shared/store/favoritesSlice/favoritesSlice";

const VerticalPlaceCard = ({
  NameCard,
  ImagenPlaceCard,
  ratingStars,
  imageCategoryName,
  onPress,
  idPlace,
  onRemoveFavorite,
}) => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth?.user);
  const favorites = useSelector(state => state.favorites?.favorites || []);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  // Obtener el ID del lugar directamente de la prop
  const placeId = idPlace;

  // Verificar si este lugar está en favoritos cuando el componente se monta o cuando cambian los favoritos
  useEffect(() => {
    if (!placeId || !Array.isArray(favorites)) return;
    
    // Convertir placeId a string para comparaciones más seguras
    const placeIdStr = String(placeId);
    
    // Búsqueda más eficiente de favoritos
    const isFav = favorites.some(fav => {
      const favPlaceId = fav.idPlaceFk || fav.idPlace;
      return favPlaceId && String(favPlaceId) === placeIdStr;
    });
    
    // Solo actualizar estado si hay un cambio real
    if (isFavorite !== isFav && !isUpdating) {
      setIsFavorite(isFav);
    }
  }, [favorites, placeId, isFavorite, isUpdating]);

  const handleFavoritePress = async () => {
    if (!user?.id) {
      console.log('⚠️ [VerticalPlaceCard] No se puede gestionar favorito: usuario no autenticado');
      return;
    }
    
    if (!placeId) {
      console.log(`⚠️ [VerticalPlaceCard] No se puede gestionar favorito: placeId (${placeId}) no disponible`);
      return;
    }

    // Evitar múltiples pulsaciones mientras se procesa
    if (isUpdating) return;

    try {
      setIsUpdating(true);
      console.log(`🔄 [VerticalPlaceCard] ${isFavorite ? "Eliminando" : "Añadiendo"} favorito - User: ${user.id}, Place: ${placeId}`);

      // Actualización optimista de UI
      const previousState = isFavorite;
      setIsFavorite(!previousState);
      
      // Si es una eliminación y tenemos la función de callback, la llamamos
      if (previousState && onRemoveFavorite) {
        onRemoveFavorite(placeId);
      }

      if (previousState) {
        // Si ya es favorito, lo eliminamos
        await dispatch(deleteFavorite({ 
          idUserFk: user.id, 
          idPlaceFk: placeId 
        })).unwrap();
        console.log("✅ [VerticalPlaceCard] Favorito eliminado correctamente");
      } else {
        // Si no es favorito, lo añadimos
        await dispatch(addFavorite({ 
          idUserFk: user.id, 
          idPlaceFk: placeId 
        })).unwrap();
        console.log("✅ [VerticalPlaceCard] Favorito añadido correctamente");
      }
    } catch (error) {
      console.error("❌ [VerticalPlaceCard] Error al gestionar favorito:", error);
      // Revertir el cambio optimista en caso de error
      setIsFavorite(isFavorite);
    } finally {
      setIsUpdating(false);
    }
  };

  // Si recibimos placeName y imageUrl en lugar de NameCard y ImagenPlaceCard
  const name = NameCard || "";
  const imageUrl = ImagenPlaceCard || "";
  const rating = ratingStars || 0; 

  // Limpiar URL de imagen si tiene errores tipográficos
  const sanitizeUrl = (url) => {
    if (!url || typeof url !== 'string') return 'https://via.placeholder.com/150';
    
    return url
      .replace('httpps://', 'https://')
      .replace('https:///', 'https://')
      .replace('object//', 'object/')
      .replace(/\/+/g, '/') // Eliminar barras repetidas
      .replace(':/', '://'); // Restaurar protocolo con barras dobles
  };

  const cleanImageUrl = sanitizeUrl(imageUrl);

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
          style={[styles.favoriteButton, isUpdating && styles.disabledButton]}
          onPress={handleFavoritePress}
          disabled={isUpdating}
        >
          <Ionicons
            name={isFavorite ? "heart" : "heart-outline"}
            size={22}
            color={isUpdating ? Colors.DarkGray : Colors.ColorPrimary}
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
  disabledButton: {
    opacity: 0.7,
  },
});

export default VerticalPlaceCard;
