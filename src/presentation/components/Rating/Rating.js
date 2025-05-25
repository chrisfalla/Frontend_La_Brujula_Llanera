import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../styles/styles';

const Rating = ({ average = 0, useBackground = true, size = 14 }) => {
  // Asegurar que average sea un número y esté en el rango adecuado
  const safeAverage = typeof average === 'number' ? Math.min(Math.max(0, average), 5) : 0;
  
  // Redondear a 0.5 más cercano para las medias estrellas
  const roundedAverage = Math.round(safeAverage * 2) / 2;
  
  const fullStars = Math.floor(roundedAverage);
  const halfStar = roundedAverage % 1 !== 0;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
  
  const stars = [];
  
  // Estrellas completas
  for (let i = 0; i < fullStars; i++) {
    stars.push(
      <Ionicons 
        key={`full-${i}`} 
        name="star" 
        size={size} 
        color={Colors.ColorPrimary} 
        style={styles.star}
      />
    );
  }
  
  // Media estrella (si corresponde)
  if (halfStar) {
    stars.push(
      <Ionicons 
        key="half" 
        name="star-half" 
        size={size} 
        color={Colors.ColorPrimary} 
        style={styles.star}
      />
    );
  }
  
  // Estrellas vacías
  for (let i = 0; i < emptyStars; i++) {
    stars.push(
      <Ionicons 
        key={`empty-${i}`} 
        name="star-outline" 
        size={size} 
        color={Colors.ColorPrimary} 
        style={styles.star}
      />
    );
  }
  
  return (
    <View style={[
      styles.container, 
      useBackground ? styles.withBackground : null
    ]}>
      {stars}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  withBackground: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 4,
    paddingHorizontal: 4,
    paddingVertical: 2,
  },
  star: {
    marginHorizontal: 1,
  }
});

export default Rating;
