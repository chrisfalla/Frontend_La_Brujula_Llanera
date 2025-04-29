import React, { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Header from '../../components/Header';
import { MostVisitedPlaces } from '../../components/MostVisitedPlaces/MostVisitedPlaces';
import { GetPlacesByTagsUseCase } from '../../../domain/usecases/places/GetPlacesByTagsUseCase';
import { GetPlacesByCategoryUseCase } from '../../../domain/usecases/places/GetPlacesByCategoryUseCase';
import { GetPlacesMoreVisitedUseCase } from '../../../domain/usecases/places/GetPlacesMoreVisitedUseCase';
import { providePlacesByTagsRepository, providePlacesByCategoryRepository, providePlacesMoreVisitedRepository } from '../../../data/repositories/places/ProvidePlacesRepository';
import { GetPlaceDetailUseCase } from '../../../domain/usecases/placeDetail/GetPlaceDetailUseCase';
import { providePlaceDetailRepository } from '../../../data/repositories/places/ProvidePlaceDetailRepository';
import { GetTagsUseCase } from '../../../domain/usecases/tags/GetTagsUseCase';
import { provideTagsRepository } from '../../../data/repositories/Tags/ProvideTagsRepository';
import { HorizontalCardPlaceList } from '../../components/HorizontalCardPlace/HorizontalCardPlace';

const HomeScreen = () => {
    const navigation = useNavigation();
    const [placesByTags, setPlacesByTags] = useState([]);
    const [tags, setTags] = useState([]);
    const [mostVisitedPlaces, setMostVisitedPlaces] = useState([]);

    useEffect(() => {
        const loadData = async () => {
            try {
                // Cargar lugares por tags
                const tagRepository = providePlacesByTagsRepository();
                const tagUseCase = new GetPlacesByTagsUseCase(tagRepository);
                const tagResult = await tagUseCase.execute();
                console.log("✅ Lugares por tags cargados:", tagResult);
                setPlacesByTags(tagResult);

                // Cargar lugares por categoría
                const categoryRepository = providePlacesByCategoryRepository();
                const categoryUseCase = new GetPlacesByCategoryUseCase(categoryRepository);
                const categoryResult = await categoryUseCase.execute();
                console.log("✅ Lugares por categoría cargados:", categoryResult);

                // Cargar lugares más visitados
                const visitedRepository = providePlacesMoreVisitedRepository();
                const visitedUseCase = new GetPlacesMoreVisitedUseCase(visitedRepository);
                const visitedResult = await visitedUseCase.execute();
                console.log("✅ Lugares más visitados cargados:", visitedResult);
                setMostVisitedPlaces(visitedResult);

                // Cargar detalle de lugar (sólo para mock, sin UI)
                const detailRepository = providePlaceDetailRepository();
                const detailUseCase = new GetPlaceDetailUseCase(detailRepository);
                const detailResult = await detailUseCase.execute("6"); // ID de ejemplo
                console.log("✅ Detalle de lugar cargado:", detailResult);
            } catch (error) {
                console.error("Error cargando datos:", error);
            }
        };

        loadData();
    }, []);

    useEffect(() => {
        const loadTags = async () => {
            console.log("🚀 Ejecutando GetTagsUseCase...");
            const repository = provideTagsRepository();
            const useCase = new GetTagsUseCase(repository);
            const result = await useCase.execute();
            console.log("✅ Tags cargados:", result);
            setTags(result);
        };
        loadTags();
    }, []);

    const handleMapPress = (item) => {
        console.log('Map pressed for:', item.name);
    };

    const handleDetailPress = (item) => {
        console.log('Detail pressed for:', item.name);
    };

    const handlePlacePress = (place) => {
        navigation.navigate('PlaceDetail', { placeId: place.idPlace });
    };

    const ListHeader = () => (
        <MostVisitedPlaces places={mostVisitedPlaces} onPlacePress={handlePlacePress} />
    );

    return (
        <View style={styles.container}>
            <Header />
            <FlatList
                ListHeaderComponent={ListHeader}
                data={[]}
                renderItem={null}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.content}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    content: {
        flexGrow: 1,
    },
    scrollContent: {
        flexGrow: 1,
        paddingBottom: 20,
    },
    textScreens: {
        padding: 10,
        alignItems: 'center',
        marginBottom: 10,
    },
    colorPrimary: {
        fontSize: 22,
        fontWeight: '900',
        color: '#236A34',
    },
    normalText: {
        fontSize: 22,
        fontWeight: '900',
        color: '#000',
    },
    body: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    subtitle: {
        marginTop: 20,
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
        marginBottom: 30,
    }
});

export default HomeScreen;