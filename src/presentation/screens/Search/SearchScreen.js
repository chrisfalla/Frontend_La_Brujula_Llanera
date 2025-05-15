import React from "react";
import { View, StyleSheet } from "react-native";
import { GlobalStyles } from "../../styles/styles";
import NavigationTopBar from "../../components/NavigationTopBar/NavigationTopBar";
import { useNavigation } from "@react-navigation/native";

const SearchScreen = () => {
  const navigation = useNavigation();

  const handleBackPress = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    }
    console.log("Back pressed");
  };

  return (
    <View style={styles.container}>
      <View style={styles.topBarContainer}>
        <NavigationTopBar
          title="Busqueda"
          onBackPress={handleBackPress}
          showSecondIcon={false} // No necesitamos un icono a la derecha
          removeBackground={true}
        />
      </View>
      {/* El resto de la pantalla de búsqueda puede ir aquí si es necesario */}
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
    paddingHorizontal: 0, // Reducimos el padding horizontal para acercar los iconos a los bordes
    marginBottom: "10%",
  },
});

export default SearchScreen;
