import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import Header from '../../components/Header';

const HomeScreen = () => {
    useEffect(() => {

    }, []);
    return (
        <View style={styles.container}>
            <Header />
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={styles.textScreens}>
                    <Text>
                        <Text style={styles.colorPrimary}>Recomendados</Text>
                        <Text style={styles.normalText}> de la Semana</Text>
                    </Text>
                </View>

                <View style={styles.body}>
                    <Text style={styles.title}>Bienvenido a la Brújula Llanera</Text>
                    <Image source={require('../../../shared/assets/AvatarHeader.png')} />
                    <Text style={styles.subtitle}>Descubre los mejores lugares del llano</Text>
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    scrollContent: {
        flexGrow: 1,
        paddingBottom: 20,
    },
    textScreens: {
        padding: 10,
        alignItems: 'center',
        marginBottom: 10,
    },
    colorPrimary: {
        fontSize: 22,
        fontWeight: '900',
        color: '#236A34',
    },
    normalText: {
        fontSize: 22,
        fontWeight: '900',
        color: '#000',
    },
    body: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    subtitle: {
        marginTop: 20,
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
        marginBottom: 30,
    }
});

export default HomeScreen;