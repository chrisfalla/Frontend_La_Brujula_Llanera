import React, { useEffect, useState } from "react";
import { View, StyleSheet, FlatList,image } from "react-native";
import Header from "../../components/Header";
import { GetCategoriesUseCase } from "../../../domain/usecases/categories/GetCategoriesUseCase";
import { provideCategoryRepository } from "../../../data/repositories/categories/ProvideCategoryRepository";
import CategoryCard from "../../components/CategoryCard/CategoryCard";
import VerticalPlaceCard from "../../components/VerticalPlaceCard/VerticalPlaceCard";

const categoryCardItem = ({item}) => (
  <CategoryCard nameCategory={item.name} iconCategory={item.icon} isSelectedCategory={false} onPressCard={handlePressCategory}  />
);

const PlaceCard = ({item}) => (
  <VerticalPlaceCard NameCard={item.name1} ImagenPlaceCard={item.image}  />
);
const handlePressCategory = (nameCategoryParam) => {
  console.log("Categoría seleccionada:", nameCategoryParam);
};

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
      <Header/>
        <FlatList
          data={categories}
          horizontal
          style={{ height: 120 }} // altura fija para que no ocupe todo
          renderItem={categoryCardItem}
          keyExtractor={item => item.id}/>

        <FlatList
          data={categories}
          horizontal
          style={{ height: 200 }} // altura fija para que no ocupe todo
          renderItem={PlaceCard}
          keyExtractor={item => item.id}/>
    
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding:10,
    flex:1,
    backgroundColor: "#FFFFFF",
  },
});

export default CategoriesScreen;
