import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Logo from '../components/logo_perfil'; // Verifica que esta ruta sea correcta

const HomeScreen = () => {
    return (
        <View style={{ flex: 1 }}>
            <View style={{ flex: 1 }}>
                <View style={styles.container}>
                    <Text style={styles.title}>Bienvenido a mi App</Text>
                    <Logo />
                    <Text style={styles.subtitle}>Este es el logo de la app</Text>
                </View>
            </View>
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
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    subtitle: {
        marginTop: 20,
        fontSize: 16,
        color: '#666',
    },
});

export default HomeScreen;