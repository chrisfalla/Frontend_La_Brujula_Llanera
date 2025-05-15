import httpClientService from "../../services/httpClientService";

 const FAVORITES_ENDPOINTS = {
    GET_FAVORITES: '/favorites',
    GET_USER_FAVORITES: '/favorites/user',
    GET_DEFAULT: '/favorites/44',
    

};

export const getFavorites = async () => {
  try {
    console.log('📡 [API] Getting all favorites');
    const response = await httpClientService.get(FAVORITES_ENDPOINTS.GET_FAVORITES);
    console.log('✅ [API] Get favorites response:', response);
    return response;  // httpClientService already extracts data
  } catch (error) {
    console.error("❌ [API] Error fetching favorites:", error);
    return [];
  }
};

export const getDefaultFavorites = async () => {
  try {
    console.log('📡 [API] Getting default favorites');
    const response = await httpClientService.get(FAVORITES_ENDPOINTS.GET_DEFAULT);
    console.log('✅ [API] Get default favorites response:', response);
    return response;  // httpClientService already extracts data
  } catch (error) {
    console.error("❌ [API] Error fetching default favorites:", error);
    return [];
  }
};

// For backward compatibility
export const fetchFavorites = getFavorites;
export const fetchDefaultFavorites = getDefaultFavorites;
export const fetchFavoritesUseCase = getDefaultFavorites;
export const fetchFavoritesDefaultUseCase = getDefaultFavorites;