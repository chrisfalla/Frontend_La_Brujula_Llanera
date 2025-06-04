import React, { useState, useEffect, useRef } from "react";
import { View, StyleSheet, TouchableOpacity, StatusBar, Alert, ActivityIndicator, Text, Modal } from "react-native";
import CustomSearch from "../../components/Search/Search";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { searchPlaces } from "../../../services/places";
import { Ionicons } from "@expo/vector-icons";

const MapaScreen = () => {
  const mapRef = useRef(null);
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [filteredSitios, setFilteredSitios] = useState([]);
  const [defaultSitios, setDefaultSitios] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchTimeout, setSearchTimeout] = useState(null); // 🆕

  const pinImage = require("../../../shared/assets/pin.png"); // 🆕 optimización

  useEffect(() => {
    const fetchSitios = async () => {
      try {
        const sitios = await searchPlaces('', '');
        setDefaultSitios(sitios);
        setFilteredSitios(sitios);
      } catch (e) {
        setDefaultSitios([]);
        setFilteredSitios([]);
      }
    };
    fetchSitios();
  }, []);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permiso de ubicación denegado");
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      setLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
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

  const handleMarkerDragEnd = (e) => {
    const { latitude, longitude } = e.nativeEvent.coordinate;
    setLocation({ latitude, longitude });
  };

  const centerOnUserLocation = () => { // 🆕 centrar mapa
    if (location && mapRef.current) {
      mapRef.current.animateToRegion({
        ...location,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
    }
  };

  // 🆕 Debounce manual para evitar múltiples llamadas
  const handleSearch = (query) => {
    setSearchValue(query);
    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }
    const timeout = setTimeout(async () => {
      if (!location) return;
      setLoading(true);
      try {
        const locationStr = `${location.latitude},${location.longitude}`;
        if (!query.trim()) {
          setFilteredSitios(defaultSitios);
        } else {
          const results = await searchPlaces(query, locationStr);
          setFilteredSitios(results);
        }
      } catch (error) {
        Alert.alert("Error", "No se pudo completar la búsqueda.");
      } finally {
        setLoading(false);
      }
    }, 500); // 500ms debounce
    setSearchTimeout(timeout);
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
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" translucent={false} />
      <View style={styles.mapContainer}>
        <CustomSearch
          style={styles.search}
          value={searchValue}
          onChangeText={handleSearch}
          placeholder="Buscar lugares..."
        />
        <MapView
          googleMapId="6bc2ed877465664dff366b78"
          ref={mapRef}
          style={styles.map}
          initialRegion={{
            latitude: location?.latitude || 5.3396,
            longitude: location?.longitude || -72.4058,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          region={
            location
              ? {
                  latitude: location.latitude,
                  longitude: location.longitude,
                  latitudeDelta: 0.0922,
                  longitudeDelta: 0.0421,
                }
              : undefined
          }
          showsUserLocation={false}
        >
          {location && (
            <Marker
              coordinate={location}
              draggable
              onDragEnd={handleMarkerDragEnd}
              image={pinImage}
            />
          )}
          {(Array.isArray(filteredSitios) ? filteredSitios : []).map((sitio) => (
            <Marker
              key={sitio.place_id || sitio.idPlace || sitio.id}
              coordinate={{
                latitude: sitio.geometry?.location?.lat || sitio.latitude || (sitio.coordinate && sitio.coordinate.latitude),
                longitude: sitio.geometry?.location?.lng || sitio.longitude || (sitio.coordinate && sitio.coordinate.longitude),
              }}
              title={sitio.name || sitio.placeName || sitio.title}
              description={sitio.formatted_address || sitio.placeAddress || sitio.description}
              image={pinImage}
            />
          ))}
        </MapView>

        {/* 🆕 Botón "Mi Ubicación" */}
        <TouchableOpacity style={styles.myLocationButton} onPress={centerOnUserLocation}>
          <Ionicons name="locate" size={24} color="#236A34" />
        </TouchableOpacity>

        

        {loading && (
          <View style={styles.loadingOverlay}>
            <ActivityIndicator size="large" color="#fff" />
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  map: {
    flex: 1,
  },
  error: {
    fontSize: 16,
    color: "red",
    textAlign: "center",
    marginTop: 50,
  },
  mapContainer: {
    flex: 1,
    position: "relative",
  },
  search: {
    position: "absolute",
    top: 20,
    left: 16,
    right: 16,
    zIndex: 10,
    backgroundColor: "transparent",
    marginBottom: 0,
    padding: 0,
    elevation: 0,
  },
  myLocationButton: { // 🆕 estilo del botón de centrado
    position: "absolute",
    bottom: 10,
    right: 16,
    backgroundColor: "white",
    borderRadius: 8,
    padding: 8,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default MapaScreen;
