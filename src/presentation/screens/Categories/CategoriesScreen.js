import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { View, StyleSheet, StatusBar, ScrollView, ActivityIndicator, Text } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../../../shared/store/categoriesSlice/categoriesSlice";
import CustomSearch from "../../components/Search/Search";
import { GlobalStyles, Colors } from "../../styles/styles";
import MainHeader from "../../components/MainHeader/MainHeader";
import CategorieCardBig from "../../components/CategorieCardBig/CategorieCardBig";

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
      if (searchQuery.trim() === '') {
        setFilteredCategories(all);
      } else {
        const filtered = all.filter(category => 
          category.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredCategories(filtered);
      }
    }
  }, [all, searchQuery]);

  // Función para manejar la selección de una categoría
  const handleCategoryPress = (categoryId) => {
    // Buscar la categoría seleccionada para obtener su nombre
    const selectedCategory = all.find(category => category.id === categoryId);
    
    // Navegar a la pantalla de búsqueda con los parámetros de categoría
    navigation.navigate("SearchScreen", {
      categoryId: categoryId,
      categoryName: selectedCategory ? selectedCategory.name : "Categoría"
    });
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
              iconCategory={category.icon || "pricetag-outline"}
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