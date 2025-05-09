import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions, ActivityIndicator, FlatList } from 'react-native';
import PropTypes from 'prop-types';
import useMostVisitedPlaces from '../../hooks/places/useMostVisitedPlaces';

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
    container: {
        padding: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
});

export default MostVisitedPlaces;