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
// URL para lugares por categoría
let endpoint = `/placeDetail/placesByCategory/${idCategory}`;

try {
  // Intento principal con el endpoint predeterminado
  console.log(`🔍 [API] Intentando endpoint principal: ${endpoint}`);
  const data = await httpClient.get(endpoint);
  console.log(`✅ [API] Respuesta exitosa con ${data.length || 0} lugares`);

  // Verificar la estructura de los datos recibidos
  if (data && data.length > 0) {
    console.log('📊 [API] Ejemplo de primer lugar:', JSON.stringify(data[0]));
  }

  // Garantizar que siempre devolvemos un array
  return Array.isArray(data) ? data : (data ? [data] : []);
} catch (error) {
  console.warn(`⚠️ [API] Error con endpoint principal:`, error.message);

  // Si falla, intentamos con un endpoint alternativo
  endpoint = `/categories/${idCategory}/places`;
  console.log(`🔄 [API] Intentando endpoint alternativo: ${endpoint}`);

  try {
    const altData = await httpClient.get(endpoint);
    console.log(`✅ [API] Respuesta exitosa con endpoint alternativo: ${altData.length || 0} lugares`);
    return Array.isArray(altData) ? altData : (altData ? [altData] : []);
  } catch (altError) {
    console.error(`❌ [API] También falló el endpoint alternativo:`, altError.message);

    // Si todo falla, creamos 5 lugares de ejemplo para depuración
    console.log(`🔧 [API] Generando datos de ejemplo para depuración`);
    return generateSamplePlaces(idCategory);
  }
}


