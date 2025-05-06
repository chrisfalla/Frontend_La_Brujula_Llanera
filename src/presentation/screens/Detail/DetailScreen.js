import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import ImageMainDetail from '../../components/DetailPlaces/ImageMainDetail';
import Gallery from '../../components/DetailPlaces/Gallery';
import InfoDetail from '../../components/DetailPlaces/InfoDetail';

const DetailScreen = ({ navigation }) => {
    const [placeDetail, setPlaceDetail] = useState(null);
    const [categoryName, setCategoryName] = useState('');

    useEffect(() => {
        const loadPlaceDetail = async () => {
            const repository = providePlaceDetailRepository();
            const useCase = new GetPlaceDetailUseCase(repository);
            const detail = await useCase.execute("1"); // ID del lugar que queremos mostrar
            setPlaceDetail(detail);
            // Buscar nombre de la categoría
            if (detail && detail.idCategorie) {
                const catRepo = provideCategoryRepository();
                const catUseCase = new GetCategoriesUseCase(catRepo);
                const categories = await catUseCase.execute();
                const found = categories.find(cat => cat.idCategory === detail.idCategorie);
                setCategoryName(found ? found.name : '');
            }
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
            <ImageMainDetail
                mainImage={placeDetail.mainImage}
                name={placeDetail.name}
                category="Gastronomía" // Esto debería venir de una tabla de categorías
                category={categoryName}
                onBackPress={handleBackPress}
            />
            <Gallery images={placeDetail.secondaryImages} />
            <InfoDetail 
                description={placeDetail.description}
                coordinates={placeDetail.coordinates}
                phoneNumber={placeDetail.phoneNumber}
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