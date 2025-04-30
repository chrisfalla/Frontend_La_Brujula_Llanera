// presentation/screens/Categories/CategoriesScreen.js

import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import Header from "../../components/Header";
import CustomSearch from "../../components/Search/Search";
import { GetCategoriesUseCase } from "../../../domain/usecases/categories/GetCategoriesUseCase";
import { provideCategoryRepository } from "../../../data/repositories/categories/ProvideCategoryRepository";

const CategoriesScreen = () => {
  const [categories, setCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredCategories, setFilteredCategories] = useState([]);

  useEffect(() => {
    loadCategories();
  }, []);

  useEffect(() => {
    filterCategories();
  }, [searchQuery, categories]);

  const loadCategories = async () => {
    try {
      console.log("🚀 Ejecutando GetCategoriesUseCase...");
      const repository = provideCategoryRepository();
      const useCase = new GetCategoriesUseCase(repository);
      const result = await useCase.execute();
      console.log("✅ Categorías cargadas:", result);
      setCategories(result);
    } catch (error) {
      console.error("Error al cargar categorías:", error);
    }
  };

  const filterCategories = () => {
    if (!searchQuery.trim()) {
      setFilteredCategories(categories);
    } else {
      const filtered = categories.filter(category =>
        category.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredCategories(filtered);
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    // Aquí podrías agregar lógica adicional específica para cuando se presiona el botón de búsqueda
    // Por ejemplo, analytics, llamadas a API, etc.
  };

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.text}>{item.name}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Header />
      <CustomSearch
        placeholder="Buscar categorías..."
        value={searchQuery}
        onChangeText={setSearchQuery}
        onSearch={handleSearch}
      />
      <FlatList
        data={filteredCategories}
        renderItem={renderItem}
        keyExtractor={(item) => item.idCategory.toString()}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  listContainer: {
    padding: 16,
  },
  item: {
    padding: 15,
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  text: {
    fontSize: 16,
    color: '#236A34',
    fontWeight: '500',
  },
});

export default CategoriesScreen;
