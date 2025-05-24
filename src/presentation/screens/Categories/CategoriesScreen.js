import React, { useState } from "react";
import { View, StyleSheet, StatusBar } from "react-native";
import CustomSearch from "../../components/Search/Search";

const CategoriesScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <View style={styles.container}>
      
      <StatusBar
        barStyle="dark-content" // Para iconos oscuros en fondo claro
        backgroundColor="#ffffff" // Fondo blanco para Android
        translucent={false} // No translúcido para evitar superposiciones
      />
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