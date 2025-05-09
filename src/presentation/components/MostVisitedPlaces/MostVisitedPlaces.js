import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';
import PropTypes from 'prop-types';
import { GlobalStyles, TextStyles,Colors } from '../../styles/styles';

const MostVisitedPlace = ({ place, onPlacePress }) => {
    return (
        <View style={styles.card}>
            <Image
                source={{
                    uri: place.imageUrl || 'https://via.placeholder.com/400x200'
                }}
                style={styles.image}
                resizeMode="cover"
            />
            <View style={styles.labelContainer}>
                <Text style={styles.labelText}>{place.name}</Text>
            </View>
            <TouchableOpacity
                style={styles.button}
                onPress={() => onPlacePress(place)}
                activeOpacity={0.8}
            >
                <Text style={styles.buttonText}>Ver más</Text>
            </TouchableOpacity>
        </View>
    );
};

MostVisitedPlace.propTypes = {
    place: PropTypes.shape({
        idPlace: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        imageUrl: PropTypes.string,
    }).isRequired,
    onPlacePress: PropTypes.func.isRequired
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
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 10,
        margin: 'auto'
    },
    labelContainer: {
        position: 'absolute',
        top: 16,
        left: 0,
        backgroundColor: Colors.ColorPrimary,
        borderTopRightRadius: 12,
        borderBottomRightRadius: 12,
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0,
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
        textAlignVertical: 'center',
        marginBottom: 2,
    },
});

export default MostVisitedPlace;