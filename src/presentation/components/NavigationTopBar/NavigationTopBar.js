import { useState, useEffect, useRef } from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { GlobalStyles, TextStyles, Colors } from "../../styles/styles";
import { useDispatch, useSelector } from "react-redux";
import { fetchFavorites, addFavorite, deleteFavorite } from "../../../shared/store/favoritesSlice/favoritesSlice";

const NavigationTopBar = ({
  primaryIcon = "chevron-back",
  SecondIcon = "heart-outline",
  onBackPress,
  onSecondIconPress,
  useBackground = true,
  useHeart = true,
  title,
  placeId,
}) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const favorites = useSelector((state) => state.favorites.favorites);
  const [isHeartActive, setIsHeartActive] = useState(false);
  const loadedRef = useRef(false);
  // Necesitamos una variable de referencia para controlar si ya se cargaron los favoritos
  const initialLoadRef = useRef(false);

  // Fetch favorites only once when component mounts
  useEffect(() => {
    // Solo cargar si hay un usuario, hay un ID de lugar, y no se ha hecho la carga inicial
    if (user?.id && !initialLoadRef.current) {
      console.log('🔄 [NavigationTopBar] Cargando favoritos iniciales para usuario:', user.id);
      initialLoadRef.current = true; // Marcar como ya cargado
      dispatch(fetchFavorites(user.id));
    }
  }, [dispatch, user]); // Quitar placeId y favorites de las dependencias

  // Check if the current place is a favorite
  useEffect(() => {
    if (placeId && favorites && favorites.length > 0) {
      // Verificación más robusta de favoritos
      const isFavorite = favorites.some(fav => {
        const favPlaceId = fav.idPlaceFk || fav.idPlace;
        return String(favPlaceId) === String(placeId);
      });
      
      setIsHeartActive(isFavorite);
    }
  }, [placeId, favorites]); // Mantener estas dependencias

  const handleHeartPress = async () => {
    if (!user?.id || !placeId) {
      console.log(
        "⚠️ [NavigationTopBar] No se puede gestionar favorito: usuario o placeId no disponible"
      );
      return;
    }

    try {
      console.log(
        `🔄 [NavigationTopBar] ${
          isHeartActive ? "Eliminando" : "Añadiendo"
        } favorito - User: ${user.id}, Place: ${placeId}`
      );

      if (isHeartActive) {
        // Si ya es favorito, lo eliminamos
        await dispatch(
          deleteFavorite({
            idUserFk: user.id,
            idPlaceFk: placeId,
          })
        ).unwrap();
        console.log("✅ [NavigationTopBar] Favorito eliminado correctamente");
      } else {
        // Si no es favorito, lo añadimos
        await dispatch(
          addFavorite({
            idUserFk: user.id,
            idPlaceFk: placeId,
          })
        ).unwrap();
        console.log("✅ [NavigationTopBar] Favorito añadido correctamente");
      }

      // No necesitamos actualizar el estado local manualmente
      // El efecto se encargará de actualizar basado en los cambios en favorites
    } catch (error) {
      console.error("❌ [NavigationTopBar] Error al gestionar favorito:", error);
    }
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
