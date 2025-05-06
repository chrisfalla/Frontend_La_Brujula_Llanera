import React from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';
import NavigationTopBar from '../NavigationTopBar/NavigationTopBar';

const ImageMainDetail = ({ mainImage, name, category, onBackPress }) => {
    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <ImageBackground 
                    source={{ uri: mainImage }} 
                    style={styles.mainImage}
                    resizeMode="cover"
                    imageStyle={styles.imageStyle}
                >
                    <View style={styles.contentContainer}>
                        <NavigationTopBar 
                            onBackPress={onBackPress}
                            useBackground={false}
                            useHeart={true}
                        />
                        <View style={styles.infoContainer}>
                            <Text style={styles.name}>{name}</Text>
                            <Text style={styles.category}>{category}</Text>
                        </View>
                    </View>
                </ImageBackground>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    imageContainer: {
        width: '92%', 
        aspectRatio: 370/430,
        borderRadius: 10, // Agregamos borderRadius al contenedor
        overflow: 'hidden', // Necesario para que se vea el borderRadius
        marginTop: '12.5%',
    },
    mainImage: {
        width: '100%',
        height: '100%',
    },
    imageStyle: {
        borderRadius: 10, // Agregamos borderRadius a la imagen
    },
    contentContainer: {
        flex: 1,
        justifyContent: 'space-between',
        borderRadius: 10, // Agregamos borderRadius al overlay
        overflow: 'hidden',
    },
    infoContainer: {
        padding: 10,
        paddingBottom: 16,
        paddingLeft: 15,
        backgroundColor: 'rgba(0, 0, 0, 0.69)', 
    },
    name: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 5,
    },
    category: {
        fontSize: 14,
        color: '#fff',
        opacity: 0.9,    },
});

export default ImageMainDetail;
