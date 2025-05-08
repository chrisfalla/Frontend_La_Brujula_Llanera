import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';
import PropTypes from 'prop-types';

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
        width: Dimensions.get('window').width * 0.9,
        height: Dimensions.get('window').width * 0.5,
        marginHorizontal: Dimensions.get('window').width * 0.05,
        marginBottom: 10,
        borderRadius: 12,
        shadowColor: '#000000',
        shadowOffset: {
            width: 2,
            height: 8,
        },
        shadowOpacity: 0.45,
        shadowRadius: 6,
        elevation: 5,
        overflow: 'hidden',
        borderColor: '#fff',
        borderWidth: 3,
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 8,
        margin: 'auto'
    },
    labelContainer: {
        position: 'absolute',
        top: 16,
        left: 0,
        backgroundColor: '#236A34',
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
        color: '#fff',
        fontSize: 14,
        fontWeight: '600',
        textAlign: 'center',
        textAlignVertical: 'center',
        marginBottom: 2,
    },
});

export default MostVisitedPlace;