import React from 'react';
import { View, Text, StyleSheet, Image, TextInput, FlatList, TouchableOpacity } from 'react-native';

const categories = [
    { id: "1", type: "Alojamiento", icon: require('../assets/hotel.svg'), color: "#D4F8D4" },
    { id: "2", type: "Restaurante", icon: require('../assets/restaurant.svg'), color: "#FFF5C3" },
];

const Categories = () => {
    const handlePress = (category) => {
        console.log(`Seleccionaste: ${category.type}`);
    };

    return (
        <View style={styles.container}>

            {/* Título */}
            <Text style={styles.title}>
                <Text style={styles.greenText}>Categorias</Text> de Búsqueda
            </Text>

            {/* Input de búsqueda */}
            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Escriba el nombre de un lugar"
                    placeholderTextColor="#C4C4C4"
                />
                <Image source={require('../assets/search.svg')} style={styles.searchIcon} />
            </View>

            {/* Lista de categorías */}
            <FlatList
                data={Array(4).fill(categories).flat()} // Repite las categorías
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={[styles.card, { backgroundColor: item.color }]}
                        onPress={() => handlePress(item)}
                    >
                        <Image source={item.icon} style={styles.icon} />
                        <Text style={styles.text}>{item.type}</Text>
                    </TouchableOpacity>
                )}
                numColumns={2}
                columnWrapperStyle={styles.row}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        padding: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 15,
        textAlign: "center",
    },
    greenText: {
        color: "green",
    },
    searchContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#F5F5F5",
        borderRadius: 10,
        paddingHorizontal: 10,
        marginBottom: 20,
    },
    searchInput: {
        flex: 1,
        height: 40,
        fontSize: 16,
    },
    searchIcon: {
        width: 20,
        height: 20,
        tintColor: "#777",
    },
    row: {
        justifyContent: "space-between",
        marginBottom: 10,
    },
    card: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        borderRadius: 10,
        padding: 15,
        margin: 5,
        elevation: 3,
    },
    icon: {
        width: 30,
        height: 30,
        marginRight: 10,
    },
    text: {
        fontSize: 16,
        fontWeight: "bold",
    },
});

export default Categories;
