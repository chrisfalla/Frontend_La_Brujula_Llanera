import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { GlobalStyles, TextStyles, Colors } from '../../styles/styles';

const MostVisitedPlaces = ({ place, onPress }) => {
    return (
        <TouchableOpacity style={styles.card} onPress={() => onPress(place)}>
            <Image source={{ uri: place.imageUrl }} style={styles.image} resizeMode="cover" />

            <View style={styles.labelContainer}>
                <Text style={styles.labelText}>{place.placeName}</Text>
            </View>

            <View style={styles.button}>
                <Text style={styles.buttonText}>Ver más</Text>
            </View>
        </TouchableOpacity>
    );
};

MostVisitedPlaces.propTypes = {
    place: PropTypes.shape({
        idPlace: PropTypes.number.isRequired,
        placeName: PropTypes.string.isRequired,
        imageUrl: PropTypes.string.isRequired,
    }).isRequired,
    onPress: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
    card: {
        ...GlobalStyles.borderRadius,
        ...GlobalStyles.elevation,
        width: 350,
        height: 200,
        borderColor: '#fff',
        borderWidth: 3,
        marginRight: 10,
        overflow: 'hidden',
    },
    image: {
        width: '100%',
        height: '100%',
    },
    labelContainer: {
        position: 'absolute',
        top: 16,
        left: 0,
        backgroundColor: Colors.ColorPrimary,
        borderTopRightRadius: 12,
        borderBottomRightRadius: 12,
        paddingHorizontal: 16,
        paddingVertical: 6,
        maxWidth: '80%',
        height: 40,
        justifyContent: 'center',
    },
    labelText: {
        ...TextStyles.PoppinsSemiBold15,
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    button: {
        position: 'absolute',
        bottom: 16,
        alignSelf: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        borderRadius: 8,
        paddingVertical: 0,
        width: '30%',
        height: '13%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        ...TextStyles.PoppinsSemibold13,
        color: '#fff',
        fontSize: 14,
        fontWeight: '600',
        textAlign: 'center',
    },
});

export default MostVisitedPlaces;
