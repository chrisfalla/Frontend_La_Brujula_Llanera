import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';


const Rating = ({ average = 0, useBackground = true }) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
        if (average >= i) {
            stars.push(<Ionicons key={i} name="star" size={28} color="#FFEB3B" />);
        } else if (average >= i - 0.5) {
            stars.push(<Ionicons key={i} name="star-half" size={28} color="#FFEB3B" />);
        } else {
            stars.push(<Ionicons key={i} name="star-outline" size={28} color="#FFEB3B" />);
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
       marginBottom: 8,
    },
    showcolor: {
        backgroundColor: '#F9FAFE',
        borderRadius: 7,
        paddingHorizontal: 18,
        paddingVertical: 6,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
        elevation: 2,
      },
});

export default Rating;
