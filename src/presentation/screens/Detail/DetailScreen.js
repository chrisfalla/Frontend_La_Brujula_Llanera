import React, { useEffect, useState } from "react";
import {
  StatusBar,
  StyleSheet,
  ScrollView,
  View,
  ActivityIndicator,
  Text,
} from "react-native";
import Constants from "expo-constants";
import MainImage from "../../components/MainImage/MainImage";
import GalleryImage from "../../components/GalleryImage/GalleryImage";
import DetailInfo from "../../components/DetailInfo/DetailInfo";
import Rating from "../../components/Rating/Rating";
import GetPlaceDetailUseCase from "../../../domain/usecases/placesDetail/getPlaceDetailUseCase";
import PlaceDetailRepository from "../../../data/repositories/placesDetail/placesDetailRepository";
import PlaceDetailApi from "../../../infrastructure/api/placesDetail/placesDetailApi";
import PlaceDetailDatasource from "../../../data/datasources/placesDetail/placesDetailDataSource";
import { Colors } from "react-native/Libraries/NewAppScreen";

const DetailScreen = ({ navigation, route }) => {
  const API_KEY = Constants.manifest?.extra?.GOOGLE_PLACES_API_KEY || Constants.expoConfig?.extra?.GOOGLE_PLACES_API_KEY;
  
  const googlePlaceData = route?.params?.place; // Datos del lugar de Google Places
  const idPlace = route?.params?.idPlace; // ID del lugar en la base de datos local
  const placeId = route?.params?.placeId; // ID alternativo
  
  const [placeDetail, setPlaceDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dataSource, setDataSource] = useState(null); // Para tracking de dónde vienen los datos

  // Función para obtener detalles de la base de datos local
  const getPlaceDetailFromDatabase = async (id) => {
    if (!id) {
      return null;
    }
    
    try {
      const api = new PlaceDetailApi();
      const datasource = new PlaceDetailDatasource(api);
      const repository = new PlaceDetailRepository(datasource);
      const useCase = new GetPlaceDetailUseCase(repository);
      
      const data = await useCase.execute(id);
      return data;
    } catch (error) {
      return null;
    }
  };

  // Función para obtener detalles completos de Google Places
  const getGooglePlaceDetails = async (placeId) => {
    if (!API_KEY || !placeId) return null;
    
    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=name,rating,user_ratings_total,formatted_address,photos,formatted_phone_number,website&key=${API_KEY}`;
    
    try {
      const response = await fetch(url);
      const data = await response.json();
      
      if (data.status === 'OK' && data.result) {
        return data.result;
      }
      
      return null;
    } catch (error) {
      return null;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        let finalPlaceDetail = null;
        
        // PASO 1: Intentar obtener datos de la base de datos local
        const localId = idPlace || placeId;
        
        if (localId) {
          const localPlaceDetail = await getPlaceDetailFromDatabase(localId);
          
          if (localPlaceDetail) {
            finalPlaceDetail = localPlaceDetail;
            setDataSource('database');
          }
        }
        
        // PASO 2: Si no se encontraron datos locales, usar Google Places API
        if (!finalPlaceDetail && googlePlaceData) {
          
          let rating = googlePlaceData.rating || 0;
          let phoneNumber = "Información no disponible";
          let website = "Información no disponible";
          let photos = [];
          
          // Si tenemos place_id, obtener detalles completos de Google
          if (googlePlaceData.id || googlePlaceData.place_id) {
            const googleDetails = await getGooglePlaceDetails(googlePlaceData.id || googlePlaceData.place_id);
            
            if (googleDetails) {
              rating = googleDetails.rating || rating;
              phoneNumber = googleDetails.formatted_phone_number || phoneNumber;
              website = googleDetails.website || website;
              
              // Procesar fotos de Google Places
              if (googleDetails.photos && googleDetails.photos.length > 0) {
                photos = googleDetails.photos.map((photo, index) => ({
                  categoryId: index === 0 ? 3 : 4, // Primera imagen es principal (categoryId: 3)
                  url: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photo.photo_reference}&key=${API_KEY}`
                }));
              }
            }
          }
          
          // Si no hay fotos de la API pero hay imagen del marker, usarla
          if (photos.length === 0 && googlePlaceData.image) {
            photos = [{
              categoryId: 3,
              url: googlePlaceData.image
            }];
          }
          
          // Crear un objeto con formato compatible usando datos de Google
          finalPlaceDetail = {
            name: googlePlaceData.name,
            category: googlePlaceData.category || "Lugar",
            description: googlePlaceData.address || googlePlaceData.formatted_address || "Información no disponible",
            rating: rating,
            images: photos,
            socialMedia: [
              { typeSocialMediaId: "3", value: phoneNumber },
              { typeSocialMediaId: "4", value: website }
            ],
          };
          
          setDataSource('google');
        }
        
        if (finalPlaceDetail) {
          setPlaceDetail(finalPlaceDetail);
        } else {
          // FALLBACK: Si no hay datos de ninguna fuente, crear datos básicos para debugging
          if (localId && !googlePlaceData) {
            const fallbackData = {
              name: `Lugar ID: ${localId}`,
              category: "Información no disponible",
              description: `Este es un lugar de prueba para verificar la navegación. ID: ${localId}`,
              rating: 0,
              images: [],
              socialMedia: [
                { typeSocialMediaId: "3", value: "Información no disponible" },
                { typeSocialMediaId: "4", value: "Información no disponible" }
              ],
            };
            setPlaceDetail(fallbackData);
            setDataSource('fallback');
          } else {
            const errorMsg = `No se encontró información del lugar.\n\nID Local: ${localId || 'N/A'}\nDatos Google: ${googlePlaceData ? 'Disponibles' : 'No disponibles'}\n\nPosibles causas:\n- El lugar no existe en la base de datos\n- Problemas de conexión con el servidor\n- El ID no es válido`;
            setError(errorMsg);
          }
        }
        
      } catch (error) {
        console.error('❌ Error al cargar datos:', error);
        setError("Error al cargar la información del lugar");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [idPlace, placeId, googlePlaceData]);

  const handleBackPress = () => {
    navigation.goBack();
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.ColorPrimary} />
        <Text style={styles.loadingText}>Cargando detalles del lugar...</Text>
      </View>
    );
  }

  if (error || !placeDetail) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>
          {error || "Error al cargar los datos"}
        </Text>
        <Text style={styles.debugText}>
          ID Local: {idPlace || placeId || 'N/A'} | Google: {googlePlaceData?.name || 'N/A'}
        </Text>
      </View>
    );
  }

  // Procesamiento de imágenes
  const mainImage = placeDetail.images?.find(
    (img) => img.categoryId === 3
  )?.url || googlePlaceData?.image;
  
  const galleryImages =
    placeDetail.images
      ?.filter((img) => img.categoryId !== 3)
      ?.slice(0, 6)
      ?.map((img) => img.url) || [];

  // Extraer datos de contacto (ajusta según tu API real)
  const contactInfo = placeDetail.socialMedia?.reduce((acc, curr) => {
    if (curr.typeSocialMediaId === "3") acc.phone = curr.value;
    if (curr.typeSocialMediaId === "4") acc.mail = curr.value;
    return acc;
  }, {}) || {};

  return (
    <ScrollView style={styles.scrollContainer}>
      <StatusBar
        barStyle="dark-content" // Para iconos oscuros en fondo claro
        backgroundColor="#ffffff" // Fondo blanco para Android
        translucent={false} // No translúcido para evitar superposiciones
      />

      <MainImage
        mainImage={mainImage}
        name={placeDetail.name || "Lugar sin nombre"}
        category={placeDetail.category || "Sin categoría"}
        onBackPress={handleBackPress}
        placeId={idPlace || placeId || googlePlaceData?.id || googlePlaceData?.place_id || 'unknown-place'}
      />
      <View style={styles.rating}>
        <Rating average={placeDetail.rating || 0} />
      </View>

      <GalleryImage images={galleryImages} />

      <DetailInfo
        description={placeDetail.description || "Sin descripción disponible"}
        phoneNumber={contactInfo?.phone || "Información no disponible"}
        mail={contactInfo?.mail || "Información no disponible"}
        navigation={navigation}
        placeId={idPlace || placeId || googlePlaceData?.id || googlePlaceData?.place_id || 'unknown-place'}
        initialTab="Sobre nosotros"
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    paddingBottom: 20,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  rating: {
    position: "absolute",
    top: 430,
    alignSelf: "center",
  },
  errorText: {
    color: "red",
    padding: 20,
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
  },
  loadingText: {
    marginTop: 10,
    color: "#666",
    fontSize: 14,
  },
  debugText: {
    color: "#666",
    fontSize: 12,
    marginTop: 10,
    textAlign: "center",
  },
  debugInfo: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    margin: 20,
    borderRadius: 5,
    alignItems: 'center',
  },
});

export default DetailScreen;