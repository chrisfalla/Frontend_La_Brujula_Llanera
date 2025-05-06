import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import CustomSearch from "../../components/Search/Search";

const CategoriesScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <View style={styles.container}>
      <CustomSearch
        value={searchQuery}
        onChangeText={setSearchQuery}
        placeholder="Buscar categorías..."
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
});

export default CategoriesScreen;