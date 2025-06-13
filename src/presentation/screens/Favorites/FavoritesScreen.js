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
  const initialLoadRef = useRef(false);

  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth?.user);
  const favoritesState = useSelector(state => state.favorites || {});
  const favorites = favoritesState.favorites || [];

  useEffect(() => {
    if (!user?.id || initialLoadRef.current) return;

    const loadFavorites = async () => {
      setLoading(true);
      initialLoadRef.current = true;
      await dispatch(fetchFavorites(user.id));
      setLoading(false);
    };

    loadFavorites();
  }, [dispatch, user]);

  useEffect(() => {
    if (favoritesState.status === 'succeeded' || favoritesState.status === 'idle') {
      setFavoritePlaces(favorites);
      setLoading(false);
    } else if (favoritesState.status === 'failed') {
      setError(favoritesState.error || 'Error al cargar favoritos');
      setLoading(false);
    }
  }, [favoritesState.status, favorites]);

  const handleLocalRemove = (idPlace) => {
    if (!idPlace) return;

    setFavoritePlaces(currentPlaces =>
      currentPlaces.filter(place => {
        const currentPlaceId = place.idPlace || place.idPlaceFk;
        return String(currentPlaceId) !== String(idPlace);
      })
    );
  };

  const renderItem = ({ item }) => {
    const idPlace = item.idPlace || item.idPlaceFk;

    return (
      <View style={styles.card}>
        <VerticalPlaceCard
          NameCard={item.name}
          ImagenPlaceCard={item.imageUrl || 'https://via.placeholder.com/150'}
          ratingStars={item.rating}
          imageCategoryName={item.categoryName || "Lugar"}
          idPlace={idPlace}
          onPress={() => {
            navigation.navigate("DetailScreen", { idPlace });
          }}
          onRemoveFavorite={handleLocalRemove}
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

        {!favoritePlaces || favoritePlaces.length === 0 ? (
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
    paddingVertical: 0,
  },
  favoritesContainer: {
    marginTop: 0,
    marginBottom: 10,
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
    padding: 10,
  },
  loadingText: {
    ...TextStyles.PoppinsRegular15,
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
    paddingTop: 15,
  }
});

export default FavoritesScreen;
