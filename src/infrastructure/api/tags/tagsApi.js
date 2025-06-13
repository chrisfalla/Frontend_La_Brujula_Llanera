import httpClient from '../../services/httpClientService';

const TAGS_ENDPOINTS = {
    GET_ALL: '/tags',
    GET_DEFAULT: '/tags/default'
};

export const fetchTags = async () => {
    const response = await httpClient.get(TAGS_ENDPOINTS.GET_ALL);
    return response || [];
};

export const fetchDefaultTags = async () => {
    const response = await httpClient.get(TAGS_ENDPOINTS.GET_DEFAULT);
    
    if (Array.isArray(response)) {
        return response;
    } else {
        return [];
    }
};