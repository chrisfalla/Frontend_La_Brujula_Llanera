import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, GlobalStyles } from '../../styles/styles';

const Rating = ({ average = 0, size = 14, color = Colors.ColorPrimary, useBackground = true, style }) => {
  // Asegurar que el rating esté entre 0 y 5
  const safeRating = Math.min(Math.max(0, average || 0), 5);
  
  // Redondear a 0.5 más cercano
  const roundedRating = Math.round(safeRating * 2) / 2;
  
  // Generar el array de estrellas
  const stars = [];
  
  for (let i = 1; i <= 5; i++) {
    if (i <= roundedRating) {
      // Estrella completa
      stars.push(
        <Ionicons 
          key={`star-${i}`} 
          name="star" 
          size={size} 
          color={color} 
          style={styles.star}
        />
      );
    } else if (i - 0.5 === roundedRating) {
      // Media estrella
      stars.push(
        <Ionicons 
          key={`star-half-${i}`} 
          name="star-half" 
          size={size} 
          color={color} 
          style={styles.star}
        />
      );
    } else {
      // Estrella vacía
      stars.push(
        <Ionicons 
          key={`star-outline-${i}`} 
          name="star-outline" 
          size={size} 
          color={color} 
          style={styles.star}
        />
      );
    }
  }
  
  return (
    <View style={[
      styles.container, 
      useBackground && styles.backgroundContainer,
      style
    ]}>
      {stars}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backgroundContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 10,
  },
  star: {
    marginRight: 2,
  },
});

export default Rating;
