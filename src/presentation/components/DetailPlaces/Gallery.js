import React from "react";
import { View, StyleSheet, Image, Text } from "react-native";

const Gallery = ({ images }) => {
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
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: '4%', // Igual que el ancho de la imagen principal (92% => 4% a cada lado)
    paddingTop: 20,
    paddingBottom: 0,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#236A34",
    marginBottom: 15,
  },
  imagesContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  imageWrapper: {
    width: 100,
    height: 100,
    marginRight: '8.4%', // Más espacio entre fotos
    borderRadius: 10,
    backgroundColor: "#fff",
    // Sombra para iOS
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    // Sombra para Android
    elevation: 5,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
    borderWidth: 3,
    borderColor: "#fff",
  },
});

export default Gallery;
