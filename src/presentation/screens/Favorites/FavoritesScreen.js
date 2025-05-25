import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  FlatList
} from 'react-native';
import NavigationTopBar from '../../components/NavigationTopBar/NavigationTopBar';
import VerticalPlaceCard from '../../components/VerticalPlaceCard/VerticalPlaceCard';
import { GlobalStyles, TextStyles, Colors } from '../../styles/styles';
import { useSelector, useDispatch } from 'react-redux';
import { fetchFavorites } from '../../../shared/store/favoritesSlice/favoritesSlice';

const FavoritesScreen = ({ navigation }) => {
  const [favoritePlaces, setFavoritePlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Usar una variable de referencia para evitar cargas repetidas
  const initialLoadRef = useRef(false);

  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.user?.id);
  const favoritesState = useSelector(state => state.favorites);

  // Efecto para cargar los favoritos solo una vez al inicio
  useEffect(() => {
    if (!userId || initialLoadRef.current) return;
    
    const loadFavorites = async () => {
      try {
        console.log('🔍 [FavoritesScreen] Cargando favoritos iniciales para usuario:', userId);
        setLoading(true);
        
        // Marcar como ya cargado para evitar bucles
        initialLoadRef.current = true;
        
        // Cargar favoritos una sola vez
        await dispatch(fetchFavorites(userId));
      } catch (err) {
        console.error('❌ [FavoritesScreen] Error al cargar favoritos:', err);
        setError('No se pudieron cargar los favoritos');
      } finally {
        setLoading(false);
      }
    };

    loadFavorites();
  }, [dispatch, userId]);

  // Actualizar el estado local cuando cambia el estado global de favoritos
  useEffect(() => {
    // Solo actualizamos si ya se completó una carga
    if (favoritesState.status === 'succeeded') {
      console.log(`♻️ [FavoritesScreen] Estado de favoritos actualizado: ${favoritesState.favorites.length}`);
      setFavoritePlaces(favoritesState.favorites);
      setLoading(false);
    } else if (favoritesState.status === 'failed') {
      setError(favoritesState.error || 'Error al cargar favoritos');
      setLoading(false);
    }
  }, [favoritesState.status, favoritesState.favorites.length]);

  // Función para renderizar cada favorito
  const renderItem = ({ item }) => {
    console.log(`🖼️ [FavoritesScreen] Renderizando favorito: ${item.name}, ID: ${item.idPlace || item.idPlaceFk}`);
    
    return (
      <View style={styles.card}>
        <VerticalPlaceCard
          NameCard={item.name}
          ImagenPlaceCard={item.imageUrl || 'https://via.placeholder.com/150'}
          ratingStars={item.rating}
          imageCategoryName={item.categoryName || "Lugar"}
          idPlace={item.idPlace || item.idPlaceFk} // Asegurarnos de pasar el ID correctamente
          onPress={() => {
            console.log('Pressed favorite:', item.name);
            navigation.navigate("DetailScreen", { placeId: item.idPlace || item.idPlaceFk });
          }}
        />
      </View>
    );
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <NavigationTopBar
          title="Mis favoritos"
          SecondIcon={null}
          primaryIcon="chevron-back"
          useBackground={false}
          onBackPress={() => navigation.goBack()}
        />
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color={Colors.ColorPrimary} />
          <Text style={styles.loadingText}>Cargando favoritos...</Text>
        </View>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <NavigationTopBar
          title="Mis favoritos"
          SecondIcon={null}
          primaryIcon="chevron-back"
          useBackground={false}
          onBackPress={() => navigation.goBack()}
        />
        <View style={styles.centerContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.favoritesContainer}>
        <NavigationTopBar
          title="Mis favoritos"
          SecondIcon={null}
          primaryIcon="chevron-back"
          useBackground={false}
          onBackPress={() => navigation.goBack()}
        />

        {favoritePlaces.length === 0 ? (
          <View style={styles.centerContainer}>
            <Text style={styles.emptyText}>
              No tienes lugares favoritos guardados
            </Text>
          </View>
        ) : (
          <FlatList
            data={favoritePlaces}
            keyExtractor={(item) =>
              (item.idPlace || item.idPlaceFk)?.toString() || Math.random().toString()
            }
            numColumns={2}
            renderItem={renderItem}
            contentContainerStyle={styles.scrollView}
            columnWrapperStyle={styles.columnWrapper}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingVertical: 10,
  },
  favoritesContainer: {
    marginTop: 12,
    marginBottom: 50,
    position: 'static'
  },
  columnWrapper: {
    justifyContent: 'space-between',
    marginHorizontal: 5,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    ...TextStyles.PoppinsMedium16,
    color: Colors.TextSecondary || Colors.DarkGray,
    textAlign: 'center',
    width: '100%',
    padding: 20,
  },
  loadingText: {
    ...TextStyles.PoppinsRegular14,
    color: Colors.TextSecondary || Colors.DarkGray,
    marginTop: 8,
  },
  errorText: {
    ...TextStyles.PoppinsMedium16,
    color: Colors.ColorError || 'red',
    textAlign: 'center',
  },
  card: {
    width: '49%',
    marginVertical: 5,
  },
  scrollView: {
    paddingHorizontal: 10,
    paddingBottom: 20,
  }
});

export default FavoritesScreen;
