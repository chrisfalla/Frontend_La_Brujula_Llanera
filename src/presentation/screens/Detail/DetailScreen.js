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
import { useLogVisit } from '../../../shared/context/LogVisitContext';

const DetailScreen = ({ navigation, route }) => {
  const API_KEY = Constants.manifest?.extra?.GOOGLE_PLACES_API_KEY || Constants.expoConfig?.extra?.GOOGLE_PLACES_API_KEY;
  
  const idPlace = route?.params?.idPlace ?? route?.params?.placeId ?? 2;
  const googlePlaceData = route?.params?.place; // Datos del mapa de Google Places
  const { logVisit } = useLogVisit();
  const [placeDetail, setPlaceDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Función para obtener detalles completos de Google Places
  const getGooglePlaceDetails = async (placeId) => {
    if (!API_KEY || !placeId) return null;
    
    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=name,rating,user_ratings_total,formatted_address,photos,formatted_phone_number,website&key=${API_KEY}`;
    
    const response = await fetch(url);
    const data = await response.json();
    
    if (data.status === 'OK' && data.result) {
      return data.result;
    }
    
    return null;
  };

  useEffect(() => {
    const fetchData = async () => {
      // Primero, intentar obtener datos de la API local si tenemos un ID
      let localData = null;
      if (idPlace && idPlace !== 2) { // 2 es el valor por defecto cuando no hay ID real
        const api = new PlaceDetailApi();
        const datasource = new PlaceDetailDatasource(api);
        const repository = new PlaceDetailRepository(datasource);
        const useCase = new GetPlaceDetailUseCase(repository);

        localData = await useCase.execute(idPlace);
        
        // Si encontramos datos locales, usarlos y terminar
        if (localData && localData.name) {
          setPlaceDetail(localData);
          logVisit(idPlace);
          setLoading(false);
          return;
        }
      }
      
      // Si NO hay datos locales y tenemos datos de Google Places, usarlos
      if (googlePlaceData) {
        let rating = googlePlaceData.rating || 0;
        let phoneNumber = "Información no disponible";
        let website = "Información no disponible";
        
        // Si tenemos place_id, obtener detalles completos de Google
        if (googlePlaceData.id || googlePlaceData.place_id) {
          const googleDetails = await getGooglePlaceDetails(googlePlaceData.id || googlePlaceData.place_id);
          
          if (googleDetails) {
            rating = googleDetails.rating || rating;
            phoneNumber = googleDetails.formatted_phone_number || phoneNumber;
            website = googleDetails.website || website;
          }
        }
        
        // Crear un objeto similar al formato de la API local usando datos de Google
        const googlePlaceDetail = {
          name: googlePlaceData.name,
          category: googlePlaceData.category || "Lugar",
          description: googlePlaceData.address || "Información no disponible",
          rating: rating,
          images: googlePlaceData.image ? [{
            categoryId: 3,
            url: googlePlaceData.image
          }] : [],
          socialMedia: [
            { typeSocialMediaId: "3", value: phoneNumber },
            { typeSocialMediaId: "4", value: website }
          ],
        };
        
        setPlaceDetail(googlePlaceDetail);
        setLoading(false);
        return;
      }
      
      // Si llegamos aquí, no hay datos locales ni de Google
      // Como última opción, intentar cargar con ID por defecto
      if (!localData) {
        const api = new PlaceDetailApi();
        const datasource = new PlaceDetailDatasource(api);
        const repository = new PlaceDetailRepository(datasource);
        const useCase = new GetPlaceDetailUseCase(repository);

        const data = await useCase.execute(2); // ID por defecto
        setPlaceDetail(data);
        setLoading(false);
      }
    };

    fetchData();
  }, [idPlace, logVisit, googlePlaceData]);

  const handleBackPress = () => {
    navigation.goBack();
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error || !placeDetail) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>
          {error || "Error al cargar los datos"}
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
        name={placeDetail.name}
        category={placeDetail.category}
        onBackPress={handleBackPress}
        placeId={idPlace}
      />
      <View style={styles.rating}>
        <Rating average={placeDetail.rating} />
      </View>

      <GalleryImage images={galleryImages} />

      <DetailInfo
        description={placeDetail.description}
        phoneNumber={contactInfo?.phone || "Información no disponible"}
        mail={contactInfo?.mail || "Información no disponible"}
        navigation={navigation}
        placeId={idPlace}
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
  },
});

export default DetailScreen;