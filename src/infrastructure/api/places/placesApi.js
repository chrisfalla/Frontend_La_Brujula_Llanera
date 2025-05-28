import httpClient from '../../services/httpClientService';

export const fetchMostVisitedPlaces = async () => {
    try {
        // httpClient.get ya retorna res.data
        const data = await httpClient.get('/home/log-visited/more-visited');
        console.log('✅ [API] fetchMostVisitedPlaces response:', data);
        return Array.isArray(data) ? data : [];   // Asegura siempre un arreglo
    } catch (error) {
        console.error('❌ [API] fetchMostVisitedPlaces error:', error);
        return [];
    }
};

export const fetchTopRatedPlacesByCategory = async (idCategory) => {
    try {
        // Corregir la ruta para seguir la estructura de otros endpoints
        const data = await httpClient.get(`/home/top-rated/${idCategory}`);
        console.log('✅ [API] fetchTopRatedPlacesByCategory response:', data);
        return Array.isArray(data) ? data : [];
    } catch (error) {
        console.error('❌ [API] fetchTopRatedPlacesByCategory error:', error);
        return [];
    }
};

export const fetchTopRatedPlacesByTags = async (tagIds) => {
    try {
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
        
        console.log('🔍 Intentando URL:', url);
        const data = await httpClient.get(url);
        console.log('✅ [API] fetchTopRatedPlacesByTags response:', data);
        return Array.isArray(data) ? data : [];
    } catch (error) {
        console.error('❌ [API] fetchTopRatedPlacesByTags error:', error);
        return [];
    }
};
export const fetchPlacesByCategory = async (idCategory) => {
  try {
    console.log(`🔍 [API] Buscando lugares para categoría ID: ${idCategory}`);
    
    // Intentar con varios endpoints posibles
    const endpoints = [
      `/placeDetail/placesByCategory/${idCategory}`,
      `/home/places-by-category/${idCategory}`,
      `/categories/${idCategory}/places`,
      `/places/category/${idCategory}`
    ];
    
    let data = null;
    let usedEndpoint = '';
    
    // Intentar cada endpoint hasta que uno funcione
    for (const endpoint of endpoints) {
      try {
        console.log(`🔍 [API] Intentando endpoint: ${endpoint}`);
        data = await httpClient.get(endpoint);
        usedEndpoint = endpoint;
        console.log(`✅ [API] Éxito con endpoint: ${endpoint}`);
        break; // Si tenemos éxito, salimos del bucle
      } catch (endpointError) {
        console.warn(`⚠️ [API] Fallo con endpoint ${endpoint}:`, endpointError.message);
        // Continuamos con el siguiente endpoint
      }
    }
    
    if (!data) {
      throw new Error('Todos los endpoints fallaron');
    }
    
    console.log(`✅ [API] fetchPlacesByCategory response con ${usedEndpoint}:`, JSON.stringify(data));
    
    // Procesamiento mejorado de la respuesta
    if (data && !Array.isArray(data)) {
      // Intentar extraer array de propiedades comunes
      if (data.places && Array.isArray(data.places)) {
        console.log('📦 [API] Extrayendo array de la propiedad "places"');
        return data.places;
      } else if (data.data && Array.isArray(data.data)) {
        console.log('📦 [API] Extrayendo array de la propiedad "data"');
        return data.data;
      } else if (data.results && Array.isArray(data.results)) {
        console.log('📦 [API] Extrayendo array de la propiedad "results"');
        return data.results;
      } else if (data.items && Array.isArray(data.items)) {
        console.log('📦 [API] Extrayendo array de la propiedad "items"');
        return data.items;
      }
    }
    
    return Array.isArray(data) ? data : [data];
  } catch (error) {
    console.error('❌ [API] fetchPlacesByCategory error:', error);
    return []; // Devolvemos array vacío en lugar de propagar el error
  }
};
