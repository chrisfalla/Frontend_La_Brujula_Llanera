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
import CategoryCardSmall from "../../components/CategoryCardSmall/CategoryCardSmall";

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
  const flatListRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0); // Cambiamos a useState

  // Añadir logs para depuración
  console.log('Estado de categorías:', status);
  console.log('Todas las categorías:', all);

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

  const handleViewMore = () => {
    console.log("Ver Más presionado");
  };

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
    console.log('Nuevo índice después de desplazamiento:', newIndex, 'de', places.length);
    setCurrentIndex(newIndex); // Actualizamos el estado
  };

  return (
    <View style={styles.container}>
      <MainHeader username={"Christofer"} />
      <ScrollView contentContainerStyle={styles.scrollContent}>
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
              console.log(`Renderizando lugar ${index}:`, item);
              return (
                <MostVisitedPlaces
                  place={item}
                  onPress={() => console.log("Ver más sobre:", item.placeName)}
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
            <Text style={styles.textBreakLine}>               </Text>
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
                  console.log('Categoría seleccionada:', item.name, 'con ID:', item.id);
                  setSelectedCategory(item.id);
                }}
              />
            </View>
          ))}
          <View style={styles.cardWrapper}>
            <CategoryCardSmall isViewMore onPressCard={handleViewMore} />
          </View>
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
    width: '100%',
    flexDirection: 'row',
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
    width: '100%',
    marginVertical: 8,
  },
  categoryCardFlex: {
    flex: 1,
    alignItems: "center",
  },
  cardWrapper: {
    width: "20%", 
  },
});

export default HomeScreen;