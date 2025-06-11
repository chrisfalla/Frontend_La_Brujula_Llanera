import React, { useState } from "react";
import { StyleSheet, View, Text, FlatList, Alert } from "react-native";
import NavigationTopBar from "../../components/NavigationTopBar/NavigationTopBar";
import CustomSearch from "../../components/Search/Search";
import HorizontalCardPlace from "../../components/HorizontalCardPlace/HorizontalCardPlace";
import { GlobalStyles, Colors, TextStyles } from "../../styles/styles";

const DashboardScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <NavigationTopBar
        title={"Panel de Gestión"}
        useBackground={false}
        SecondIcon="add-circle"
        onBackPress={() => navigation.goBack()}
        onSecondIconPress={() => navigation.navigate("PlaceRegisterScreen")}
      />
      <CustomSearch placeholder={"Buscar sitio..."} />

      <View>
        <HorizontalCardPlace
          name={"Nombre del lugar"}
          category="Categoría del lugar"
          address="Dirección del lugar"
          image="https://via.placeholder.com/150"
          onMapPress={() => console.log("Mapa presionado")}
          onDetailPress={() => console.log("Detalles presionados")}
          detailIconName="pencil-alt"
          mapIconName="trash-alt"
           onSecondIconPress={() => navigation.navigate("PlaceRegisterScreen")}
        />

        <View style={styles.statsContainer}>
          <Text style={styles.sectionTitle}>Estadísticas</Text>
          <View style={styles.sectionStatsContainer}>
            <Text style={styles.sectionStats}>Los Más visitados</Text>
            <Text style={styles.sectionStats}>Con más comentarios</Text>
            <Text style={styles.sectionStats}>Los de mejor valoración</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
  },
  statsContainer: {
    marginTop: 20,
    padding: 16,
    backgroundColor: Colors.ColorWhite,
    alignItems: "center",
  },
  sectionTitle: {    
    ...TextStyles.PoppinsSemibold20,   
    color: Colors.ColorPrimary,
  },
  sectionStats: {
    marginTop: 10,
    
    ...TextStyles.PoppinsRegular15,
    color: Colors.DarkGray,
    marginBottom: 100,
  },
  sectionStatsContainer: {
    textAlign: "left",
    width: "100%",
  },

});

export default DashboardScreen;
