import React, { useEffect, useState } from "react";
import { View, FlatList, StyleSheet, Text, TouchableOpacity,  } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { CategoryMockApi } from "../../../data/datasources/categories/CategoryMockApi";

const categoryApi = new CategoryMockApi();

const CategoryIcon = ({ShowText,limit = 4 }) => {
  const [categories, setCategories] = useState([]);
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    categoryApi.fetchCategories().then((data) => {
      // Solo tomar los primeros 4
      setCategories(data.slice(0, limit));
    });
  }, [limit]);
  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
    <TouchableOpacity
      onPress={() =>  setSelectedId(item.id)}
      style={[
        styles.categoryItem,
        selectedId === item.id && styles.categoryItemSelected,
        ]}>
          

      <Ionicons
        name={item.icon}
        size={24}
        style={{ transform:[{scale: selectedId === item.id ? 1.5 : 1}] }}
      />
    </TouchableOpacity>
    
    {ShowText && (<Text style={[styles.categoryText,
      selectedId === item.id && styles.selectedText]}>
        {item.name.length > 7 ? `${item.name.substring(0, 7)}...` : item.name}</Text> )}
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
  itemContainer: {
    alignItems: 'center',  
  },

  container: {
    width: "100%",
    marginVertical: 10,
  },

  categoryItem: {
    width: 75,
    flexDirection: "column",
    alignItems: "center",
    padding: 26,
    marginHorizontal: 10,
    borderRadius: 10,
    backgroundColor: "#E0E0E0",
  },
  categoryItemSelected: {
    backgroundColor: "#61CB7C",
    elevation: 15,
  },
  categoryText: {
    marginTop: 8,
    textAlign: 'center',
    fontSize: 13,
  },

  disabledItem: {
    opacity: 0.5,
  },
});

export default CategoryIcon;
  

 