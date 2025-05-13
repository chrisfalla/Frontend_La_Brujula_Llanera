//==============================================================================
// IMPORTS
//==============================================================================

// React imports
import React, { useEffect, useState, useRef, useMemo } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  FlatList,
  Dimensions,
} from "react-native";

// Redux imports
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../../../shared/store/categoriesSlice/categoriesSlice";

// Styles
import { GlobalStyles, Colors, TextStyles } from "../../styles/styles";

// Hooks
import useMostVisitedPlaces from "../../hooks/places/useMostVisitedPlaces";
import useTopRatedPlacesByCategory from "../../hooks/places/useTopRatedPlacesByCategory";
import { useTags } from "../../hooks/tags/useTags";
import { getMostVisitedPlacesUseCase } from "../../../domain/usecases/places/getMostVisitedPlacesUseCase";

// Components
import MainHeader from "../../components/MainHeader/MainHeader";
import MostVisitedPlaces from "../../components/MostVisitedPlaces/MostVisitedPlaces";
import CategoryCardSmall from "../../components/CategoryCardSmall/CategoryCardSmall";
import VerticalPlaceCard from "../../components/VerticalPlaceCard/VerticalPlaceCard";
import CustomCheap from "../../components/CustomCheap/CustomCheap";

//==============================================================================
// CONSTANTS
//==============================================================================
const { width: SCREEN_WIDTH } = Dimensions.get("window");
const PADDING_HORIZONTAL = 16; // Padding lateral del carrusel
const CARD_WIDTH = SCREEN_WIDTH - PADDING_HORIZONTAL * 2; // Ancho visible (excluye padding)
const CARD_MARGIN = 10; // Separación entre cards
const SNAP_INTERVAL = CARD_WIDTH; // Ajustado para mejorar el desplazamiento

//==============================================================================
// HOME SCREEN COMPONENT
//==============================================================================
const HomeScreen = () => {
  //============================================================================
  // HOOKS & STATE
  //============================================================================
  const dispatch = useDispatch();
  const flatListRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedTags, setSelectedTags] = useState({});
  
  // Redux state
  const { all, status } = useSelector((state) => state.categories);
  
  // Custom hooks
  const { places, loading, error } = useMostVisitedPlaces();
  const {
    places: topRatedPlacesRaw,
    loading: loadingTopRated,
    error: errorTopRated,
  } = useTopRatedPlacesByCategory(selectedCategory);
  const { tags, loading: loadingTags, error: errorTags } = useTags();
  
  // Serializable data transformation
  const topRatedPlaces = useMemo(() => {
    if (!topRatedPlacesRaw) return [];
    
    return topRatedPlacesRaw.map(place => ({
      ...place,
      visitCount: place.visitCount === undefined ? null : place.visitCount
    }));
  }, [topRatedPlacesRaw]);
  
  //============================================================================
  // EFFECTS
  //============================================================================
  
  // Fetch categories on mount
  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  // Handle category selection changes
  useEffect(() => {
    if (selectedCategory) {
      const categoryName =
        all?.find((c) => c.id === selectedCategory)?.name || "Desconocida";
    }
  }, [selectedCategory, all]);

  // Monitor loaded top rated places
  useEffect(() => {
    if (topRatedPlaces && topRatedPlaces.length > 0) {
      // Los lugares top-rated se han cargado correctamente
    }
  }, [topRatedPlaces]);

  // Auto-scrolling carousel effect
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

  //============================================================================
  // DERIVED DATA & HELPER FUNCTIONS
  //============================================================================
  
  // Categories filtering
  const defaultCategories = Array.isArray(all)
    ? all.filter((cat) => cat.isDefault)
    : [];

  const displayCategories = Array.isArray(all)
    ? all.filter((cat) => cat.isDefault).slice(0, 3)
    : [];

  // Event handlers
  const handleViewMore = () => {};

  const handleTagPress = (tagId) => {
    setSelectedTags(prev => ({
      ...prev,
      [tagId]: !prev[tagId]
    }));
  };

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

  //============================================================================
  // LOADING & ERROR STATES
  //============================================================================
  if (status === "loading") return <Text>Cargando...</Text>;
  if (loading) return <ActivityIndicator size="large" color="#0000ff" />;
  if (error) return <Text>Error al cargar lugares: {String(error)}</Text>;

  //============================================================================
  // RENDER
  //============================================================================
  return (
    <View style={styles.outerContainer}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <MainHeader username={"Christofer"} />
      </View>
      
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        style={styles.scrollViewStyle}
      >
        {/* SECCIÓN 1: Lugares más visitados */}
        <View>
          <Text style={styles.sectionTitle}>
            <Text style={styles.textBlack}>Los </Text>
            <Text style={styles.textPrimary}>mas Visitados</Text>
            <Text style={styles.textBlack}> en Nuestra App</Text>
          </Text>
          
          {/* Carrusel horizontal */}
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
            initialNumToRender={places ? places.length : 0}
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
          
          {/* Texto promocional */}
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

        {/* SECCIÓN 2: Categorías */}
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

        {/* SECCIÓN 3: Lugares Mejor Calificados */}
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

        {/* SECCIÓN 4: Etiquetas */}
        <View style={styles.tagsSectionContainer}>
          <Text style={styles.sectionTitle}>
            <Text style={styles.textBlack}>Explora por </Text>
            <Text style={styles.textPrimary}>Etiquetas</Text>
          </Text>
          
          {loadingTags ? (
            <ActivityIndicator size="large" color={Colors.ColorPrimary} />
          ) : errorTags ? (
            <Text style={styles.errorText}>Error al cargar etiquetas: {errorTags}</Text>
          ) : tags && tags.length > 0 ? (
            <FlatList
              data={tags}
              renderItem={({ item }) => (
                <CustomCheap
                  label={item.tagName}
                  selected={!!selectedTags[item.idTag]}
                  onPress={() => handleTagPress(item.idTag)}
                />
              )}
              keyExtractor={(item) => item.idTag?.toString() || Math.random().toString()}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.tagsFlatListContainer}
            />
          ) : (
            <Text style={styles.noPlacesText}>No hay etiquetas disponibles.</Text>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

//==============================================================================
// STYLES
//==============================================================================
const styles = StyleSheet.create({
  // Contenedores principales
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
    ...GlobalStyles.ScreenBaseStyle,
    overflow: "visible",
  },
  
  // Scroll view
  scrollViewStyle: {
    overflow: "visible",
    paddingHorizontal: 16,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 20,
    overflow: "visible",
  },
  
  // Estilos de texto
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
  planText: {
    fontFamily: "Poppins-Bold",
    fontSize: 28,
    marginBottom: 5,
    textAlign: "start",
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
  
  // Carrusel y paginación
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
  
  // Lista de categorías
  categoryListContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    width: "100%",
    marginTop: 0,
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
  categoryCardFlex: {
    flex: 1,
    alignItems: "center",
  },
  cardWrapper: {
    width: "20%",
  },
  
  // Sección lugares destacados
  topRatedSection: {
    marginTop: 0,
    marginHorizontal: -8,
    overflow: "visible",
  },
  topRatedOuterContainer: {
    paddingHorizontal: 8,
    overflow: "visible",
  },
  topRatedGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: 10,
    overflow: "visible",
    paddingHorizontal: 0,
    paddingRight: 3,
  },
  loadingContainer: {
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  
  // Sección tags
  tagsSectionContainer: {
    marginTop: 20,
    marginBottom: 10,
  },
  tagsFlatListContainer: {
    paddingVertical: 10,
  },
});

export default HomeScreen;
