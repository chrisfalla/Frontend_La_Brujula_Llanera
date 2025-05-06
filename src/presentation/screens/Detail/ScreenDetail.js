import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { GetPlaceDetailUseCase } from '../../../domain/usecases/placeDetail/GetPlaceDetailUseCase';
import { providePlaceDetailRepository } from '../../../data/repositories/places/ProvidePlaceDetailRepository';
import HeaderDetail from '../../components/DetailPlaces/HeaderDetail';
import Gallery from '../../components/DetailPlaces/Gallery';
import InfoDetail from '../../components/DetailPlaces/InfoDetail';

const DetailScreen = ({ navigation }) => {
    const [placeDetail, setPlaceDetail] = useState(null);

    useEffect(() => {
        const loadPlaceDetail = async () => {
            const repository = providePlaceDetailRepository();
            const useCase = new GetPlaceDetailUseCase(repository);
            const detail = await useCase.execute("1"); // ID del lugar que queremos mostrar
            setPlaceDetail(detail);
        };

        loadPlaceDetail();
    }, []);

    if (!placeDetail) {
        return null; // o un componente de carga
    }

    const handleBackPress = () => {
        navigation.goBack();
    };

    return (
        <ScrollView style={styles.container}>
            <HeaderDetail
                mainImage={placeDetail.mainImage}
                name={placeDetail.name}
                category="Gastronomía" // Esto debería venir de una tabla de categorías
                onBackPress={handleBackPress}
            />
            <Gallery images={placeDetail.secondaryImages} />
            <InfoDetail 
                description={placeDetail.description}
                coordinates={placeDetail.coordinates}
            />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});

export default DetailScreen;