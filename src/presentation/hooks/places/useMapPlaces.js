import { useState, useEffect, useCallback } from 'react';
import { searchPlacesUseCase } from '../../../domain/usecases/places/searchPlacesUseCase';
import { getPlaceDetailsUseCase } from '../../../domain/usecases/places/getPlaceDetailsUseCase';
import { getMostVisitedPlacesUseCase } from '../../../domain/usecases/places/getMostVisitedPlacesUseCase';

const useMapPlaces = () => {
  const [defaultPlaces, setDefaultPlaces] = useState([]);
  const [filteredPlaces, setFilteredPlaces] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [error, setError] = useState(null);

  // Cargar lugares por defecto al inicializar
  useEffect(() => {
    const fetchDefaultPlaces = async () => {
      setLoading(true);
      try {
        const places = await getMostVisitedPlacesUseCase();
        setDefaultPlaces(places || []);
        setFilteredPlaces(places || []);
      } catch (err) {
        console.error('Error fetching default places:', err);
        setError('Error al cargar lugares');
        setDefaultPlaces([]);
        setFilteredPlaces([]);
      } finally {
        setLoading(false);
      }
    };

    fetchDefaultPlaces();
  }, []);

  // Función para buscar lugares
  const searchPlaces = useCallback(async (query, location) => {
    if (!query.trim()) {
      setFilteredPlaces(defaultPlaces);
      setSelectedPlace(null);
      return defaultPlaces;
    }

    setLoading(true);
    setError(null);
    
    try {
      const locationStr = location 
        ? `${location.latitude},${location.longitude}` 
        : '5.3396,-72.4058'; // Ubicación por defecto
      
      const results = await searchPlacesUseCase(query, locationStr);
      setFilteredPlaces(results);
      
      // Seleccionar el primer resultado si existe
      if (results && results.length > 0) {
        setSelectedPlace(results[0]);
      } else {
        setSelectedPlace(null);
      }
      
      return results;
    } catch (err) {
      console.error('Error searching places:', err);
      setError('Error en la búsqueda');
      setFilteredPlaces([]);
      setSelectedPlace(null);
      return [];
    } finally {
      setLoading(false);
    }
  }, [defaultPlaces]);

  // Función para obtener detalles de un lugar
  const getPlaceDetails = useCallback(async (placeId) => {
    if (!placeId) return null;

    setLoading(true);
    try {
      const details = await getPlaceDetailsUseCase(placeId);
      return details;
    } catch (err) {
      console.error('Error getting place details:', err);
      setError('Error al obtener detalles del lugar');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  // Limpiar búsqueda
  const clearSearch = useCallback(() => {
    setSearchValue('');
    setFilteredPlaces(defaultPlaces);
    setSelectedPlace(null);
    setError(null);
  }, [defaultPlaces]);

  // Actualizar valor de búsqueda
  const updateSearchValue = useCallback((value) => {
    setSearchValue(value);
    if (value.trim() === '') {
      setFilteredPlaces(defaultPlaces);
      setSelectedPlace(null);
    }
  }, [defaultPlaces]);

  return {
    // Estados
    defaultPlaces,
    filteredPlaces,
    searchValue,
    loading,
    selectedPlace,
    error,
    
    // Funciones
    searchPlaces,
    getPlaceDetails,
    clearSearch,
    updateSearchValue,
    setSelectedPlace,
    setFilteredPlaces
  };
};

export default useMapPlaces;
