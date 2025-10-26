import axios from 'axios';

const API_BASE_URL = 'https://e-ka-na-backend.vercel.app/api/v1';

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