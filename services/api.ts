import axios from 'axios';

const BASE_URL = 'http://192.168.0.107:5287/api';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('Erro na requisição API:', error.message);
    return Promise.reject(error);
  }
);

export default api; 