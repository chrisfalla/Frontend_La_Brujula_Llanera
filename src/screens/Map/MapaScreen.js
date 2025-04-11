import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { Ionicons } from '@expo/vector-icons';
import Header from '../components/Header';

const MapaScreen = () => {
    const mapRef = useRef(null);
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [sitiosTuristicos, setSitiosTuristicos] = useState([
        {
            id: 1,
            title: "Parque Principal Yopal",
            coordinate: {
                latitude: 5.3396, // Coordenadas de Yopal
                longitude: -72.4058
            },
            description: "Plaza central de Yopal"
        },
        {
            id: 2,
            title: "Mirador de la Virgen de Manare",
            coordinate: {
                latitude: 5.3485,
                longitude: -72.4103
            },
            description: "Mirador con vista panorámica de la ciudad"
        },
        {
            id: 3,
            title: "Parque La Iguana",
            coordinate: {
                latitude: 5.3378,
                longitude: -72.3997
            },
            description: "Parque ecológico y recreativo"
        }
    ]);

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            setLocation(location);
        })();
    }, []);

    const handleZoomIn = () => {
        mapRef.current?.getCamera().then((camera) => {
            camera.zoom += 1;
            mapRef.current?.animateCamera(camera);
        });
    };

    const handleZoomOut = () => {
        mapRef.current?.getCamera().then((camera) => {
            camera.zoom -= 1;
            mapRef.current?.animateCamera(camera);
        });
    };

    if (errorMsg) {
        return (
            <View style={styles.container}>
                <Text style={styles.error}>{errorMsg}</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Header />
            <View style={styles.mapContainer}>
                <MapView 
                    ref={mapRef}
                    style={styles.map}
                    initialRegion={{
                        latitude: 5.3396, // Coordenadas centrales de Yopal
                        longitude: -72.4058,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                >
                    {location && (
                        <Marker
                            coordinate={{
                                latitude: location.coords.latitude,
                                longitude: location.coords.longitude
                            }}
                            title="Tu ubicación"
                            pinColor="#236A34"
                        />
                    )}
                    {sitiosTuristicos.map(sitio => (
                        <Marker
                            key={sitio.id}
                            coordinate={sitio.coordinate}
                            title={sitio.title}
                            description={sitio.description}
                        />
                    ))}
                </MapView>
                
                <View style={styles.zoomButtons}>
                    <TouchableOpacity 
                        style={styles.zoomButton} 
                        onPress={handleZoomIn}
                    >
                        <Ionicons name="add" size={24} color="#236A34" />
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={styles.zoomButton} 
                        onPress={handleZoomOut}
                    >
                        <Ionicons name="remove" size={24} color="#236A34" />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height - 100,
    },
    error: {
        fontSize: 16,
        color: 'red',
        textAlign: 'center',
        marginTop: 50,
    },
    mapContainer: {
        flex: 1,
        position: 'relative',
    },
    zoomButtons: {
        position: 'absolute',
        right: 16,
        bottom: 100,
        backgroundColor: 'transparent',
    },
    zoomButton: {
        backgroundColor: 'white',
        borderRadius: 8,
        padding: 8,
        marginVertical: 4,
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
});

export default MapaScreen;
