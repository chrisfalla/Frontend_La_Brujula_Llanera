import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { View, StyleSheet, StatusBar, ScrollView, ActivityIndicator, Text } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../../../shared/store/categoriesSlice/categoriesSlice";
import CustomSearch from "../../components/Search/Search";
import { GlobalStyles, Colors } from "../../styles/styles";
import MainHeader from "../../components/MainHeader/MainHeader";
import CategorieCardBig from "../../components/CategorieCardBig/CategorieCardBig";

// Definición de constantes fuera del componente
const CATEGORY_ORDER = [
  "Ecoturismo",
  "Cultura",
  "Gastronomía",
  "Servicios",
  "Alojamiento",
  "Entretenimiento"
];

const CATEGORY_ICONS = {
  "Ecoturismo": "planet-outline", // Probamos con otro icono
  "Cultura": "color-palette-outline",
  "Gastronomía": "restaurant-outline",
  "Servicios": "briefcase-outline",
  "Alojamiento": "business-outline",
  "Entretenimiento": "musical-notes-outline",
};

// Agregar función de depuración
const getIconForCategory = (categoryName) => {
  console.log('Buscando icono para:', categoryName);
  console.log('Icono encontrado:', CATEGORY_ICONS[categoryName]);
  return CATEGORY_ICONS[categoryName] || "earth-outline"; // Icono por defecto diferente para prueba
};

// Función de normalización simplificada
function normalizeCategoryName(name) {
  return name || "";  // Si name es undefined, retorna string vacío
}

const CategoriesScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { all, status, error } = useSelector((state) => state.categories);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredCategories, setFilteredCategories] = useState([]);

  // Cargar las categorías al montar el componente
  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  // Filtrar categorías cuando cambia la búsqueda o las categorías
  useEffect(() => {
    if (all && all.length > 0) {
      let filtered = [...all]; // Crear copia del array
      
      if (searchQuery.trim() !== '') {
        filtered = filtered.filter(category =>
          category.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }

      // Ordenar según CATEGORY_ORDER
      filtered.sort((a, b) => {
        const idxA = CATEGORY_ORDER.indexOf(a.name);
        const idxB = CATEGORY_ORDER.indexOf(b.name);
        return idxA - idxB;
      });

      // Debug
      console.log('Categorías filtradas:', filtered.map(c => c.name));
      
      setFilteredCategories(filtered);
    }
  }, [all, searchQuery]);

  // Función para manejar la selección de una categoría
  const handleCategoryPress = (categoryId) => {
    try {
      // Buscar la categoría seleccionada para obtener su nombre
      const selectedCategory = all.find(category => category.id === categoryId);
      
      if (!categoryId) {
        console.error('⚠️ [CategoriesScreen] ID de categoría no válido:', categoryId);
        return;
      }
      
      // Log más detallado para verificar el ID exacto
      console.log(`🔍 [CategoriesScreen] Navegando a SearchScreen con categoría:`, {
        nombre: selectedCategory?.name,
        id: categoryId,
        tipoId: typeof categoryId
      });
      
      // Asegurarse de que el ID sea un número si se espera así
      const idToSend = typeof categoryId === 'string' ? parseInt(categoryId, 10) : categoryId;
      
      // Navegar a la pantalla de búsqueda con los parámetros de categoría
      navigation.navigate("SearchScreen", {
        categoryId: idToSend,
        categoryName: selectedCategory ? selectedCategory.name : "Categoría"
      });
    } catch (error) {
      console.error('❌ [CategoriesScreen] Error al navegar:', error);
    }
  };

  return (
    <View style={styles.container}>
      {/* Barra de estado para iOS y Android */}
      <StatusBar
        barStyle="dark-content"
        backgroundColor="#ffffff"
        translucent={false}
      />

      <View style={styles.headerContainer}> 
      <MainHeader title="Categorías" />
      </View>
      


      <CustomSearch 
        value={searchQuery}
        onChangeText={setSearchQuery}
        placeholder="Buscar categorías..."
      />

      {status === 'loading' ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={Colors.ColorPrimary} />
        </View>
      ) : error ? (
        <Text style={styles.errorText}>Error al cargar categorías: {error}</Text>
      ) : (
        <ScrollView>
          {filteredCategories.map((category) => (
            <CategorieCardBig
              key={category.id}
              nameCategory={category.name}
              iconCategory={getIconForCategory(category.name)}
              onPress={() => handleCategoryPress(category.id)}
            />
          ))}
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: Colors.BackgroundPage,

  },
  headerContainer: {
    paddingHorizontal: 16,
    paddingTop: 16,
    backgroundColor: Colors.BackgroundPage,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    textAlign: 'center',
    margin: 20,
    color: 'red',
  }
});

export default CategoriesScreen;