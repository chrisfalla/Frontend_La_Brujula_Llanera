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
  const user = useSelector((state) => state.auth?.user);
  const favorites = useSelector((state) => state.favorites?.favorites || []);
  const [isHeartActive, setIsHeartActive] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const loadedRef = useRef(false);

  // Verificar si este lugar está en favoritos
  useEffect(() => {
    if (!placeId || !Array.isArray(favorites)) return;
    
    // Si está actualizando, no cambiar el estado para evitar parpadeo
    if (isUpdating) return;
    
    // Buscar si este lugar es favorito
    const placeIdStr = String(placeId);
    const isFavorite = favorites.some(fav => {
      const favPlaceId = fav.idPlaceFk || fav.idPlace;
      return favPlaceId && String(favPlaceId) === placeIdStr;
    });
    
    // Actualizar estado solo si hay un cambio
    if (isHeartActive !== isFavorite) {
      setIsHeartActive(isFavorite);
    }
  }, [placeId, favorites, isUpdating, isHeartActive]);

  // Cargar favoritos solo una vez
  useEffect(() => {
    if (user?.id && !loadedRef.current) {
      loadedRef.current = true;
      dispatch(fetchFavorites(user.id));
    }
  }, [dispatch, user]);

  const handleHeartPress = async () => {
    if (!user?.id || !placeId) {
      return;
    }

    // Prevenir múltiples clics
    if (isUpdating) return;

    setIsUpdating(true);
    
    // Actualización optimista
    const previousState = isHeartActive;
    setIsHeartActive(!previousState);

    if (previousState) {
      // Si ya es favorito, lo eliminamos
      await dispatch(
        deleteFavorite({
          idUserFk: user.id,
          idPlaceFk: placeId,
        })
      ).unwrap();
    } else {
      // Si no es favorito, lo añadimos
      await dispatch(
        addFavorite({
          idUserFk: user.id,
          idPlaceFk: placeId,
        })
      ).unwrap();
    }

    setIsHeartActive(isHeartActive);
    setIsUpdating(false);
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
                : onSecondIconPress // Asegurando que onSecondIconPress se use para "add-circle"
            }
            disabled={isUpdating || (!useHeart && SecondIcon === "heart-outline")}
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
    marginTop: 25,
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