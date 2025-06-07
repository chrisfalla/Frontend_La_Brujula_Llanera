import React from "react";
import { View, StyleSheet, Image, Text } from "react-native";
import { Colors, TextStyles, GlobalStyles } from '../../styles/styles';

const GalleryImage = ({ images }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Galería:</Text>
            <View style={styles.imagesContainer}>
                {images && images.length > 0 ? (
                    images.map((image, index) => (
                        <View key={index} style={styles.imageWrapper}>
                            <Image
                                source={{ uri: image }}
                                style={styles.image}
                                resizeMode="cover"
                            />
                        </View>
                    ))
                ) : (
                    <Text style={styles.emptyText}>No hay imágenes disponibles</Text>
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingTop: 20,
        paddingBottom: 5,
    },
    title: {
        paddingHorizontal: 15,
        ...TextStyles.PoppinsBold15,
        color: Colors.ColorPrimary,
        marginBottom: 14,
    },
    imagesContainer: {
        marginHorizontal: 5,
        flexDirection: "row",
        flexWrap: "wrap",
        
    },
    imageWrapper: {
        width: 100,
        height: 100,
        marginHorizontal: 11,
        marginBottom: 10,
        borderRadius: GlobalStyles.borderRadius,
        backgroundColor: Colors.BackgroundPage,
        shadowColor: Colors.Black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: GlobalStyles.elevation,
    },
    image: {
        width: "110%",
        height: "110%",
        borderRadius: GlobalStyles.borderRadius,
        borderWidth: 3,
        borderColor: Colors.BackgroundPage,
    },
    emptyText: {
        ...TextStyles.PoppinsRegular13,
        color: Colors.DarkGray,
    },
});

export default GalleryImage;