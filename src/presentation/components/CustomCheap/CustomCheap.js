import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Colors, GlobalStyles, TextStyles } from '../../../presentation/styles/styles';

const CustomCheap = ({ label, selected, onPress }) => {
  return (
    <View style={styles.containerFather}>
      <TouchableOpacity
        style={[
          styles.tag,
          selected ? styles.tagSelected : styles.tagUnselected,
          GlobalStyles.CardBaseStyle, // Aplicamos el estilo global con sombra
        ]}
        onPress={onPress}
      >
        <Text style={[styles.text, selected ? styles.textSelected : styles.textUnselected]}>
          {label}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  containerFather: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  tag: {
    paddingVertical: 0,
    paddingHorizontal: 16,
    marginRight: 8,
    marginBottom: 10,
    borderWidth: 1,
    // Aseguramos un fondo opaco para la sombra
    backgroundColor: Colors.BackgroundPage, // Fondo consistente con el global
    // Propiedades de sombra para iOS
    shadowColor: Colors.Black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  tagUnselected: {
    borderColor: Colors.Black,
  },
  tagSelected: {
    borderColor: Colors.ColorPrimary,
  },
  text: {
    ...TextStyles.PoppinsRegular13,
    paddingTop: 2,
  },
  textUnselected: {
    color: Colors.Black,
  },
  textSelected: {
    color: Colors.ColorPrimary,
  },
});

export default CustomCheap;