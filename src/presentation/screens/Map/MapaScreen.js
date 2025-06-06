import React, { useState, useEffect, useRef } from "react";
import { View, StyleSheet, TouchableOpacity, StatusBar, Alert, ActivityIndicator, Text } from "react-native";
import CustomSearch from "../../components/Search/Search";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { searchPlaces } from "../../../services/places";
import { Ionicons } from "@expo/vector-icons";
import HorizontalCardPlace from '../../components/HorizontalCardPLace/HorizontalCardPlace';

const MapaScreen = () => {
  const mapRef = useRef(null);
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const [defaultSitios, setDefaultSitios] = useState([]);
  const [filteredSitios, setFilteredSitios] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState(null);

  // 1. Obtener permisos y ubicación del usuario
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permiso de ubicación denegado");
        return;
      }
      let loc = await Location.getCurrentPositionAsync({});
      setLocation({
        latitude: loc.coords.latitude,
        longitude: loc.coords.longitude,
      });
    })();
  }, []);

  // 2. Cargar todos los sitios al iniciar (sin filtro)
  useEffect(() => {
    const fetchSitios = async () => {
      try {
        const sitios = await searchPlaces("", "");  // tu BD o tu API “getAll”
        setDefaultSitios(sitios);
        setFilteredSitios(sitios);
      } catch (e) {
        setDefaultSitios([]);
        setFilteredSitios([]);
      }
    };
    fetchSitios();
  }, []);

  // 3. Función handleSearch: filtrar desde la BD
  const handleSearch = async (query) => {
    if (!location) return;
    setLoading(true);
    try {
      const locationStr = `${location.latitude},${location.longitude}`;

      // Si borraron el texto, restauramos “modo predeterminado”
      if (!query.trim()) {
        setFilteredSitios(defaultSitios);
        setSelectedPlace(null);
        setLoading(false);
        return;
      }

      // Llamada a back-end / BD
      const results = await searchPlaces(query, locationStr);

      // 3.1 Filtramos marcadores
      setFilteredSitios(results);

      // 3.2 Si tenemos al menos 1 resultado, seleccionamos el primero
      if (results && results.length > 0) {
        setSelectedPlace(results[0]);

        // 3.3 Opcional: centrar mapa sobre la primera coincidencia
        if (mapRef.current) {
          const primer = results[0];
          const coord = {
            latitude: primer.geometry?.location?.lat || primer.latitude,
            longitude: primer.geometry?.location?.lng || primer.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          };
          mapRef.current.animateToRegion(coord, 500);
        }
      } else {
        // Si no hay coincidencias, borramos la tarjeta
        setSelectedPlace(null);
      }
    } catch (error) {
      Alert.alert("Error", "No se pudo completar la búsqueda.");
    } finally {
      setLoading(false);
    }
  };

  // 4. Cada vez que cambia searchValue, llamamos handleSearch
  useEffect(() => {
    if (searchValue.trim() === "") {
      setFilteredSitios(defaultSitios);
      setSelectedPlace(null);
    } else {
      handleSearch(searchValue);
    }
  }, [searchValue, defaultSitios]);

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
          onChangeText={setSearchValue}
          onSearch={() => handleSearch(searchValue)}
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
              onDragEnd={(e) =>
                setLocation({
                  latitude: e.nativeEvent.coordinate.latitude,
                  longitude: e.nativeEvent.coordinate.longitude,
                })
              }
              image={require("../../../shared/assets/pin.png")}
            />
          )}

          {(Array.isArray(filteredSitios) ? filteredSitios : []).map((sitio) => (
            <Marker
              key={sitio.place_id || sitio.idPlace || sitio.id}
              coordinate={{
                latitude: sitio.geometry?.location?.lat || sitio.latitude,
                longitude: sitio.geometry?.location?.lng || sitio.longitude,
              }}
              image={require("../../../shared/assets/pin.png")}
              onPress={() => setSelectedPlace(sitio)}
            />
          ))}
        </MapView>

        {/* Botón “Mi ubicación” */}
        <TouchableOpacity style={styles.myLocationButton} onPress={() => {
            if (location && mapRef.current) {
              mapRef.current.animateToRegion({
                ...location,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
              });
            }
          }}>
          <Ionicons name="locate" size={24} color="#236A34" />
        </TouchableOpacity>

        {loading && (
          <View style={styles.loadingOverlay}>
            <ActivityIndicator size="large" color="#fff" />
          </View>
        )}

        {/* Solo si hay un sitio seleccionado (ya sea por buscar o por tocar un marcador) */}
        {selectedPlace && (
          <View style={{ position: 'absolute', left: 0, right: 0, bottom: 0, zIndex: 20, padding: 16 }}>
            <HorizontalCardPlace
              name={selectedPlace?.name || selectedPlace?.title}
              category={selectedPlace?.category || selectedPlace?.types?.[0]}
              address={selectedPlace?.formatted_address || selectedPlace?.description}
              image={selectedPlace?.image || selectedPlace?.photos?.[0]?.url}
              onMapPress={() => setSelectedPlace(null)}
            />
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  map: { flex: 1 },
  error: { fontSize: 16, color: "red", textAlign: "center", marginTop: 50 },
  mapContainer: { flex: 1, position: "relative" },
  search: {
    position: "absolute",
    top: 20,
    left: 16,
    right: 16,
    zIndex: 10,
    backgroundColor: "transparent",
    elevation: 0,
  },
  myLocationButton: {
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
    backgroundColor: "rgba(0,0,0,0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default MapaScreen;
