import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  Alert,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import NavigationTopBar from "../../components/NavigationTopBar/NavigationTopBar";
import CustomSearch from "../../components/Search/Search";
import HorizontalCardPlace from "../../components/HorizontalCardPlace/HorizontalCardPlace";
import { GlobalStyles, Colors, TextStyles } from "../../styles/styles";
import { Ionicons } from "@expo/vector-icons";

const DashboardScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="#ffffff"
        translucent={false}
      />
      <View style={styles.headerTopBar}>
        <NavigationTopBar
          title={"Panel de Gestión"}
          useBackground={false}
          SecondIcon={false}
          onBackPress={() => navigation.goBack()}
          onSecondIconPress={() => navigation.navigate("PlaceRegisterScreen")}
        />
        <View style={styles.searchRow}>
          <CustomSearch
            style={styles.searchInput}
            placeholder={"Buscar sitio..."}
          />
          <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate("PlaceRegisterScreen")}>
            <Ionicons name="add" size={24} color={Colors.LightGray} style={styles.addIcon} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.cardcontainer}>
      <HorizontalCardPlace
        style={styles.card}
        name={"Nombre del lugar"}
        category="Categoría del lugar"
        address="Dirección del lugar"
        image="https://via.placeholder.com/150"
        onMapPress={() => console.log("Mapa presionado")}
        onDetailPress={() => navigation.navigate("PlaceRegisterScreen")}
        detailIconName="pencil-alt"
        mapIconName="trash-alt"
        onSecondIconPress={() => navigation.navigate("PlaceRegisterScreen")}
      />

      <Text style={styles.sectionTitle}>Estadísticas</Text>
      <View style={styles.sectionStatsContainer}>
        <Text style={styles.sectionStats}>Los Más visitados</Text>
        <Text style={styles.sectionStats}>Con más comentarios</Text>
        <Text style={styles.sectionStats}>Los de mejor valoración</Text>
      </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 0,
    flex: 1,
    backgroundColor: Colors.BackgroundPage,
  },
  headerTopBar: {
    marginTop: 0,
   
  },
  cardcontainer: {
    paddingHorizontal: 20,
  },
  sectionTitle: {
    ...TextStyles.PoppinsSemibold20,
    color: Colors.ColorPrimary,
    textAlign: "center",
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
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center', // centra horizontalmente
   
   
  },
  searchInput: {
     width: "85%",
    
  },
 
  iconButton: {
    width: 30,
    height: 30,
    backgroundColor: Colors.ColorPrimary,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 10,
  },
});

export default DashboardScreen;
