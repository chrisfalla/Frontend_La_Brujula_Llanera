import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { GlobalStyles, TextStyles } from "../../styles/styles";
import NavigationTopBar from "../../components/NavigationTopBar/NavigationTopBar";
import { useNavigation } from "@react-navigation/native";
import CustomInputText from "../../components/CustomInput/CustomInputText";

const SearchScreen = () => {
  const navigation = useNavigation();
  const [searchValue, setSearchValue] = useState('');

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
      <View style={styles.topBarContainer}>
        <NavigationTopBar
          title="Busqueda"
          onBackPress={handleBackPress}
          showSecondIcon={false}
          removeBackground={true}
        />
      </View>
      
      {/* Campo de búsqueda */}
      <View style={styles.searchInputContainer}>
        <CustomInputText
          LabelText="Escriba la categoría, servicio, tipo de  servicio."
          PlaceholderText="Buscar..."
          value={searchValue}
          onChangeText={handleSearch}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    ...GlobalStyles.ScreenBaseStyle,
  },
  topBarContainer: {
    marginTop: "10%",
    paddingHorizontal: 0,
    marginBottom: "6%",
  },
  searchInputContainer: {
    ...TextStyles.PoppinsRegular15,
  },
});

export default SearchScreen;
