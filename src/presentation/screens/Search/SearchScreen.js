import React, { useState, useEffect } from "react";
import { View, StyleSheet, StatusBar, FlatList, Text, ActivityIndicator } from "react-native";
import { GlobalStyles, TextStyles } from "../../styles/styles";
import NavigationTopBar from "../../components/NavigationTopBar/NavigationTopBar";
import { useNavigation, useRoute } from "@react-navigation/native";
import CustomSearch from "../../components/Search/Search";
import HorizontalCardPlace from "../../components/HorizontalCardPLace/HorizontalCardPlace";
import { Colors } from "../../styles/styles";
import { getPlacesByCategory } from "../../../domain/usecases/places/getPlacesByCategory";

const SearchScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  
  // Extraer los parámetros de navegación
  const { categoryId, categoryName } = route.params || {};
  
  const [searchValue, setSearchValue] = useState("");
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Cargar lugares por categoría cuando se navega a esta pantalla
  useEffect(() => {
    if (categoryId) {
      fetchPlacesByCategory(categoryId);
    }
  }, [categoryId]);

  // Función para obtener lugares por categoría
  const fetchPlacesByCategory = async (catId) => {
    try {
      setLoading(true);
      setError(null);
      
      console.log(`🔍 Buscando lugares para categoría ID: ${catId}`);
      const result = await getPlacesByCategory(catId);
      
      setPlaces(result);
      console.log(`✅ Se encontraron ${result.length} lugares para la categoría`);
    } catch (err) {
      console.error("❌ Error al obtener lugares por categoría:", err);
      setError("No se pudieron cargar los lugares. Intenta nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  const handleBackPress = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    }
  };

  const handleSearch = (text) => {
    setSearchValue(text);
    // Aquí podrías implementar filtrado local de los resultados ya cargados
  };

  const handlePlacePress = (place) => {
    navigation.navigate("DetailScreen", { placeId: place.idPlace });
  };

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="#ffffff"
        translucent={false}
      />
      <View style={styles.containerSearch}>
        <NavigationTopBar 
          primaryIcon="chevron-back"
          onBackPress={handleBackPress}
          navigation={navigation}
          useBackground={false}
          SecondIcon={false}
          title={categoryName || "Búsqueda"}
        />
        <CustomSearch
          value={searchValue}
          onChangeText={handleSearch}
          placeholder={categoryName ? `Buscar en ${categoryName}...` : "Buscar..."}
        />
      </View>
      
      <View style={styles.resultsContainer}>
        {loading ? (
          <View style={styles.centerContent}>
            <ActivityIndicator size="large" color={Colors.ColorPrimary} />
            <Text style={styles.loadingText}>Cargando lugares...</Text>
          </View>
        ) : error ? (
          <View style={styles.centerContent}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        ) : places.length > 0 ? (
          <FlatList
            data={places}
            keyExtractor={(item) => item.idPlace?.toString() || Math.random().toString()}
            renderItem={({ item }) => (
              <HorizontalCardPlace
                title={item.placeName}
                description={item.placeAddress || "Sin dirección"}
                imageUrl={item.imageUrl || "https://via.placeholder.com/150"}
                onPress={() => handlePlacePress(item)}
              />
            )}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listContainer}
          />
        ) : (
          <View style={styles.centerContent}>
            <Text style={styles.noResultsText}>
              {categoryName 
                ? `No se encontraron lugares en la categoría ${categoryName}` 
                : "No se encontraron resultados"}
            </Text>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.BackgroundPage,
    paddingVertical: 10,
  },
  containerSearch: {
    marginTop: 12,
    marginBottom: 20,
    position: 'static'
  },
  resultsContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    ...TextStyles.PoppinsRegular15,
    marginTop: 10,
    color: Colors.ColorPrimary,
  },
  errorText: {
    ...TextStyles.PoppinsRegular15,
    color: 'red',
    textAlign: 'center',
  },
  noResultsText: {
    ...TextStyles.PoppinsRegular15,
    color: Colors.Gray,
    textAlign: 'center',
  },
  listContainer: {
    paddingBottom: 20,
  },
});

export default SearchScreen;
