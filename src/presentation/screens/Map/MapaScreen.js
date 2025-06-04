import React, { useState, useEffect, useRef } from "react";
import { View, StyleSheet, TouchableOpacity, StatusBar } from "react-native";
import CustomSearch from "../../components/Search/Search";
import MapView, { Marker, Polyline } from "react-native-maps";
import * as Location from "expo-location";

import { Ionicons } from "@expo/vector-icons";

const MapaScreen = () => {
  const mapRef = useRef(null);
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [sitiosTuristicos, setSitiosTuristicos] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [filteredSitios, setFilteredSitios] = useState([]);

  // Cargar sitios desde la API (ajusta el endpoint si es necesario)
  useEffect(() => {
    const fetchSitios = async () => {};
    fetchSitios();
  }, []);

  // Filtrar sitios según búsqueda
  useEffect(() => {
    if (!searchValue.trim()) {
      setFilteredSitios(sitiosTuristicos);
    } else {
      setFilteredSitios(
        sitiosTuristicos.filter((sitio) =>
          (sitio.placeName || sitio.title || "")
            .toLowerCase()
            .includes(searchValue.toLowerCase())
        )
      );
    }
  }, [searchValue, sitiosTuristicos]);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
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

  if (errorMsg) {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>{errorMsg}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="#ffffff"
        translucent={false}
      />
      <View style={styles.mapContainer}>
        <CustomSearch
          style={styles.search}
          value={searchValue}
          onChangeText={setSearchValue}
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
        >
          {location && (
            <Marker
              coordinate={location}
               //pinColor="#236A34" 
              draggable
              onDragEnd={handleMarkerDragEnd}
              image={require('../../../shared/assets/pin.png') } // Usa tu propio icono PNG aquí
            />
          )}
          {(Array.isArray(filteredSitios) ? filteredSitios : []).map(
            (sitio) => (
              <Marker
                key={sitio.idPlace || sitio.id}
                coordinate={{
                  latitude:
                    sitio.latitude ||
                    (sitio.coordinate && sitio.coordinate.latitude),
                  longitude:
                    sitio.longitude ||
                    (sitio.coordinate && sitio.coordinate.longitude),
                }}
                title={sitio.placeName || sitio.title}
                description={sitio.placeAddress || sitio.description}
              />
            )
          )}
        </MapView>
        <View style={styles.zoomButtons}>
          <TouchableOpacity style={styles.zoomButton} onPress={handleZoomIn}>
            <Ionicons name="add" size={24} color="#236A34" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.zoomButton} onPress={handleZoomOut}>
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
    backgroundColor: "#fff",
  },
  map: {
    flex: 1, // <-- Cambiado para ocupar todo el espacio disponible
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
  zoomButtons: {
    position: "absolute",
    right: 16,
    bottom: 100,
    backgroundColor: "transparent",
  },
  zoomButton: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 8,
    marginVertical: 4,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
});

export default MapaScreen;
