import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const MapaScreen = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Pantalla de Mapa</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
    },
});

export default MapaScreen;
