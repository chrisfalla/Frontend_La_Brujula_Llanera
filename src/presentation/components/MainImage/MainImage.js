import React from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';
import NavigationTopBar from '../NavigationTopBar/NavigationTopBar';
import { TextStyles, Colors,  } from '../../styles/styles';

const MainImage = ({ mainImage, name, category, onBackPress, placeId }) => {
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
                            useBackground={true}
                            useHeart={true}
                            placeId={placeId}
                        />
                    </View>
                    <View style={styles.infoContainer}>
                            <Text style={styles.name}>{name}</Text>
                            <Text style={styles.category}>{category}</Text>
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
    },
    imageContainer: {
        width: '92%',
        aspectRatio: 370 / 430,
        borderRadius: 10,
        overflow: 'hidden',
        marginTop: 30,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.35,
        shadowRadius: 12,
        elevation: 10,
    },
    mainImage: {
        width: '100%',
        height: '100%',
    },
    imageStyle: {
        borderRadius: 10,
    },
    contentContainer: {
        paddingHorizontal: 20,
        flex: 1,
        marginTop: 14,
        justifyContent: 'space-between',
    },
    infoContainer: {
        padding: 10,
        paddingBottom: 16,
        paddingLeft: 15,
        backgroundColor: 'rgba(0, 0, 0, 0.69)',
    },
    name: {
        fontFamily: 'Poppins-SemiBold',
        fontSize: 24,
        color: '#fff',
    },
    category: {
        ...TextStyles.PoppinsRegular15,
        color: '#fff',
        opacity: 0.9,
        left: 5,
    },
});

export default MainImage;