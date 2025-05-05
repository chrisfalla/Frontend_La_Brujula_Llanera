import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import Header from "../../components/Header";
import { getCategoriesUseCase } from '../../../domain/usecases/categories/getCategoriesUseCase';
import { categoriesRepository } from '../../../data/repositories/categories/categoriesRepository';


const CategoriesScreen = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const loadCategories = async () => {
      const getCategories = getCategoriesUseCase(categoriesRepository);
      const all = await getCategories();
      setCategories(all);
    };

    loadCategories();
  }, []);

  return (
    <View style={{ flex: 1 }}>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#fff",
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  item: {
    padding: 12,
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    marginBottom: 10,
  },
  text: {
    fontSize: 18,
  },
});

export default CategoriesScreen;
