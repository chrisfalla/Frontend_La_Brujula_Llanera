import httpClient from '../../services/httpClientService';

export const fetchMostVisitedPlaces = async () => {
  // httpClient.get ya retorna res.data
  const data = await httpClient.get('/home/log-visited/more-visited');
  return Array.isArray(data) ? data : [];   // Asegura siempre un arreglo
};

export const fetchTopRatedPlacesByCategory = async (idCategory) => {
  // Corregir la ruta para seguir la estructura de otros endpoints
  const data = await httpClient.get(`/home/top-rated/${idCategory}`);
  return Array.isArray(data) ? data : [];
};

export const fetchTopRatedPlacesByTags = async (tagIds) => {
  // Si el API espera múltiples parámetros en lugar de separados por comas
  let url = '/home/top-rated-by-tags';

  if (Array.isArray(tagIds) && tagIds.length > 0) {
    // Construir la URL con múltiples parámetros tagId (tagId=1&tagId=2)
    const params = tagIds.map(id => `tagId=${id}`).join('&');
    url += `?${params}`;
  } else if (tagIds) {
    // Un solo tagId
    url += `?tagId=${tagIds}`;
  }

  const data = await httpClient.get(url);
  return Array.isArray(data) ? data : [];
};

export const fetchPlacesByCategory = async (idCategory) => {
  // URL para lugares por categoría
  let endpoint = `/placeDetail/placesByCategory/${idCategory}`;

  try {
    // Intento principal con el endpoint predeterminado
    const data = await httpClient.get(endpoint);

    // Garantizar que siempre devolvemos un array
    return Array.isArray(data) ? data : (data ? [data] : []);
  } catch (error) {
    // Si falla, intentamos con un endpoint alternativo
    endpoint = `/categories/${idCategory}/places`;

    try {
      const altData = await httpClient.get(endpoint);
      return Array.isArray(altData) ? altData : (altData ? [altData] : []);
    } catch (altError) {
      return [];
    }
  }
};


