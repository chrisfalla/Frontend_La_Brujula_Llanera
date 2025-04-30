import React, { useEffect, useState } from "react";
import { View, FlatList, StyleSheet, Text, TouchableOpacity,  } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { CategoryMockApi } from "../../../data/datasources/categories/CategoryMockApi";

const categoryApi = new CategoryMockApi();

const CategoryIcon = () => {
  const [categories, setCategories] = useState([]);
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    categoryApi.fetchCategories().then((data) => {
      // Solo tomar los primeros 4
      setCategories(data.slice(0, 4));
    });
  }, []);

  const handleSelect = (id) => {
    setSelectedId(id);
  };

  const renderItem = ({ item }) => (
    <View style={[styles.itemContainer, ]}>
      <TouchableOpacity
        onPress={() => handleSelect(item.id)}
        style={[
          styles.categoryItem,
          {backgroundColor: selectedId === item.id ? "#61CB7C" : "#E0E0E0",},]}>
          
        <View
          style={[
            styles.iconWrapper,
            { transform: [{ scale: selectedId === item.id ? 1.5 : 1 }] },]}>
          {item.icon}
        </View>
      </TouchableOpacity>
      <Text style={styles.categoryName}>
  {item.name.length > 7 ? `${item.name.substring(0, 7)}...` : item.name}
</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={categories}
        horizontal
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  categoryItem: {
    flexDirection: "column",
    alignItems: "center",
    padding: 25,
    marginHorizontal: 10,
    borderRadius: 10,
  },
  iconWrapper: {
    marginBottom: 5,
  },
  categoryName: {
    textAlign: "center",
    fontSize: 16,
  },
  itemContainer: {
    alignItems: "center",
  },
});

export default CategoryIcon;
