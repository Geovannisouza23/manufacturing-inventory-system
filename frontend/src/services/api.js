import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Products API
export const productsApi = {
  getAll: () => api.get('/products'),
  getById: (id) => api.get(`/products/${id}`),
  create: (product) => api.post('/products', product),
  update: (id, product) => api.put(`/products/${id}`, product),
  delete: (id) => api.delete(`/products/${id}`),
};

// Raw Materials API
export const rawMaterialsApi = {
  getAll: () => api.get('/raw-materials'),
  getById: (id) => api.get(`/raw-materials/${id}`),
  create: (material) => api.post('/raw-materials', material),
  update: (id, material) => api.put(`/raw-materials/${id}`, material),
  delete: (id) => api.delete(`/raw-materials/${id}`),
};

// Production API
export const productionApi = {
  calculate: () => api.get('/production/calculate'),
};

export default api;
