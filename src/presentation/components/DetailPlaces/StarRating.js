import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const StarRating = ({ average = 0 }) => {
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
        <View style={styles.container}>
            {stars}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderRadius: 16,
        paddingHorizontal: 18,
        paddingVertical: 6,
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: -22,
        marginBottom: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
        elevation: 2,
    },
});

export default StarRating;
