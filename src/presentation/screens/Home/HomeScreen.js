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

import MainHeader from "../../components/MainHeader/MainHeader";
import MostVisitedPlaces from "../../components/MostVisitedPlaces/MostVisitedPlaces";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const PADDING_HORIZONTAL = 16; // Padding lateral del carrusel
const CARD_WIDTH = SCREEN_WIDTH - PADDING_HORIZONTAL * 2; // Ancho visible (excluye padding)
const CARD_MARGIN = 10; // Separación entre cards
const SNAP_INTERVAL = CARD_WIDTH + CARD_MARGIN; // Ajustado para el desplazamiento

const HomeScreen = () => {
  const dispatch = useDispatch();
  const { all, status } = useSelector((state) => state.categories);
  const { places, loading, error } = useMostVisitedPlaces();
  const flatListRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0); // Cambiamos a useState

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    if (!places || places.length === 0) return;

    const interval = setInterval(() => {
      if (flatListRef.current) {
        const nextIndex = (currentIndex + 1) % places.length;
        setCurrentIndex(nextIndex); // Actualizamos el estado
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
    setCurrentIndex(newIndex); // Actualizamos el estado
  };

  return (
    <View style={styles.container}>
      <MainHeader username={"Christofer"} />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Categorías predeterminadas */}
        <View style={styles.categoryList}>
          {defaultCategories.map((category, index) => (
            <Text key={index}>{category.name}</Text>
          ))}
        </View>

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
            renderItem={({ item }) => (
              <MostVisitedPlaces
                place={item}
                onPress={() => console.log("Ver más sobre:", item.placeName)}
                cardWidth={CARD_WIDTH}
                cardMargin={CARD_MARGIN}
              />
            )}
            showsHorizontalScrollIndicator={false}
            snapToInterval={SNAP_INTERVAL}
            snapToAlignment="start"
            decelerationRate="fast"
            onScrollToIndexFailed={onScrollToIndexFailed}
            contentContainerStyle={styles.carouselContainer}
            onMomentumScrollEnd={handleScrollEnd}
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
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    ...GlobalStyles.ScreenBaseStyle,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 20,
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
  pagination: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 8,
    marginBottom: 8,
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
});

export default HomeScreen;
