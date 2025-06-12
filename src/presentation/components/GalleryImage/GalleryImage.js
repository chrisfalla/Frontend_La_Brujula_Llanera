import React, { useState } from "react";
import {View,StyleSheet,Image,Text,Modal,Pressable,FlatList,Dimensions,} from "react-native";
import { Colors, TextStyles, GlobalStyles } from "../../styles/styles";


const { width, height } = Dimensions.get("window");

const GalleryImage = ({ images }) => {
const [isVisible, setIsVisible] = useState(false);
const [activeIndex, setActiveIndex] = useState(0);

const openImage = (index) => {
    setActiveIndex(index);
    setIsVisible(true);
};

const closeImage = () => setIsVisible(false);
return (
    <View style={styles.container}>
        <Text style={styles.title}>Galería:</Text>
        <View style={styles.imagesContainer}>
        {images && images.length > 0 ? (
        images.map((image, index) => (
            <Pressable
                key={index}
                style={styles.imageWrapper}
                onPress={() => openImage(index)}
            >
            <Image
                source={{ uri: image }}
                style={styles.image}
                resizeMode="cover"
            />
            </Pressable>
        ))
        ) : (
        <Text style={styles.emptyText}>No hay imágenes disponibles</Text>
        )}
        </View>
      {/* Modal para visor de imágenes */}
        <Modal
            visible={isVisible}
            transparent={true}
            animationType="fade"
            onRequestClose={closeImage}
        >
        <View style={styles.modalBackground}>
            <FlatList
                data={images}
                horizontal
                pagingEnabled
                initialScrollIndex={activeIndex}
                getItemLayout={(data, index) => ({
                length: width,
                offset: width * index,
                index,
                })}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => (
                <View style={styles.fullscreenImageContainer}>
                <Image
                    source={{ uri: item }}
                    style={styles.fullscreenImage}
                    resizeMode="contain"
                />
                </View>
            )}
            />
            <Pressable style={styles.closeButton} onPress={closeImage}>
            <Text style={styles.closeText}>✕</Text>
            </Pressable>
        </View>
        </Modal>
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
    overflow: "hidden",
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
modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.77)",
    justifyContent: "center",
    alignItems: "center",
},
fullscreenImageContainer: {
    width: width,
    height: height,
    justifyContent: "center",
    alignItems: "center",
},
fullscreenImage: {
    width: width * 0.85,
    height: height * 0.55,
    borderRadius: 20,
    backgroundColor: "#fff",
    resizeMode: "cover", // llena el contenedor, recortando exceso
},

closeButton: {
    position: "absolute",
    top: 80,
    right: 20,
    backgroundColor: "#ffffff",
    padding: 15,
    borderRadius: 50,
},
closeText: {
    color: Colors.Black,
    fontSize: 20,
    fontWeight: "bold",
    lineHeight: 22,
},
});

export default GalleryImage;
