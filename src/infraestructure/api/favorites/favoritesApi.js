import httpClient from '../../../infraestructure/services/httpClientService';

// El ID del usuario - hardcodeado temporalmente
const USER_ID = '11';

export const fetchFavorites = async (userId = USER_ID) => {
  console.log(`Ejecutando API fetchFavorites para userId: ${userId}`);
  try {
    // Usar el endpoint correcto con ID de usuario
    const response = await httpClient.get(`/favorites/${userId}`);
    console.log('Respuesta API:', response);
    return response;
  } catch (error) {
    console.error('Error en API fetchFavorites:', error);
    
    // Para desarrollo, devolver datos simulados
    console.log('Devolviendo datos simulados debido al error 404');
    return [
      {
        id: '1',
        categoryId: '101',
        userId: USER_ID,
        name: 'Restaurante El Llanero',
        icon: 'restaurant'
      },
      {
        id: '2',
        categoryId: '102',
        userId: USER_ID,
        name: 'Hotel Colonial',
        icon: 'bed'
      },
      {
        id: '3',
        categoryId: '103',
        userId: USER_ID,
        name: 'Mirador del Llano',
        icon: 'eye'
      }
    ];
  }
};
