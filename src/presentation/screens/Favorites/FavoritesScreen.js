import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import NavigationTopBar from '../../components/NavigationTopBar/NavigationTopBar';
import VerticalPlaceCard from '../../components/VerticalPlaceCard/VerticalPlaceCard';
import { GlobalStyles, TextStyles, Colors } from '../../styles/styles';
import { getDefaultFavoritesUseCase } from '../../../domain/usecases/favorites/getDefaultFavoritesUseCase';

const FavoritesScreen = ({ navigation }) => {
  const [favoritePlaces, setFavoritePlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        console.log('🔍 Fetching favorite places...');
        setLoading(true);
        const favorites = await getDefaultFavoritesUseCase();
        console.log('✅ Favorites received:', favorites);
        setFavoritePlaces(favorites);
      } catch (err) {
        console.error('❌ Error fetching favorites:', err);
        setError('No se pudieron cargar los favoritos');
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <VerticalPlaceCard
        NameCard={item.name}
        ImagenPlaceCard={item.imageUrl}
        ratingStars={item.rating}
        imageCategoryName={item.categoryName}
        onPress={() => {
          console.log('Pressed favorite:', item.name);
        }}
      />
    </View>
  );

  if (loading) {
    return (
      <View style={styles.container}>
        <NavigationTopBar
          title="Mis favoritos"
          SecondIcon={null}
          primaryIcon="chevron-back"
          useBackground={false}
          onBackPress={() => navigation.goBack()}
          navigation={navigation}
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
          navigation={navigation}
        />
        <View style={styles.centerContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <NavigationTopBar
        title="Mis favoritos"
        SecondIcon={null}
        primaryIcon="chevron-back"
        useBackground={false}
        onBackPress={() => navigation.goBack()}
        navigation={navigation}
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
            item.idPlace?.toString() || Math.random().toString()
          }
          numColumns={2}
          renderItem={renderItem}
          contentContainerStyle={styles.scrollView}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollView: {
    padding: 10,
    justifyContent: 'center',
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
    width: '50%',
    margin: '1%',
  },
});

export default FavoritesScreen;
