import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions, ActivityIndicator, FlatList } from 'react-native';
import PropTypes from 'prop-types';
import { GlobalStyles, TextStyles,Colors } from '../../styles/styles';

const MostVisitedPlaces = () => {
    const { places, loading, error } = useMostVisitedPlaces();

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    if (error) {
        return <Text>Error al cargar lugares: {error}</Text>;
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Lugares Más Visitados</Text>
            <FlatList
                data={places}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <MostVisitedPlace
                        place={item}
                        onPlacePress={(place) => console.log('Ver más sobre:', place.name)}
                    />
                )}
            />
        </View>
    );
};

MostVisitedPlaces.propTypes = {
    places: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired,
    error: PropTypes.string,
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

export default MostVisitedPlaces;