import { useEffect, useState, useRef } from "react"; // Añadimos useState
import { useDispatch, useSelector } from "react-redux";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  FlatList,
  Dimensions,
} from "react-native";
import { GlobalStyles, Colors, TextStyles } from "../../styles/styles";

import { fetchCategories } from "../../../shared/store/categoriesSlice/categoriesSlice";
import useMostVisitedPlaces from "../../hooks/places/useMostVisitedPlaces";
import useTopRatedPlacesByCategory from "../../hooks/places/useTopRatedPlacesByCategory";
import { getMostVisitedPlacesUseCase } from "../../../domain/usecases/places/getMostVisitedPlacesUseCase";

//Components

import MainHeader from "../../components/MainHeader/MainHeader";
import MostVisitedPlaces from "../../components/MostVisitedPlaces/MostVisitedPlaces";
import CategoryCardSmall from "../../components/CategoryCardSmall/CategoryCardSmall";
import VerticalPlaceCard from "../../components/VerticalPlaceCard/VerticalPlaceCard";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const PADDING_HORIZONTAL = 16; // Padding lateral del carrusel
const CARD_WIDTH = SCREEN_WIDTH - PADDING_HORIZONTAL * 2; // Ancho visible (excluye padding)
const CARD_MARGIN = 10; // Separación entre cards
const SNAP_INTERVAL = CARD_WIDTH; // Ajustado para mejorar el desplazamiento

