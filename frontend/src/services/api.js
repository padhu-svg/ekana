import axios from 'axios';

// Point to local backend instead of Vercel to ensure search and features work
const API_BASE_URL = 'http://localhost:8000/api/v1';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const destinationsAPI = {
  getAll: (params = {}) => api.get('/destinations', { params }),
  getById: (id) => api.get(`/destinations/${id}`),
  create: (data) => api.post('/destinations', data),
};

export const communityAPI = {
  getAll: (params = {}) => api.get('/community', { params }),
  getById: (id) => api.get(`/community/${id}`),
};

export default api;