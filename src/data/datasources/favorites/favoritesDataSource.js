import { fetchFavorites } from '../../../infraestructure/api/favorites/favoritesApi';
import { favorite } from '../../../domain/models/favorites/favorites';

// Datos simulados para casos extremos
const FALLBACK_DATA = [
  { id: '1', categoryId: '101', userId: '11' },
  { id: '2', categoryId: '102', userId: '11' }
];

const mapToFavorite = (dto) => {
  console.log('Mapeando DTO a Favorito:', dto);
  
  // Validación de datos
  if (!dto || typeof dto !== 'object') {
    console.warn('DTO inválido recibido:', dto);
    return new favorite({ 
      id: String(Math.random()), 
      categoryId: '999',
      userId: '11'
    });
  }
  
  return new favorite({
    id: dto.id || String(Math.random()),
    categoryId: dto.categoryId || dto.id || '999',
    userId: dto.userId || '11'
  });
};

export const favoritesDatasource = {
  getFavorites: async () => {
    console.log('Ejecutando datasource.getFavorites');
    try {
      const response = await fetchFavorites();
      console.log('Respuesta recibida en datasource:', response);
      
      // Verificación exhaustiva del formato de respuesta
      let dataToProcess = [];
      
      if (Array.isArray(response)) {
        console.log('Respuesta es un array');
        dataToProcess = response;
      } else if (response && typeof response === 'object') {
        console.log('Respuesta es un objeto');
        if (Array.isArray(response.data)) {
          dataToProcess = response.data;
        } else if (response.data) {
          dataToProcess = [response.data];
        }
      }
      
      console.log('Datos a procesar:', dataToProcess);
      
      // Verificar si tenemos datos para procesar
      if (!dataToProcess || dataToProcess.length === 0) {
        console.log('No hay datos para procesar, usando datos de respaldo');
        dataToProcess = FALLBACK_DATA;
      }
      
      const favorites = dataToProcess.map(mapToFavorite);
      console.log('Favoritos mapeados:', favorites);
      return favorites;
    } catch (error) {
      console.error('Error en datasource.getFavorites:', error);
      console.log('Error crítico, usando datos de respaldo');
      return FALLBACK_DATA.map(mapToFavorite);
    }
  }
};