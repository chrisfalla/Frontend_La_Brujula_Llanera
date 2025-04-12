import 'react-native-reanimated'; // Correcto
import 'react-native-gesture-handler';
import React from 'react';
import { View, StyleSheet } from 'react-native';
import AppNavigation from './src/presentation/navigation/AppNavigation'; // Asegúrate de que la ruta sea correcta

const App = () => {
    return (
        <View style={styles.container}>
            <AppNavigation />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff', // Asegúrate de que el fondo sea blanco
    },
});

export default App;
