import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';

const tabs = ['Sobre nosotros', 'Contacto', 'Reviews'];

const InfoDetail = ({ description, coordinates }) => {
    const [activeTab, setActiveTab] = useState('Sobre nosotros');

    const mapImageUrl = "https://maps.googleapis.com/maps/api/staticmap?center=" + 
        coordinates.latitude + "," + coordinates.longitude + 
        "&zoom=15&size=400x200&maptype=roadmap&markers=color:red%7C" + 
        coordinates.latitude + "," + coordinates.longitude;

    return (
        <View style={styles.container}>
            {/* Slider de palabras */}
            <View style={styles.tabContainer}>
                {tabs.map((tab) => (
                    <TouchableOpacity
                        key={tab}
                        onPress={() => setActiveTab(tab)}
                        style={[
                            styles.tab,
                            activeTab === tab && styles.activeTab
                        ]}
                    >
                        <Text style={[
                            styles.tabText,
                            activeTab === tab && styles.activeTabText
                        ]}>
                            {tab}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>

            {/* Contenedor del mapa */}
            <TouchableOpacity style={styles.mapContainer}>
                <ImageBackground
                    source={{ uri: mapImageUrl }}
                    style={styles.mapImage}
                    imageStyle={styles.mapImageStyle}
                >
                    <View style={styles.mapOverlay}>
                        <Text style={styles.mapText}>Ver ubicación</Text>
                    </View>
                </ImageBackground>
            </TouchableOpacity>

            {/* Descripción */}
            <View style={styles.descriptionContainer}>
                <Text style={styles.description}>{description}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    tabContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 20,
    },
    tab: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 20,
        backgroundColor: '#f0f0f0',
    },
    activeTab: {
        backgroundColor: '#236A34',
    },
    tabText: {
        color: '#333',
        fontWeight: '500',
    },
    activeTabText: {
        color: '#fff',
    },
    mapContainer: {
        height: 150,
        marginBottom: 20,
        borderRadius: 10,
        overflow: 'hidden',
    },
    mapImage: {
        width: '100%',
        height: '100%',
    },
    mapImageStyle: {
        borderRadius: 10,
    },
    mapOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.3)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    mapText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    descriptionContainer: {
        padding: 10,
    },
    description: {
        fontSize: 14,
        color: '#333',
        lineHeight: 20,
    },
});

export default InfoDetail;
