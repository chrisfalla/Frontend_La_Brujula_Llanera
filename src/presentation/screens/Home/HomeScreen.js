import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    View,
    Text,
    StyleSheet,
    ActivityIndicator,
    ScrollView,
    FlatList,
} from 'react-native';

import { fetchCategories } from '../../../shared/store/categoriesSlice/categoriesSlice';
import useMostVisitedPlaces from '../../hooks/places/useMostVisitedPlaces';

import MainHeader from '../../components/MainHeader/MainHeader';
import MostVisitedPlaces from '../../components/MostVisitedPlaces/MostVisitedPlaces';

const HomeScreen = () => {
    const dispatch = useDispatch();
    const { all, status } = useSelector(state => state.categories);
    const { places, loading, error } = useMostVisitedPlaces();

    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);

    const defaultCategories = Array.isArray(all) ? all.filter(cat => cat.isDefault) : [];

    if (status === 'loading') return <Text>Cargando...</Text>;
    if (loading) return <ActivityIndicator size="large" color="#0000ff" />;
    if (error) return <Text>Error al cargar lugares: {String(error)}</Text>;


    return (
        <View style={styles.container}>
            <MainHeader username={'Christofer'} />
            <ScrollView contentContainerStyle={styles.scrollContent}>
                {/* Categorías predeterminadas */}
                <View style={styles.categoryList}>
                    {defaultCategories.map((category, index) => (
                        <Text key={index}>{category.name}</Text>
                    ))}
                </View>

                {/* Lugares más visitados */}
                <View style={{ padding: 16 }}>
                    <Text style={styles.sectionTitle}>Lugares Más Visitados</Text>
                    <FlatList
                        data={places || []} // Asegura que siempre sea un arreglo
                        keyExtractor={item => item.idPlace.toString()} // Utiliza idPlace como key
                        horizontal
                        renderItem={({ item }) => (
                            <MostVisitedPlaces
                                place={item}
                                onPress={() => console.log('Ver más sobre:', item.placeName)}
                            />
                        )}
                        showsHorizontalScrollIndicator={false}
                    />

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
    categoryList: {
        marginTop: 20,
        padding: 10,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
});

export default HomeScreen;