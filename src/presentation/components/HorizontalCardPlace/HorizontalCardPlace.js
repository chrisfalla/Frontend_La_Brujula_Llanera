import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image, FlatList } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

export const HorizontalCardPlace = ({ 
    name,
    description,
    image,
    onMapPress,
    onDetailPress
}) => {
    const defaultImage = 'https://via.placeholder.com/60';

    return (
        <View style={styles.container}>
            <Image 
                source={{ uri: image || defaultImage }} 
                style={styles.image}
            />
            <View style={styles.textContainer}>
                <Text style={styles.title} numberOfLines={1}>{name}</Text>
                <Text style={styles.subTitle}>Gastronomía</Text>
                <Text style={styles.description} numberOfLines={2}>
                    {description}
                </Text>
            </View>
            <View style={styles.actionsContainer}>
                <TouchableOpacity 
                    style={styles.iconButton}
                    onPress={onMapPress}
                >
                    <FontAwesome5 name="map-marker-alt" size={16} color="white" />
                </TouchableOpacity>
                <TouchableOpacity 
                    style={styles.iconButton}
                    onPress={onDetailPress}
                >
                    <FontAwesome5 name="arrow-right" size={14} color="white" />
                </TouchableOpacity>
            </View>
        </View>
    );
};

export const HorizontalCardPlaceList = ({ places, onMapPress, onDetailPress }) => {
    const renderItem = ({ item }) => (
        <HorizontalCardPlace
            name={item.name}
            description={item.description}
            image={item.image}
            onMapPress={() => onMapPress(item)}
            onDetailPress={() => onDetailPress(item)}
        />
    );

    return (
        <FlatList
            data={places}
            renderItem={renderItem}
            keyExtractor={(item) => item.idPlace.toString()}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listContainer}
        />
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        width: 356,
        height: 91,
        backgroundColor: '#FFFFFF',
        borderRadius: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        marginBottom: 16,
        alignSelf: 'center',
        paddingVertical: 12,
        paddingHorizontal: 20, // Aumentado para dar más espacio lateral
    },
    image: {
        width: 50,
        height: 50,
        borderRadius: 25,
        alignSelf: 'center',
        marginLeft: -4  // Ajuste fino para empujar hacia la izquierda
    },
    textContainer: {
        flex: 1,
        marginHorizontal: 16,
        height: '100%',
        justifyContent: 'center'
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#236A34',
        marginBottom: 2,
        textAlign: 'center',
    },
    subTitle: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 13,
        color: '#666666',
        marginBottom: 2,
    },
    description: {
        textAlign: 'center',
        fontSize: 13,
        color: '#666666',
        lineHeight: 16,
    },
    actionsContainer: {
        width: 25,
        height: 90,  // Aumentado para mayor separación entre iconos
        justifyContent: 'space-between',
        alignItems: 'center',
        alignSelf: 'center',
        marginLeft: 10,
        paddingVertical: 12,
    },
    iconButton: {
        width: 30,
        height: 30,
        backgroundColor: '#236A34',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center'
    },
    listContainer: {
        paddingHorizontal: 16,
        paddingTop: 8,
    }
});