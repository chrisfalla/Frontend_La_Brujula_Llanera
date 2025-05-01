import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import Header from "../../components/Header";
import { GetCategoriesUseCase } from "../../../domain/usecases/categories/GetCategoriesUseCase";
import { provideCategoryRepository } from "../../../data/repositories/categories/ProvideCategoryRepository";
import CategoryIcon from "../../components/CategoryIcon/CategoryIcon";  // Asegúrate de importar correctamente el componente

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
    <View style={styles.container}>
      <Header />
      
    
      <CategoryIcon
      limit={3}
      ShowText={true} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
});

export default CategoriesScreen;
