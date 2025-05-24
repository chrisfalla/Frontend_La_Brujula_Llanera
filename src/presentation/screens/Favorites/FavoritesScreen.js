import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  Button,
  ScrollView
} from 'react-native';
import NavigationTopBar from '../../components/NavigationTopBar/NavigationTopBar';
import VerticalPlaceCard from '../../components/VerticalPlaceCard/VerticalPlaceCard';
import { GlobalStyles, TextStyles, Colors } from '../../styles/styles';
import { getFavoritesUseCase } from '../../../domain/usecases/favorites/getFavoritesUseCase';
import { useSelector } from 'react-redux'; // Cambiado de "@/redux/store" a "react-redux"


const FavoritesScreen = ({ navigation }) => {
  const [favoritePlaces, setFavoritePlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const userId = useSelector((state) => state.auth.user?.id);


  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        console.log('🔍 Fetching favorite places...');
        setLoading(true);
        const favorites = await getFavoritesUseCase(userId);

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
  
  const user = useSelector(state => state.auth.user);
useEffect(() => {
  console.log("👤 Usuario actual desde Redux:", user);
}, [user]);

  // Test API connection directly
  useEffect(() => {
    const testAPI = async () => {
      try {
        console.log('🧪 Testing API connection directly...');
        const userId = user?.id || 44;
        
        // Usando fetch nativo para evitar cualquier problema con httpClient
        const response = await fetch(`https://backend-la-brujula-llanera.onrender.com/favorites/${userId}`);
        const data = await response.json();
        
        console.log('🧪 Direct API response:', data);
        
        if (data && data.places && data.places.length > 0) {
          console.log('✅ La API devuelve datos correctamente.');
          
          // Extraer y mostrar URLs de imágenes para diagnóstico
          data.places.forEach(place => {
            console.log(`📸 Imagen para ${place.name}:`, 
              place.image?.url || 
              place.image?.imageUrl || 
              JSON.stringify(place.image)
            );
          });
        } else {
          console.log('⚠️ La API devuelve un array vacío o no tiene estructura places.');
        }
      } catch (error) {
        console.error('❌ Error en prueba directa API:', error);
      }
    };
    
    testAPI();
  }, [user]);

  // Función para renderizar cada favorito
  const renderItem = ({ item }) => {
    // Añadimos log para verificar las imágenes
    console.log(`🖼️ Renderizando item ${item.name} con imagen: ${item.imageUrl}`);
    
    return (
      <View style={styles.card}>
        <VerticalPlaceCard
          NameCard={item.name}
          ImagenPlaceCard={item.imageUrl || 'https://via.placeholder.com/150'} // Imagen de respaldo
          ratingStars={item.rating}
          imageCategoryName={item.categoryName || "Lugar"}
          onPress={() => {
            console.log('Pressed favorite:', item.name);
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
      <View style={styles.favoritesContainer}>
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
          columnWrapperStyle={styles.columnWrapper} // Añadimos este estilo
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
    justifyContent: 'space-between', // Distribuye el espacio entre las columnas
    marginHorizontal: 5, // Margen horizontal uniforme
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
    width: '49%', // Ligeramente menos para dejar espacio entre cards
    marginVertical: 5, // Margen vertical uniforme
  },
});

export default FavoritesScreen;
