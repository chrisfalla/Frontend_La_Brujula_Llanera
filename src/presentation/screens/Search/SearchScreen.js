import React, { useState } from "react";
import { View, StyleSheet, StatusBar } from "react-native";
import { GlobalStyles, TextStyles } from "../../styles/styles";
import NavigationTopBar from "../../components/NavigationTopBar/NavigationTopBar";
import { useNavigation } from "@react-navigation/native";
import CustomSearch from "../../components/Search/Search";
import HorizontalCardPlace from "../../components/HorizontalCardPLace/HorizontalCardPlace";
import { Colors  } from "../../styles/styles";

const SearchScreen = () => {
  const navigation = useNavigation();
  const [searchValue, setSearchValue] = useState("");

  const handleBackPress = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    }
    console.log("Back pressed");
  };

  const handleSearch = (text) => {
    setSearchValue(text);
    // Aquí implementarías la lógica de búsqueda
  };

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="dark-content" // Para iconos oscuros en fondo claro
        backgroundColor="#ffffff" // Fondo blanco para Android
        translucent={false}
      />
      <View style={styles.containerSearch}>
        <NavigationTopBar 
          primaryIcon="chevron-back"
          onBackPress={handleBackPress}
          navigation={navigation}
          useBackground={false}
          SecondIcon={false}
          title={"Búsqueda"}
        />
        <CustomSearch
          value={searchValue}
          onChangeText={handleSearch}
          placeholder="Buscar..."
        />
      </View>
      <View style={styles.resultsContainer}>
        <HorizontalCardPlace
          title="Resultado de búsqueda"
          description="Descripción del lugar"
          imageUrl="https://via.placeholder.com/150"
          onPress={() => console.log("Card pressed")}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.BackgroundPage,
    paddingVertical: 10,
    
  },
  containerSearch: {
    marginTop: 12,
    marginBottom: 50,
    position: 'static'
  },
  resultsContainer: {
    flex: 1,
    paddingHorizontal: 16,
    
  },
});

export default SearchScreen;
