import React, { useState, useEffect, useRef } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Alert,
  ActivityIndicator,
  Text,
} from "react-native";
import CustomSearch from "../../components/Search/Search";
import MapView, { Marker, Polyline } from "react-native-maps";
import * as Location from "expo-location";
import { searchPlaces, getPlaceDetails } from "../../../services/places";
import { Ionicons } from "@expo/vector-icons";
import HorizontalCardPlace from "../../components/HorizontalCardPlace/HorizontalCardPlace";
import Constants from "expo-constants";
import { GlobalStyles, Colors, TextStyles } from "../../styles/styles";

const API_KEY =
  Constants.manifest?.extra?.GOOGLE_PLACES_API_KEY ||
  Constants.expoConfig?.extra?.GOOGLE_PLACES_API_KEY;

const MapaScreen = () => {
  const mapRef = useRef(null);
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [defaultSitios, setDefaultSitios] = useState([]);
  const [filteredSitios, setFilteredSitios] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [routeCoords, setRouteCoords] = useState([]); // NUEVO

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

  useEffect(() => {
    const fetchSitios = async () => {
      try {
        const sitios = await searchPlaces("", "");
        setDefaultSitios(sitios);
        setFilteredSitios(sitios);
      } catch (e) {
        setDefaultSitios([]);
        setFilteredSitios([]);
      }
    };
    fetchSitios();
  }, []);

  const handleSearch = async (query) => {
    // Permitir búsqueda aunque no haya ubicación, usando una ubicación por defecto
    const userLocation = location || { latitude: 5.3396, longitude: -72.4058 };
    setLoading(true);
    try {
      const locationStr = `${userLocation.latitude},${userLocation.longitude}`;
      if (!query.trim()) {
        setFilteredSitios(defaultSitios);
        setSelectedPlace(null);
        setRouteCoords([]); // LIMPIAR RUTA
        setLoading(false);
        return;
      }

      const results = await searchPlaces(query, locationStr);
      setFilteredSitios(results);

      if (results && results.length > 0) {
        setSelectedPlace(results[0]);
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
        setSelectedPlace(null);
        setRouteCoords([]);
      }
    } catch (error) {
      Alert.alert("Error", "No se pudo completar la búsqueda.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (searchValue.trim() === "") {
      setFilteredSitios(defaultSitios);
      setSelectedPlace(null);
      setRouteCoords([]);
    } else if (searchValue.trim().length >= 5) {
      handleSearch(searchValue);
    }
  }, [searchValue, defaultSitios]);

  // Nueva función para volver a pedir permisos
  const requestLocationPermission = async () => {
    setErrorMsg(null);
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
  };

  if (errorMsg) {
    // Mostrar el mapa con ubicación por defecto y un recuadro flotante con transparencia y botón de icono para reintentar
    return (
      <View style={styles.container}>
        <MapView
          googleMapId="6bc2ed877465664dff366b78"
          style={styles.mapView}
          initialRegion={{
            latitude: 5.3396,
            longitude: -72.4058,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        />
        <View style={styles.errorBox}>
          <TouchableOpacity
            style={styles.errorButton}
            onPress={requestLocationPermission}
          >
            <Ionicons name="locate" size={28} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.errorText}>
            Activa la ubicación para usar el mapa
          </Text>
          <Text style={styles.errorSubText}>
            Presiona el ícono para volver a solicitar los permisos de ubicación
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
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

          {/* Mostrar marcadores aunque no haya ubicación */}
          {(Array.isArray(filteredSitios) ? filteredSitios : []).map(
            (sitio) => (
              <Marker
                key={sitio.place_id || sitio.idPlace || sitio.id}
                coordinate={{
                  latitude: sitio.geometry?.location?.lat || sitio.latitude,
                  longitude: sitio.geometry?.location?.lng || sitio.longitude,
                }}
                image={require("../../../shared/assets/pin.png")}
                onPress={async () => {
                  setLoading(true);
                  if (sitio.image) {
                    setSelectedPlace(sitio);
                    setLoading(false);
                  } else {
                    try {
                      const id = sitio.idPlace || sitio.place_id || sitio.id;
                      let detail = null;
                      if (id) {
                        detail = await getPlaceDetails(id);
                      }
                      setSelectedPlace({
                        ...sitio,
                        image: detail?.image || detail?.photos?.[0]?.url || null,
                      });
                    } catch (e) {
                      setSelectedPlace(sitio);
                    } finally {
                      setLoading(false);
                    }
                  }
                }}
              />
            )
          )}

          {routeCoords.length > 0 && (
            <Polyline
              coordinates={routeCoords}
              strokeWidth={4}
              strokeColor={Colors.ColorOnPrimary}
            />
          )}
        </MapView>

        <TouchableOpacity
          style={styles.myLocationButton}
          onPress={() => {
            if (location && mapRef.current) {
              mapRef.current.animateToRegion({
                ...location,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
              });
            }
          }}
        >
          <Ionicons name="locate" size={24} color={Colors.ColorPrimary} />
        </TouchableOpacity>

        {loading && (
          <View style={styles.loadingOverlay}>
            <ActivityIndicator size="large" color="#fff" />
          </View>
        )}

        {selectedPlace && (
          <View style={styles.selectedPlaceCard}>
            <HorizontalCardPlace
              name={selectedPlace.name}
              category={selectedPlace.category}
              address={selectedPlace.address}
              image={selectedPlace.image}
              onMapPress={() => {
                setSelectedPlace(null);
                setRouteCoords([]);
              }}
              detailIconName="chevron-right"
              mapIconName="route"
              onDetailIconPress={() => {
                // Manejar el evento del ícono de detalle
              }}
              onMapIconPress={async () => {
                // Calcular la ruta y hacer zoom out para mostrarla
                if (location && selectedPlace && mapRef.current) {
                  const route = await getRouteDirections(location, {
                    latitude: selectedPlace.latitude,
                    longitude: selectedPlace.longitude,
                  });
                  setRouteCoords(route);
                  if (route.length > 1) {
                    mapRef.current.fitToCoordinates(route, {
                      edgePadding: { top: 100, right: 100, bottom: 100, left: 100 },
                      animated: true,
                    });
                  }
                }
              }}
            />
          </View>
        )}
      </View>
    </View>
  );
};

// --- Funciones auxiliares para rutas --- //
function decodePolyline(encoded) {
  let poly = [];
  let index = 0, len = encoded.length;
  let lat = 0, lng = 0;

  while (index < len) {
    let b, shift = 0, result = 0;
    do {
      b = encoded.charCodeAt(index++) - 63;
      result |= (b & 0x1f) << shift;
      shift += 5;
    } while (b >= 0x20);
    let dlat = result & 1 ? ~(result >> 1) : result >> 1;
    lat += dlat;

    shift = 0;
    result = 0;
    do {
      b = encoded.charCodeAt(index++) - 63;
      result |= (b & 0x1f) << shift;
      shift += 5;
    } while (b >= 0x20);
    let dlng = result & 1 ? ~(result >> 1) : result >> 1;
    lng += dlng;

    poly.push([lat / 1e5, lng / 1e5]);
  }

  return poly;
}

const getRouteDirections = async (origin, destination) => {
  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/directions/json?origin=${origin.latitude},${origin.longitude}&destination=${destination.latitude},${destination.longitude}&key=${API_KEY}`
    );
    const data = await response.json();

    if (data.routes.length) {
      const points = decodePolyline(data.routes[0].overview_polyline.points);
      return points.map(point => ({
        latitude: point[0],
        longitude: point[1],
      }));
    }
    return [];
  } catch (error) {
    console.error("Error al obtener ruta:", error);
    return [];
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.BackgroundPage,
    ...GlobalStyles.ScreenBaseStyle,
  },
  map: { flex: 1, width: '100%' },
  error: {
    fontSize: 16,
    color: Colors.ErrorAdvertisingColor,
    textAlign: "center",
    marginTop: 50,
    ...TextStyles.PoppinsSemiBold15,
  },
  mapContainer: { flex: 1, position: "relative" },
  search: {
    position: "absolute",
    top: 20,
    left: 16,
    right: 16,
    zIndex: 10,
    backgroundColor: "#fff",
    borderRadius: GlobalStyles.borderRadius,
    elevation: GlobalStyles.elevation,
    shadowColor: Colors.Black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  myLocationButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: Colors.ColorOnPrimary,
    borderRadius: 24,
    padding: 12,
    elevation: GlobalStyles.elevation,
    shadowColor: Colors.Black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
  // Nuevos estilos extraídos de los estilos en línea
  mapView: {
    flex: 1,
    width: '100%',
  },
  errorBox: {
    position: 'absolute',
    top: 80,
    left: 32,
    right: 32,
    backgroundColor: 'rgba(255,255,255,0.92)',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 8,
  },
  errorButton: {
    padding: 16,
    backgroundColor: Colors.ColorPrimary,
    borderRadius: 50,
    marginBottom: 10,
  },
  errorText: {
    ...TextStyles.PoppinsBold15,
    color: Colors.ColorPrimary,
    fontSize: 16,
    marginBottom: 0,
    textAlign: 'center',
  },
  errorSubText: {
    color: Colors.ColorPrimary,
    fontSize: 13,
    marginTop: 4,
    textAlign: 'center',
  },
  selectedPlaceCard: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 80,
    zIndex: 20,
    padding: 16,
  },
});

export default MapaScreen;
