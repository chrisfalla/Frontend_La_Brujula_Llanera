import React from "react";
import { View, StyleSheet, Image, Text } from "react-native";
import { Colors, TextStyles, GlobalStyles } from '../../styles/styles';

const GalleryImage = ({ images }) => {
    
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Galería:</Text>
            <View style={styles.imagesContainer}>
                {images &&
                    images.map((image, index) => (
                        <View key={index} style={styles.imageWrapper}>
                            <Image
                                source={{ uri: image }}
                                style={styles.image}
                                resizeMode="cover"
                            />
                        </View>
                    ))}
            </View>
        </View>
    )};

    const styles = StyleSheet.create({
        container: {
            paddingHorizontal: 1,
            paddingTop: 20,
            paddingBottom: 0,
        },
        title: {
            ...TextStyles.PoppinsBold15,
            color: Colors.ColorPrimary,
            marginBottom: 14,
            paddingHorizontal: 10,
        },
        imagesContainer: {
            flexDirection: "row",
            justifyContent: "flex-start",
          
            
        },
        imageWrapper: {
            width: 100,
            height: 100,
            marginHorizontal: 10,
            borderRadius: GlobalStyles.cornerRadius,
            backgroundColor: Colors.BackgroundPage,
            // Sombra iOS
            shadowColor: Colors.Black,
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            // Sombra Android
            elevation: GlobalStyles.elevation,
        },
        image: {
            width: "100%",
            height: "100%",
            borderRadius: GlobalStyles.cornerRadius,
            borderWidth: 3,
            borderColor: Colors.BackgroundPage,
            
            
            
        },
    });

    export default GalleryImage;