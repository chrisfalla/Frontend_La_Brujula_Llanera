import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { fetchFavorites } from '../../../shared/store/favoritesSlice/favoritesSlice';
import NavigationTopBar from '../../components/NavigationTopBar/NavigationTopBar';
import CategoryCardSmall from '../../components/CategoryCardSmall/CategoryCardSmall'; 

const FavoritesScreen = ({ navigation }) => {
    const dispatch = useDispatch();
    const favorites = useSelector((state) => state.favorites?.favorites || []);
    const loading = useSelector((state) => state.favorites?.loading);
    const error = useSelector((state) => state.favorites?.error);

    useEffect(() => {
        dispatch(fetchFavorites());
    }, [dispatch]);

    const handleCardPress = (category) => {
        navigation.navigate('CategoryDetails', { category });
    };

    return (
        <View style={styles.container}>
            <NavigationTopBar 
            SecondIcon={null}
            useBackground={false}
            title="Favoritos" />

            
            <ScrollView contentContainerStyle={styles.scrollView}>
                {loading && <Text>Cargando...</Text>}
                {error && <Text>Error al cargar los favoritos</Text>}
                {favorites.map((category) => (
                    <CategoryCardSmall
                        key={category.id}
                        nameCategory={category.name}
                        iconCategory={category.icon}
                        isSelectedCategory={false} // Cambia esto según tu lógica
                        onPressCard={handleCardPress}
                    />
                ))}
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
        padding: 16,
    },
});
export default FavoritesScreen;


