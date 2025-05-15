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
    backgroundColor: Colors.BackgroundPage,
  },
  tagUnselected: {
    borderColor: Colors.Black,
    // Sin sombra
    shadowColor: 'transparent',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },
  tagSelected: {
    borderColor: Colors.ColorPrimary,
    // Sombra solo si está seleccionado
    shadowColor: Colors.Black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
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