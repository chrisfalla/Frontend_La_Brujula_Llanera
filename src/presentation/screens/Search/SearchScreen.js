import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  StatusBar,
  FlatList,
  Text,
  ActivityIndicator,
} from "react-native";
import { GlobalStyles, TextStyles } from "../../styles/styles";
import NavigationTopBar from "../../components/NavigationTopBar/NavigationTopBar";
import { useNavigation, useRoute } from "@react-navigation/native";
import CustomSearch from "../../components/Search/Search";
import HorizontalCardPlace from "../../components/HorizontalCardPlace/HorizontalCardPlace";
import { Colors } from "../../styles/styles";
import { getPlacesByCategory } from "../../../domain/usecases/places/getPlacesByCategoryUseCase";

const SearchScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();

  // Extraer los parámetros de navegación
  const { categoryId, categoryName } = route.params || {};

  const [searchValue, setSearchValue] = useState("");
  const [places, setPlaces] = useState([]);
  const [filteredPlaces, setFilteredPlaces] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Cargar lugares por categoría cuando se navega a esta pantalla
  useEffect(() => {
    if (categoryId) {
      fetchPlacesByCategory(categoryId);
    }
  }, [categoryId]);
  // Actualizar el useEffect para el filtrado
  useEffect(() => {
    if (places.length > 0) {
      if (searchValue.trim() === "") {
        // Si la búsqueda está vacía, muestra todos los lugares cargados
        setFilteredPlaces(places);
      } else {
        // Filtra los lugares por el valor de búsqueda (por 'placeName' o 'nombreLugar')
        const filtered = places.filter((place) =>
          (place.placeName?.toLowerCase().includes(searchValue.toLowerCase()) ||
           place.nombreLugar?.toLowerCase().includes(searchValue.toLowerCase()))
        );
        setFilteredPlaces(filtered);
      }
    } else {
      // Si no hay lugares cargados, asegúrate de que filteredPlaces esté vacío
      setFilteredPlaces([]);
    }
  }, [places, searchValue]);

  // Función para obtener lugares por categoría
  const fetchPlacesByCategory = async (catId) => {
    try {
      setLoading(true);
      setError(null);
      
      console.log(`🔍 Buscando lugares para categoría ID: ${catId}`);
      const result = await getPlacesByCategory(catId);
      
      console.log(`📊 [SearchScreen] Respuesta completa:`, JSON.stringify(result));
      console.log(`📊 [SearchScreen] Número de lugares:`, result?.length || 0);
      
      // Verificar si los datos recibidos tienen la estructura esperada
      if (result && Array.isArray(result)) {
        if (result.length === 0) {
          console.warn('⚠️ [SearchScreen] No se encontraron lugares para esta categoría');
          setPlaces([]);
          setFilteredPlaces([]);
        } else {
          // Verificar la estructura de los datos
          result.forEach((place, index) => {
            console.log(`📊 [SearchScreen] Lugar ${index + 1}:`, JSON.stringify(place));
          });
          
          // Siempre asignar lugares, incluso si tienen datos incompletos
          setPlaces(result);
          setFilteredPlaces(result);
          console.log(`✅ [SearchScreen] Se encontraron ${result.length} lugares para la categoría`);
        }
      } else {
        console.error("❌ [SearchScreen] Resultado no válido:", result);
        setPlaces([]);
        setFilteredPlaces([]);
        setError("Los datos recibidos no tienen el formato esperado");
      }
    } catch (err) {
      console.error("❌ [SearchScreen] Error al obtener lugares por categoría:", err);
      setError("No se pudieron cargar los lugares. Intenta nuevamente.");
      setPlaces([]);
      setFilteredPlaces([]);
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
          placeholder={
            categoryName ? `Buscar en ${categoryName}...` : "Buscar..."
          }
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
  data={filteredPlaces}
  renderItem={({ item, index }) => {
    // Normalizar el objeto item para la vista
    const normalizedItem = {
      idPlace: item.idPlace || item.id || `place-${index}`,
      name: item.placeName || item.namePlace || `Lugar ${index + 1}`,
      address: item.placeAddress || item.addressPlace || "Sin dirección",
      image: item.imageUrl || "https://via.placeholder.com/150",
      category: item.categoryInfo?.category || categoryName || "Categoría"
    };
    
    // Log para depuración
    console.log(`📝 [SearchScreen] Lugar completo ${index}:`, JSON.stringify(item));
    console.log(`📝 [SearchScreen] Lugar normalizado ${index}:`, JSON.stringify(normalizedItem));
    
    // Pasar el objeto normalizado con los nombres de prop correctos
    return (
      <HorizontalCardPlace
        name={normalizedItem.name}
        address={normalizedItem.address}
        image={normalizedItem.image}
        category={normalizedItem.category}
        onPress={() => {
          navigation.navigate("DetailScreen", { 
            placeId: normalizedItem.idPlace 
          });
        }}
        onMapPress={() => {
          navigation.navigate("DetailScreen", { 
            placeId: normalizedItem.idPlace 
          });
        }}
      />
    );
  }}
  keyExtractor={(item, index) => (item.idPlace?.toString() || `place-${index}`)}
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
    position: "static",
  },
  resultsContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  centerContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  loadingText: {
    ...TextStyles.PoppinsRegular15,
    marginTop: 10,
    color: Colors.ColorPrimary,
  },
  errorText: {
    ...TextStyles.PoppinsRegular15,
    color: "red",
    textAlign: "center",
  },
  noResultsText: {
    ...TextStyles.PoppinsRegular15,
    color: Colors.Gray,
    textAlign: "center",
  },
  listContainer: {
    paddingBottom: 20,
  },
});

export default SearchScreen;
