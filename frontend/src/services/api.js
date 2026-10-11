import axios from 'axios';
import fallbackPlaces from '../data/karnataka_places.json';

// Point to relative path so Vercel rewrites proxy it to the backend service
const API_BASE_URL = '/api/v1';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

const filterPlaces = (places, params = {}) => {
  let result = places;
  if (params.category) {
    result = result.filter(p => p.category && p.category.toLowerCase() === params.category.toLowerCase());
  }
  if (params.district) {
    result = result.filter(p => p.district && p.district.toLowerCase() === params.district.toLowerCase());
  }
  return result;
};

export const destinationsAPI = {
  getAll: async (params = {}) => {
    try {
      const response = await api.get('/destinations', { params });
      if (response.data && Array.isArray(response.data) && response.data.length > 0) {
        return response;
      }
      return { data: filterPlaces(fallbackPlaces, params) };
    } catch (err) {
      console.warn('API fetch failed, using fallback places:', err.message);
      return { data: filterPlaces(fallbackPlaces, params) };
    }
  },
  getById: async (id) => {
    try {
      const response = await api.get(`/destinations/${id}`);
      if (response.data) return response;
      const found = fallbackPlaces.find(p => p.id.toString() === id.toString());
      return { data: found };
    } catch (err) {
      console.warn(`API getById ${id} failed, using fallback:`, err.message);
      const found = fallbackPlaces.find(p => p.id.toString() === id.toString());
      return { data: found };
    }
  },
  create: (data) => api.post('/destinations', data),
};

export const communityAPI = {
  getAll: (params = {}) => api.get('/community', { params }),
  getById: (id) => api.get(`/community/${id}`),
};

export default api;