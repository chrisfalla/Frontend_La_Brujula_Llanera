import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native'; // Importamos TouchableOpacity para hacer las estrellas tocables
import { Ionicons } from '@expo/vector-icons';

const Rating = ({ average = 0, onChange = null, useBackground = true, size = 28 }) => {
  const stars = [];
  const starColor = "gold";

  // Función para manejar el toque en una estrella
  const handlePress = (i) => {
    if (onChange) {            // Solo llama onChange si se ha pasado como prop
      onChange(i);             // Envía la estrella tocada al componente padre
    }
  };

  for (let i = 1; i <= 5; i++) {
    let iconName;

    // Lógica igual que antes para decidir qué tipo de estrella mostrar
    if (average >= i) {
      iconName = "star";
    } else if (average >= i - 0.5) {
      iconName = "star-half";
    } else {
      iconName = "star-outline";
    }

    // Aquí está el cambio clave: 
    // Si hay onChange, la estrella se envuelve en TouchableOpacity para hacerla interactiva
    stars.push(
      onChange ? (
        <TouchableOpacity 
          key={i} 
          onPress={() => handlePress(i)}  // Al presionar, se ejecuta handlePress
          activeOpacity={0.7}             // Efecto visual al presionar
        >
          <Ionicons name={iconName} size={size} color={starColor} />
        </TouchableOpacity>
      ) : (
        // Si no hay onChange, solo muestra el icono sin interacción
        <Ionicons key={i} name={iconName} size={size} color={starColor} />
      )
    );
  }

  return (
    <View style={[styles.container, useBackground && styles.showcolor]}>
      {stars}  {/* Renderiza todas las estrellas (interactivas o no) */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection:'row',
    alignItems:'center',
    alignSelf: 'center',
    marginBottom: 0,
  },
  showcolor: {
    backgroundColor: '#F9FAFE',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 3,  // Elevación para sombra en Android
  },
});

export default Rating;
