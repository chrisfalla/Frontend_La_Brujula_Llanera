import React, { createContext, useContext, useState, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LogVisitContext = createContext();

export const LogVisitProvider = ({ children }) => {
  const [visitedPlaces, setVisitedPlaces] = useState([]);

  // Cargar visitas guardadas al iniciar
  React.useEffect(() => {
    const loadVisits = async () => {
      try {
        const storedVisits = await AsyncStorage.getItem('visitedPlaces');
        if (storedVisits) {
          setVisitedPlaces(JSON.parse(storedVisits));
        }
      } catch (error) {
        console.error('Error loading visited places:', error);
      }
    };
    
    loadVisits();
  }, []);

  // Función para registrar una visita a un lugar
  const logVisit = useCallback(async (placeId) => {
    try {
      const now = new Date().toISOString();
      const newVisitedPlaces = [...visitedPlaces];
      
      // Verificar si el lugar ya ha sido visitado
      const existingIndex = newVisitedPlaces.findIndex(visit => visit.placeId === placeId);
      
      if (existingIndex >= 0) {
        // Actualizar la fecha de la última visita
        newVisitedPlaces[existingIndex].lastVisit = now;
        newVisitedPlaces[existingIndex].visitCount += 1;
      } else {
        // Agregar nuevo lugar visitado
        newVisitedPlaces.push({
          placeId,
          firstVisit: now,
          lastVisit: now,
          visitCount: 1
        });
      }
      
      setVisitedPlaces(newVisitedPlaces);
      await AsyncStorage.setItem('visitedPlaces', JSON.stringify(newVisitedPlaces));
      
      return true;
    } catch (error) {
      console.error('Error logging visit:', error);
      return false;
    }
  }, [visitedPlaces]);

  // Obtener información de visitas para un lugar específico
  const getPlaceVisits = useCallback((placeId) => {
    return visitedPlaces.find(visit => visit.placeId === placeId) || null;
  }, [visitedPlaces]);

  return (
    <LogVisitContext.Provider value={{ visitedPlaces, logVisit, getPlaceVisits }}>
      {children}
    </LogVisitContext.Provider>
  );
};

export const useLogVisit = () => {
  const context = useContext(LogVisitContext);
  if (!context) {
    throw new Error('useLogVisit must be used within a LogVisitProvider');
  }
  return context;
};
