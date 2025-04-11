import React, { useState } from 'react';
import { StyleSheet, View, Text, FlatList, Alert } from 'react-native';
import Card from '../components/Dashboard/Card';
import Button from '../components/Dashboard/Button';

const DashboardScreen = () => {
    const [places, setPlaces] = useState([
        {
            id: '1',
            name: 'Parque Principal',
            visitors: 120,
            location: 'Yopal',
            comments: ['Hermoso lugar', 'Muy limpio y organizado'],
        },
        {
            id: '2',
            name: 'Mirador de la Virgen',
            visitors: 80,
            location: 'Manare',
            comments: ['Vista espectacular', 'Ideal para fotos'],
        },
        {
            id: '3',
            name: 'Parque La Iguana',
            visitors: 150,
            location: 'Yopal',
            comments: ['Perfecto para paseos familiares', 'Muy tranquilo'],
        },
    ]);

    const addPlace = () => {
        const newPlace = {
            id: (places.length + 1).toString(),
            name: `Nuevo Lugar ${places.length + 1}`,
            visitors: 0,
            location: 'Ubicación desconocida',
            comments: [],
        };
        setPlaces([...places, newPlace]);
        Alert.alert('Lugar añadido', `Se añadió "${newPlace.name}" correctamente.`);
    };

    const deletePlace = (id) => {
        setPlaces(places.filter((place) => place.id !== id));
        Alert.alert('Lugar eliminado', 'El lugar fue eliminado correctamente.');
    };

    const updatePlace = (id) => {
        const updatedPlaces = places.map((place) =>
            place.id === id ? { ...place, name: `${place.name} (Actualizado)` } : place
        );
        setPlaces(updatedPlaces);
        Alert.alert('Lugar actualizado', 'El lugar fue actualizado correctamente.');
    };

    const renderPlace = ({ item }) => (
        <View style={styles.placeContainer}>
            <Text style={styles.placeName}>{item.name}</Text>
            <Text style={styles.placeDetails}>Visitantes: {item.visitors}</Text>
            <Text style={styles.placeDetails}>Ubicación: {item.location}</Text>
            <Text style={styles.commentsTitle}>Comentarios:</Text>
            {item.comments.length > 0 ? (
                item.comments.map((comment, index) => (
                    <Text key={index} style={styles.comment}>
                        - {comment}
                    </Text>
                ))
            ) : (
                <Text style={styles.noComments}>Sin comentarios</Text>
            )}
            <View style={styles.placeActions}>
                <Button title="Actualizar" onPress={() => updatePlace(item.id)} color="#3498DB" />
                <Button title="Eliminar" onPress={() => deletePlace(item.id)} color="#FF5733" />
            </View>
        </View>
    );

    return (
        <FlatList
            data={places}
            keyExtractor={(item) => item.id}
            ListHeaderComponent={
                <View style={styles.container}>
                    {/* Estadísticas */}
                    <View style={styles.statsContainer}>
                        <Card title="Lugares Registrados" value={places.length} iconName="location" color="#236A34" />
                        <Card
                            title="Visitantes Totales"
                            value={places.reduce((sum, p) => sum + p.visitors, 0)}
                            iconName="people"
                            color="#FF5733"
                        />
                        <Card title="Lugar Más Popular" value="Parque La Iguana" iconName="star" color="#3498DB" />
                    </View>

                    {/* Botones de acción */}
                    <Button title="Añadir Lugar" onPress={addPlace} color="#236A34" />
                    <Text style={styles.sectionTitle}>Lugares Registrados</Text>
                </View>
            }
            renderItem={renderPlace}
            contentContainerStyle={styles.listContainer}
        />
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#f9f9f9',
    },
    statsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginVertical: 10,
        color: '#333',
    },
    listContainer: {
        paddingBottom: 20,
    },
    placeContainer: {
        padding: 15,
        backgroundColor: '#fff',
        borderRadius: 10,
        marginBottom: 15,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
    placeName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#236A34',
    },
    placeDetails: {
        fontSize: 14,
        color: '#666',
        marginVertical: 2,
    },
    commentsTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        marginTop: 10,
        color: '#333',
    },
    comment: {
        fontSize: 13,
        color: '#555',
        marginLeft: 10,
    },
    noComments: {
        fontSize: 13,
        color: '#999',
        marginLeft: 10,
    },
    placeActions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
});

export default DashboardScreen;
