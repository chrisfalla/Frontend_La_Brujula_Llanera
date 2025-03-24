import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const CategoriasScreen = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Pantalla de Categorías</Text>
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

export default CategoriasScreen;
