import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import MainHeader from '../../components/MainHeader/CustomMainHeader ';
import { GetPlacesByTagsUseCase } from '../../../domain/usecases/places/GetPlacesByTagsUseCase';
import { GetPlacesByCategoryUseCase } from '../../../domain/usecases/places/GetPlacesByCategoryUseCase';
import { GetPlacesMoreVisitedUseCase } from '../../../domain/usecases/places/GetPlacesMoreVisitedUseCase';
import { providePlacesByTagsRepository, providePlacesByCategoryRepository, providePlacesMoreVisitedRepository } from '../../../data/repositories/places/ProvidePlacesRepository';
import { GetPlaceDetailUseCase } from '../../../domain/usecases/placeDetail/GetPlaceDetailUseCase';
import { providePlaceDetailRepository } from '../../../data/repositories/places/ProvidePlaceDetailRepository';
import { GetTagsUseCase } from '../../../domain/usecases/tags/GetTagsUseCase';
import { provideTagsRepository } from '../../../data/repositories/Tags/ProvideTagsRepository';


const HomeScreen = () => {
    useEffect(() => {
        const loadData = async () => {
            try {
                // Cargar lugares por tags
                const tagRepository = providePlacesByTagsRepository();
                const tagUseCase = new GetPlacesByTagsUseCase(tagRepository);
                const tagResult = await tagUseCase.execute();
                console.log("✅ Lugares por tags cargados:", tagResult);

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

    const [tags, setTags] = useState([]);

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

    return (
        <View style={styles.container}>
            <MainHeader username={'Username'} />
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={styles.textScreens}>
                    <Text>
                        <Text style={styles.colorPrimary}>Recomendados</Text>
                        <Text style={styles.normalText}> de la Semana</Text>
                    </Text>
                </View>

                <View style={styles.body}>
                    <Text style={styles.title}>Bienvenido a la Brújula Llanera</Text>
                    <Image source={require('../../../shared/assets/AvatarHeader.png')} />
                    <Text style={styles.subtitle}>Descubre los mejores lugares del llano</Text>
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
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