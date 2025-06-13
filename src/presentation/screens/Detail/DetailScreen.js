import React, { useEffect, useState } from "react";
import {
  StatusBar,
  StyleSheet,
  ScrollView,
  View,
  ActivityIndicator,
  Text,
} from "react-native";
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
  const idPlace = route?.params?.idPlace ?? 2;
  const { logVisit } = useLogVisit();
  const [placeDetail, setPlaceDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const api = new PlaceDetailApi();
        const datasource = new PlaceDetailDatasource(api);
        const repository = new PlaceDetailRepository(datasource);
        const useCase = new GetPlaceDetailUseCase(repository);

        const data = await useCase.execute(idPlace);
        setPlaceDetail(data);
        logVisit(idPlace);
      } catch (err) {
        console.error("Error loading data:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [idPlace, logVisit]);

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
  )?.url;
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
  }, {});

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
        phoneNumber={contactInfo?.phone || "3001234567"}
        mail={contactInfo?.mail || "contacto@ejemplo.com"}
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
