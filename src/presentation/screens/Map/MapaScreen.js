import React, { useState, useEffect, useRef } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Alert,
  ActivityIndicator,
  Text,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import CustomSearch from "../../components/Search/Search";
import MapView, { Marker, Polyline } from "react-native-maps";
import * as Location from "expo-location";
import useMapPlaces from "../../hooks/places/useMapPlaces";
import { Ionicons } from "@expo/vector-icons";
import HorizontalCardPlace from "../../components/HorizontalCardPlace/HorizontalCardPlace";
import Constants from "expo-constants";
import { GlobalStyles, Colors, TextStyles } from "../../styles/styles";

const API_KEY =
  Constants.manifest?.extra?.GOOGLE_PLACES_API_KEY ||
  Constants.expoConfig?.extra?.GOOGLE_PLACES_API_KEY;

// Función utilitaria para validar coordenadas
const isValidCoordinate = (lat, lng) => {
  return (
    lat !== null &&
    lat !== undefined &&
    lng !== null &&
    lng !== undefined &&
    typeof lat === "number" &&
    typeof lng === "number" &&
    !isNaN(lat) &&
    !isNaN(lng) &&
    lat >= -90 &&
    lat <= 90 &&
    lng >= -180 &&
    lng <= 180
  );
};

const MapaScreen = () => {
  const navigation = useNavigation();
  const mapRef = useRef(null);
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [routeCoords, setRouteCoords] = useState([]); // AGREGADO: Estado para almacenar coordenadas de la ruta a dibujar

  // MODIFICADO: useEffect limpio sin logs de depuración
  useEffect(() => {
    // Silencioso - monitorea cambios en routeCoords
  }, [routeCoords]);

  // Usar el hook personalizado para manejar los lugares
  const {
    defaultPlaces,
    filteredPlaces,
    searchValue,
    loading,
    selectedPlace,
    error: placesError,
    searchPlaces,
    getPlaceDetails: getPlaceDetailsFromHook,
    updateSearchValue,
    setSelectedPlace,
  } = useMapPlaces();

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

  // MODIFICADO: Limpiar ruta cuando se borra el texto de búsqueda
  useEffect(() => {
    if (searchValue.trim() === "") {
      setRouteCoords([]); // Limpiar ruta al borrar búsqueda
    } else if (searchValue.trim().length >= 3) {
      const timeoutId = setTimeout(() => {
        handleSearch(searchValue);
      }, 500);
      return () => clearTimeout(timeoutId);
    }
  }, [searchValue]);

  const handleSearch = async (query) => {
    // Permitir búsqueda aunque no haya ubicación, usando una ubicación por defecto
    const userLocation = location || { latitude: 5.335, longitude: -72.396 };

    // Agregar timeout para evitar búsquedas que demoren mucho
    const searchTimeout = new Promise((_, reject) =>
      setTimeout(() => reject(new Error("Timeout")), 10000)
    );

    try {
      const results = await Promise.race([
        searchPlaces(query, userLocation),
        searchTimeout,
      ]);

      if (results && results.length > 0) {
        if (mapRef.current) {
          const primer = results[0];
          const lat = primer.geometry?.location?.lat || primer.latitude;
          const lng = primer.geometry?.location?.lng || primer.longitude;

          // Validar coordenadas antes de animar el mapa
          if (isValidCoordinate(lat, lng)) {
            const coord = {
              latitude: lat,
              longitude: lng,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            };
            mapRef.current.animateToRegion(coord, 500);
          }
        }
      } else {
        setRouteCoords([]);
      }
    } catch (error) {
      setRouteCoords([]);
    }
  };

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
            latitude: 5.335,
            longitude: -72.396,
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
          onChangeText={updateSearchValue}
          onSearch={() => handleSearch(searchValue)}
          placeholder="Buscar lugares..."
        />
        <MapView
          googleMapId="6bc2ed877465664dff366b78"
          ref={mapRef}
          style={styles.map}
          initialRegion={{
            latitude: location?.latitude || 5.335,
            longitude: location?.longitude || -72.396,
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
          onPoiClick={async (e) => {
            const { coordinate, name, placeId } = e.nativeEvent;

            // Validar coordenadas del POI
            if (
              !coordinate ||
              !isValidCoordinate(coordinate.latitude, coordinate.longitude)
            ) {
              return;
            }

            // Crear objeto básico inmediatamente para mostrar algo rápido
            const basicPlace = {
              name: name,
              address: "",
              image: null,
              latitude: coordinate.latitude,
              longitude: coordinate.longitude,
              id: placeId,
            };

            // Mostrar información básica primero
            setSelectedPlace(basicPlace);

            // Luego cargar detalles en segundo plano si hay placeId
            if (placeId) {
              try {
                const detail = await getPlaceDetailsFromHook(placeId);
                if (detail) {
                  setSelectedPlace({
                    ...basicPlace,
                    name: detail.name || name,
                    address: detail.address || detail.formatted_address || "",
                    image: detail.image || null,
                  });
                }
              } catch (error) {
                // Si falla, mantener la información básica
              }
            }
          }}
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

          {/* AGREGADO: Componente Polyline para mostrar la ruta en el mapa */}
          {routeCoords.length > 0 && (
            <Polyline
              coordinates={routeCoords}
              strokeWidth={4}
              strokeColor={Colors.ColorOnPrimary} // Color verde de la marca
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
                setRouteCoords([]); // AGREGADO: Limpiar ruta al cerrar la card del lugar
              }}
              detailIconName="chevron-right"
              mapIconName="route"
              onDetailIconPress={() => {
                // Navegar a la pantalla de detalle pasando los datos completos del lugar
                const placeData = {
                  ...selectedPlace,
                  // Asegurar que tenemos todos los campos necesarios
                  place_id: selectedPlace.id || selectedPlace.place_id,
                  formatted_address: selectedPlace.address,
                };

                navigation.navigate("DetailScreen", {
                  place: placeData,
                  placeId:
                    selectedPlace.id ||
                    selectedPlace.idPlace ||
                    selectedPlace.place_id,
                  // Pasar también el ID local si existe
                  idPlace: selectedPlace.idPlace,
                });
              }}
              onMapIconPress={async () => {
                // AGREGADO: Funcionalidad para calcular y mostrar ruta al presionar el botón de ruta
                if (location && selectedPlace && mapRef.current) {
                  // Usar ubicación real del usuario
                  const route = await getRouteDirections(location, {
                    latitude: selectedPlace.latitude,
                    longitude: selectedPlace.longitude,
                  });
                  setRouteCoords(route); // Actualizar coordenadas de la ruta
                  if (route.length > 1) {
                    // Ajustar zoom del mapa para mostrar toda la ruta
                    mapRef.current.fitToCoordinates(route, {
                      edgePadding: {
                        top: 100,
                        right: 100,
                        bottom: 100,
                        left: 100,
                      },
                      animated: true,
                    });
                  }
                } else if (!location && selectedPlace && mapRef.current) {
                  // Fallback: usar ubicación por defecto si no hay GPS
                  const defaultLocation = {
                    latitude: 5.335,
                    longitude: -72.396,
                  };
                  const route = await getRouteDirections(defaultLocation, {
                    latitude: selectedPlace.latitude,
                    longitude: selectedPlace.longitude,
                  });
                  setRouteCoords(route);
                  if (route.length > 1) {
                    mapRef.current.fitToCoordinates(route, {
                      edgePadding: {
                        top: 100,
                        right: 100,
                        bottom: 100,
                        left: 100,
                      },
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

// --- AGREGADO: Funciones auxiliares para rutas --- //

// Función para decodificar polylines de Google Maps
function decodePolyline(encoded) {
  let poly = [];
  let index = 0,
    len = encoded.length;
  let lat = 0,
    lng = 0;

  while (index < len) {
    let b,
      shift = 0,
      result = 0;
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

// AGREGADO: Función para obtener direcciones de Google Maps API
const getRouteDirections = async (origin, destination) => {
  try {
    // Llamar a Google Directions API
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/directions/json?origin=${origin.latitude},${origin.longitude}&destination=${destination.latitude},${destination.longitude}&key=${API_KEY}`
    );
    const data = await response.json();

    // Si la API funciona y devuelve rutas
    if (data.routes && data.routes.length && data.status === "OK") {
      const points = decodePolyline(data.routes[0].overview_polyline.points);
      return points.map((point) => ({
        latitude: point[0],
        longitude: point[1],
      }));
    } else {
      // FALLBACK: Si la API falla, usar línea directa
      return [
        { latitude: origin.latitude, longitude: origin.longitude },
        { latitude: destination.latitude, longitude: destination.longitude },
      ];
    }
  } catch (error) {
    // FALLBACK: En caso de error, usar línea directa
    return [
      { latitude: origin.latitude, longitude: origin.longitude },
      { latitude: destination.latitude, longitude: destination.longitude },
    ];
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  map: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  mapView: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  mapContainer: {
    flex: 1,
    position: "relative",
    // Sin padding ni margen
  },
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
    bottom: 20,
    right: 20,
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 12,
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
  // Nuevos estilos extraídos de los estilos en línea
  errorBox: {
    position: "absolute",
    top: 80,
    left: 32,
    right: 32,
    backgroundColor: "rgba(255,255,255,0.92)",
    borderRadius: 16,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
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
    textAlign: "center",
  },
  errorSubText: {
    color: Colors.ColorPrimary,
    fontSize: 13,
    marginTop: 4,
    textAlign: "center",
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
