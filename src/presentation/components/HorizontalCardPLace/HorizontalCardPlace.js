import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image, FlatList } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

const defaultImage = 'https://via.placeholder.com/50';

export const HorizontalCardPlace = ({
    name,
    description,
    image,
    onMapPress,
}) => {
    return (
        <View style={styles.container}>
            <Image
                source={{ uri: image || defaultImage }}
                style={styles.image}
            />
            <View style={styles.textContainer}>
                <Text style={styles.title} numberOfLines={1}>{name}</Text>
                <Text style={styles.subTitle}>solo es un ejemplo de categorias</Text>
                <Text style={styles.description} numberOfLines={2}>
                    {description}
                </Text>
            </View>
            <View style={styles.actionsContainer}>
                <TouchableOpacity
                    style={styles.iconButton}
                    onPress={onMapPress}
                >
                    <FontAwesome5 name="map-marker-alt" size={16} color="#FFFFFF" />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const renderItem = ({ item }) => (
    <HorizontalCardPlace
        name={item.name}
        description={item.description}
        image={item.image}
        onMapPress={() => onMapPress(item)}
    />
);

export const HorizontalCardPlaceList = ({ places, onMapPress }) => {
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
        width: '100%',
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
        paddingHorizontal: 15,
    },
    image: {
        width: 50,
        height: 50,
        borderRadius: 25,
        alignSelf: 'center',
        marginLeft: -4
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
        height: 90,
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
    }
});

