// presentation/screens/Categories/CategoriesScreen.js

import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import Header from "../../components/Header";
import CustomSearch from "../../components/Search/Search";
import { GetCategoriesUseCase } from "../../../domain/usecases/categories/GetCategoriesUseCase";
import { provideCategoryRepository } from "../../../data/repositories/categories/ProvideCategoryRepository";

const CategoriesScreen = () => {
  const [categories, setCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredCategories, setFilteredCategories] = useState([]);

  const getCategoryIcon = (categoryName) => {
    const icons = {
      'Ecoturismo': 'leaf',
      'Cultura': 'book',
      'Alojamiento': 'bed',
      'Gastronomía': 'restaurant',
      'Servicios': 'construct',
      'Entretenimiento': 'game-controller',
    };
    return icons[categoryName] || 'help-circle';
  };

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
    <TouchableOpacity style={styles.item}>
      <View style={styles.itemContent}>
        <View style={styles.leftContent}>
          <Ionicons 
            name={getCategoryIcon(item.name)} 
            size={22} 
            color="#236A34" 
            style={styles.icon}
          />
          <Text style={styles.text}>{item.name}</Text>
        </View>
        <Ionicons 
          name="chevron-forward" 
          size={22} 
          color="#236A34"
          style={styles.chevronIcon}
        />
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Header />
      <CustomSearch
        placeholder="Buscar Categorías..."
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
    backgroundColor: "white",
  },
  listContainer: {
    padding: 16,
  },
  item: {
    backgroundColor: 'white',
    borderRadius: 10,
    marginBottom: 12,
    borderWidth: 1.3,
    borderColor: '#236A34',
    elevation: 2, 
    shadowColor: '#000',
    shadowOffset: {
      width: 2,  
      height: 2, 
    },
    shadowOpacity: 0.15, 
    shadowRadius: 2, 
  },
  itemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    paddingRight: 8, 
  },
  leftContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 14,
  },
  chevronIcon: {
    marginLeft: 20, 
  },
  text: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000',
  },
});

export default CategoriesScreen;
