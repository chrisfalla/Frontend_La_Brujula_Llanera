import React from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';

const Gallery = ({ images }) => {
    return (
        <View style={styles.container}>
            {images && images.map((image, index) => (
                <View key={index} style={styles.imageContainer}>
                    <Image 
                        source={{ uri: image }} 
                        style={styles.image} 
                        resizeMode="cover"
                    />
                    {index === images.length - 1 && (
                        <View style={styles.overlay}>
                            <Text style={styles.overlayText}>+10</Text>
                        </View>
                    )}
                </View>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        height: 120,
        padding: 10,
    },
    imageContainer: {
        flex: 1,
        marginHorizontal: 5,
        position: 'relative',
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 10,
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    },
    overlayText: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
    },
});

export default Gallery;