import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { GlobalStyles } from '../../styles/styles';


const Rating = ({ average = 0, useBackground = true, size = 28 }) => {
    // Añadimos la prop size para controlar el tamaño de las estrellas
    const stars = [];
    // Usamos un color más amarillo/dorado que coincide mejor con la imagen de referencia
    const starColor = "#F3F02B"; 
    
    for (let i = 1; i <= 5; i++) {
        if (average >= i) {
            stars.push(<Ionicons key={i} name="star" size={size} color={starColor} />);
        } else if (average >= i - 0.5) {
            stars.push(<Ionicons key={i} name="star-half" size={size} color={starColor} />);
        } else {
            stars.push(<Ionicons key={i} name="star-outline" size={size} color={starColor} />);
        }
    }
    return (
        <View style={[styles.container, useBackground && styles.showcolor]}>
            {stars}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
       flexDirection:'row',
       alignItems:'center',
       alignSelf: 'center',
       marginBottom: 0, // Eliminamos el margen inferior para mayor control en contenedores
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
        elevation: GlobalStyles.elevation,
      },
});

export default Rating;
