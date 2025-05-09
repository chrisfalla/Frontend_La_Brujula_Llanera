import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'; // Asegúrate de importar estos hooks
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import { fetchCategories } from '../../../shared/store/categoriesSlice/categoriesSlice'; // Asegúrate de importar la acción correcta
import MainHeader from '../../components/MainHeader/MainHeader';
import MostVisitedPlaces from '../../components/MostVisitedPlaces/MostVisitedPlaces';

const HomeScreen = () => {
    const dispatch = useDispatch(); // Usa useDispatch en el cuerpo del componente
    const { all, status } = useSelector(state => state.categories); // Usa useSelector en el cuerpo del componente

    useEffect(() => {
        dispatch(fetchCategories()); // Dispara la acción para cargar categorías cuando el componente se monta
    }, [dispatch]); // Dependencia de dispatch para evitar un ciclo infinito

    // Filtramos las categorías por las que tienen isDefault: true
    const defaultCategories = all.filter(cat => cat.isDefault);

    if (status === 'loading') return <Text>Cargando...</Text>;

    return (
        <View style={styles.container}>
            <MainHeader username={'Christofer'} />
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

                {/* Mostrar las categorías predeterminadas */}
                <View style={styles.categoryList}>
                    {defaultCategories.map((category, index) => (
                        <Text key={index}>{category.name}</Text>
                    ))}
                </View>

                {/* Mostrar los lugares más visitados */}
                <MostVisitedPlaces />

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
    },
    categoryList: {
        marginTop: 20,
        padding: 10,
    }
});

export default HomeScreen;
