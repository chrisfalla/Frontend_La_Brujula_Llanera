import React from 'react';
import { View, StyleSheet, Image, Text, useWindowDimensions } from 'react-native';

const Header = () => {
    const { width } = useWindowDimensions(); // Obtener el ancho de la pantalla dinámicamente

    return (
        <View style={styles.header}>
            <Image source={require('../../shared/assets/CompassLogo.png')} style={styles.compass} />
            <View style={styles.containertitle}>
                <Text
                    style={[
                        styles.title3,
                        {
                            fontSize: (width / 375) * 22, // Tamaño más grande, ajustado según el ancho
                            lineHeight: (width / 375) * 30// Ajustar la altura de línea proporcionalmente
                        },
                    ]}
                    numberOfLines={1} // Asegurar que el texto esté en una sola línea
                >
                    LA BRÚJULA <Text style={styles.title4}>LLANERA</Text>
                </Text>
            </View>
            <Image source={require('../../shared/assets/AvatarHeader.png')} style={styles.avatar} />
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between', // Mantener imágenes en los extremos
        alignItems: 'center', // Centrado vertical
        padding: 5,
        paddingTop: 35,
        backgroundColor: '#fff',
        width: '100%',
    },
    compass: {
        width: 50,
        height: 50,
        marginBottom: 0,
        resizeMode: 'contain',
    },
    containertitle: {
        flex: 1, // El título ocupa el espacio disponible
        alignItems: 'center', // Centrado horizontal
        marginHorizontal: 10,
    },
    title3: {
        fontWeight: '900',
        textAlign: 'center',
    },
    title4: {
        fontWeight: '900',
        color: '#236A34',
    },
    avatar: {
        width: 50,
        height: 50,
        marginBottom: 0,
        resizeMode: 'contain',
    },
});

export default Header;