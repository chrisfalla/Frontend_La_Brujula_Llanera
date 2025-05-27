import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import {Ionicons } from '@expo/vector-icons';
import { GlobalStyles, Colors, TextStyles } from "../../styles/styles";

const CategorieCardBig = ({ nameCategory, iconCategory, onPress }) => {
  return (
    // creacion del componente basico sin logica backend
    <View style={styles.container}>
      <TouchableOpacity onPress={onPress} style={styles.card}>
        <View style={styles.iconContainer}>
          <Ionicons name={iconCategory} size={24} color={Colors.ColorPrimary} />
        </View>
        <Text style={styles.title}>{nameCategory}</Text>
        <Ionicons name="caret-forward" size={24} color={Colors.ColorPrimary} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {        
        padding: 20,              // padding horizontal para el contenedor
        paddingVertical: 10,      // padding vertical para el contenedor
    },
  

  card: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',   
    height: 48,
    borderRadius: 10,
    borderWidth: 1.3,
    borderColor: Colors.ColorPrimary,
    paddingHorizontal: 15,              

  },
  iconContainer: {
    marginRight: 8,
    color: Colors.ColorPrimary,                    
  },
  title: {
    ...TextStyles.PoppinsRegular15,
    
    flex: 1,                            
    textAlign: 'left',
  },
});

export default CategorieCardBig;