import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { fetchFavorites } from '../../../shared/store/favoritesSlice/favoritesSlice';
import NavigationTopBar from '../../components/NavigationTopBar/NavigationTopBar';
import VerticalPlaceCard from '../../components/VerticalPlaceCard/VerticalPlaceCard';

const FavoritesScreen = ({ navigation }) => {
    const dispatch = useDispatch();
    const favorites = useSelector((state) => state.favorites?.favorites || []);
    const loading = useSelector((state) => state.favorites?.loading);
    const error = useSelector((state) => state.favorites?.error);

    useEffect(() => {
        console.log("Despachando fetchFavorites en FavoritesScreen");
        dispatch(fetchFavorites());
    }, [dispatch]);

    const handleCardPress = (item) => {
        console.log("Elemento seleccionado:", item);
        navigation.navigate('CategoryDetails', { category: item });
    };

    console.log("Renderizando favoritos:", favorites);

    return (
        <View style={styles.container}>
            <NavigationTopBar 
                SecondIcon={null}
                useBackground={false}
                title="Favoritos" 
            />
            
            <ScrollView contentContainerStyle={styles.scrollView}>
                {loading && <Text style={styles.message}>Cargando...</Text>}
                {error && <Text style={styles.errorMessage}>Error al cargar los favoritos: {error}</Text>}
                {favorites && favorites.length > 0 ? (
                    favorites.map((item) => (
                        <VerticalPlaceCard
                            key={item.id}
                            title={item.name || `Lugar ${item.id.substring(0, 4)}`}
                           
                            category={item.categoryId || 'General'}
                            location="Llanos Orientales"
                            rating={4.5}
                            onPress={() => handleCardPress(item)}
                        />
                    ))
                ) : (
                    !loading && <Text style={styles.message}>No hay favoritos disponibles</Text>
                )}
            </ScrollView>
        </View>
    );
}; 

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 10,
    },
    scrollView: {
        padding: 10,
        flexDirection: 'column',
    },
    message: {
        textAlign: 'center',
        padding: 20,
        fontSize: 16,
    },
    errorMessage: {
        textAlign: 'center',
        padding: 20,
        fontSize: 16,
        color: 'red',
    }
});

export default FavoritesScreen;


