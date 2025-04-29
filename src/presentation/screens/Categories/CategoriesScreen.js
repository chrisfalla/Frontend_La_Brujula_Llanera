// presentation/screens/Categories/CategoriesScreen.js

import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import MainHeader from "../../components/MainHeader/CustomMainHeader ";
import { GetCategoriesUseCase } from "../../../domain/usecases/categories/GetCategoriesUseCase";
import { provideCategoryRepository } from "../../../data/repositories/categories/ProvideCategoryRepository";

// .map
// Listas


const CategoriesScreen = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const loadCategories = async () => {
      console.log("🚀 Ejecutando GetCategoriesUseCase...");
      const repository = provideCategoryRepository();
      const useCase = new GetCategoriesUseCase(repository);
      const result = await useCase.execute();
      console.log("✅ Categorías cargadas:", result);
      setCategories(result);
    };

    loadCategories();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <MainHeader  username={'Usarname'} />
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