const HomeScreen = () => {
  const dispatch = useDispatch();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const { all, status } = useSelector((state) => state.categories);
  const { places, loading, error } = useMostVisitedPlaces();
  const {
    places: topRatedPlaces,
    loading: loadingTopRated,
    error: errorTopRated,
  } = useTopRatedPlacesByCategory(selectedCategory);
  const flatListRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0); // Cambiamos a useState

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  // Logging cuando se selecciona una categoría o cambian datos
  useEffect(() => {
    if (selectedCategory) {
      const categoryName =
        all?.find((c) => c.id === selectedCategory)?.name || "Desconocida";
    }
  }, [selectedCategory, all]);

  useEffect(() => {
    if (topRatedPlaces && topRatedPlaces.length > 0) {
      // Los lugares top-rated se han cargado correctamente
    }
  }, [topRatedPlaces]);

  useEffect(() => {
    if (!places || places.length === 0) return;

    const interval = setInterval(() => {
      if (flatListRef.current) {
        const nextIndex = (currentIndex + 1) % places.length;
        setCurrentIndex(nextIndex);
        flatListRef.current.scrollToIndex({
          index: nextIndex,
          animated: true,
        });
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [places, currentIndex]);

  const defaultCategories = Array.isArray(all)
    ? all.filter((cat) => cat.isDefault)
    : [];

  const handleViewMore = () => {};

  // Limitamos a 3 cards de categorías (el 4to es "Ver Más")
  const displayCategories = Array.isArray(all)
    ? all.filter((cat) => cat.isDefault).slice(0, 3)
    : [];

  if (status === "loading") return <Text>Cargando...</Text>;
  if (loading) return <ActivityIndicator size="large" color="#0000ff" />;
  if (error) return <Text>Error al cargar lugares: {String(error)}</Text>;

  const onScrollToIndexFailed = (info) => {
    const wait = new Promise((resolve) => setTimeout(resolve, 500));
    wait.then(() => {
      flatListRef.current?.scrollToIndex({
        index: info.index,
        animated: true,
      });
    });
  };

  const handleScrollEnd = (e) => {
    const offset = e.nativeEvent.contentOffset.x;
    const newIndex = Math.round(offset / SNAP_INTERVAL);
    setCurrentIndex(newIndex);
  };

  return (
    <View style={styles.outerContainer}>
      <View style={styles.headerContainer}>
        <MainHeader username={"Christofer"} />
      </View>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        style={styles.scrollViewStyle}
      >
        {/* Lugares más visitados */}
        <View>
          <Text style={styles.sectionTitle}>
            <Text style={styles.textBlack}>Los </Text>
            <Text style={styles.textPrimary}>mas Visitados</Text>
            <Text style={styles.textBlack}> en Nuestra App</Text>
          </Text>
          <FlatList
            ref={flatListRef}
            data={places || []}
            keyExtractor={(item) => item.idPlace.toString()}
            horizontal
            renderItem={({ item, index }) => {
              return (
                <MostVisitedPlaces
                  place={item}
                  onPress={() => {/* TODO: Implementar navegación al detalle */}}
                  cardWidth={CARD_WIDTH}
                  cardMargin={CARD_MARGIN}
                />
              );
            }}
            showsHorizontalScrollIndicator={false}
            snapToInterval={SNAP_INTERVAL}
            snapToAlignment="start"
            decelerationRate="fast"
            onScrollToIndexFailed={onScrollToIndexFailed}
            contentContainerStyle={styles.carouselContainer}
            onMomentumScrollEnd={handleScrollEnd}
            initialNumToRender={places ? places.length : 0} // Asegurar que se rendericen todos los elementos inicialmente
          />
          {/* Indicadores de paginación */}
          {places && places.length > 1 && (
            <View style={styles.pagination}>
              {places.map((_, index) => (
                <View
                  key={index}
                  style={[
                    styles.dot,
                    index === currentIndex
                      ? styles.activeDot
                      : styles.inactiveDot,
                  ]}
                />
              ))}
            </View>
          )}
          <Text style={styles.planText}>
            <Text style={styles.textBlack}>Cual es</Text>
            <Text style={styles.textPrimary}> tu </Text>
            <Text style={styles.textPrimary}>Plan</Text>
            <Text style={styles.textBreakLine}>                </Text>
            <Text style={styles.textPrimary}>Plan</Text>
            <Text style={styles.textBlack}> para el Día de </Text>
            <Text style={styles.textPrimary}>Hoy</Text>
            <Text style={styles.textBlack}>?</Text>
          </Text>
        </View>

        {/* Todas las Categorías con 3 cards y card "Ver Más" a la derecha */}
        <View style={styles.categoryListContainer}>
          {displayCategories.map((item) => (
            <View key={item.id} style={styles.cardWrapper}>
              <CategoryCardSmall
                nameCategory={item.name}
                iconCategory={item.icon || "pricetag-outline"}
                isSelectedCategory={selectedCategory === item.id}
                onPressCard={() => {
                  setSelectedCategory(item.id);
                }}
              />
            </View>
          ))}
          <View style={styles.cardWrapper}>
            <CategoryCardSmall isViewMore onPressCard={handleViewMore} />
          </View>
        </View>

        {/* Sección de Lugares Mejor Calificados */}
        <View style={styles.topRatedSection}>
          {loadingTopRated ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color={Colors.ColorPrimary} />
              <Text style={styles.loadingText}>
                Cargando lugares destacados...
              </Text>
            </View>
          ) : errorTopRated ? (
            <Text style={styles.errorText}>Error: {String(errorTopRated)}</Text>
          ) : topRatedPlaces && topRatedPlaces.length > 0 ? (
            <View style={styles.topRatedOuterContainer}>
              <View style={styles.topRatedGrid}>
                {topRatedPlaces.map((item) => (
                  <VerticalPlaceCard
                    key={item.idPlace.toString()}
                    NameCard={item.placeName}
                    ImagenPlaceCard={item.imageUrl}
                    ratingStars={item.ratingStars}
                    imageCategoryName={item.imageCategoryName}
                    onPress={() => {
                      /* TODO: Implementar navegación al detalle */
                    }}
                  />
                ))}
              </View>
            </View>
          ) : selectedCategory ? (
            <Text style={styles.noPlacesText}>
              No hay lugares destacados para esta categoría.
            </Text>
          ) : (
            <Text style={styles.noPlacesText}>
              Selecciona una categoría para ver los lugares destacados.
            </Text>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: Colors.BackgroundPage,
    overflow: "visible",
  },
  headerContainer: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
    backgroundColor: Colors.BackgroundPage,
  },
  container: {
    flex: 1,
    ...GlobalStyles.ScreenBaseStyle, // Esto ya aplica padding: 16 automáticamente
    overflow: "visible", // Permite que los elementos hijos sean visibles fuera de los límites
  },
  scrollViewStyle: {
    overflow: "visible",
    paddingHorizontal: 16, // Restauramos el padding aquí
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 20,
    overflow: "visible", // Permitir que las sombras sean visibles
  },
  sectionTitle: {
    ...TextStyles.PoppinsSemiBold15,
    marginVertical: 8,
    marginHorizontal: 2,
  },
  textPrimary: {
    color: Colors.ColorPrimary,
  },
  textBlack: {
    color: Colors.Black,
  },
  topRatedSection: {
    marginTop: 0,
    marginHorizontal: -8, // Mantenemos el margen negativo para las sombras
    overflow: "visible",
  },
  topRatedOuterContainer: {
    paddingHorizontal: 8, // Compensamos el margen negativo
    overflow: "visible", // Seguimos permitiendo que las sombras sean visibles
  },
  topRatedGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: 10,
    overflow: "visible", // Aseguramos que las sombras sean visibles
    paddingHorizontal: 0, // Eliminamos padding adicional
    paddingRight: 3, // Añadimos un padding en el lado derecho para separar del borde
  },
  noPlacesText: {
    ...TextStyles.PoppinsRegular15,
    color: Colors.DarkGray,
    textAlign: "center",
    marginTop: 20,
  },
  errorText: {
    ...TextStyles.PoppinsRegular15,
    color: "red",
    textAlign: "center",
    marginTop: 20,
  },
  pagination: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 8,
    marginBottom: 20,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: Colors.ColorPrimary,
  },
  inactiveDot: {
    backgroundColor: Colors.DarkGray,
  },
  planText: {
    fontFamily: "Poppins-Bold",
    fontSize: 28,
    marginBottom: 5,
    textAlign: "start",
  },
  categoryListWrapperRow: {
    width: "100%",
    flexDirection: "row",
  },
  categoryListRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 8,
  },
  categoryListContainer: {
    flexDirection: "row",
    justifyContent: "space-between", // Espacio igual entre cards, pegadas a los bordes
    alignItems: "flex-start",
    width: "100%",
    marginTop: 0,
  },
  categoryCardFlex: {
    flex: 1,
    alignItems: "center",
  },
  cardWrapper: {
    width: "20%",
  },
  loadingContainer: {
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  loadingText: {
    ...TextStyles.PoppinsRegular15,
    color: Colors.DarkGray,
    marginTop: 10,
  },
  categoryText: {
    ...TextStyles.PoppinsRegular15,
    color: Colors.DarkGray,
    flex: 1,
  },
});
export default HomeScreen;
