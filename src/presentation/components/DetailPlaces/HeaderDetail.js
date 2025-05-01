import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import NavigationTopBar from '../NavigationTopBar/NavigationTopBar';

const HeaderDetail = ({ mainImage, name, category, onBackPress }) => {
    return (
        <View style={styles.container}>
            <Image 
                source={{ uri: mainImage }} 
                style={styles.mainImage}
            />
            <View style={styles.overlay}>
                <NavigationTopBar 
                    onBackPress={onBackPress}
                    useBackground={true}
                    useHeart={true}
                />
                <View style={styles.infoContainer}>
                    <Text style={styles.name}>{name}</Text>
                    <Text style={styles.category}>{category}</Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: 300,
        width: '100%',
        position: 'relative',
    },
    mainImage: {
        width: '100%',
        height: '100%',
        position: 'absolute',
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.3)',
        justifyContent: 'space-between',
    },
    infoContainer: {
        padding: 20,
        paddingBottom: 40,
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 5,
    },
    category: {
        fontSize: 16,
        color: '#fff',
        opacity: 0.9,
    },
});

export default HeaderDetail;