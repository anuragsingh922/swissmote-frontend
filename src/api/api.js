import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});


axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("drsfbuadcjk");
    if (token) {
      config.headers['Authorization'] = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const api = {
  get: async (endpoint) => {
    const response = await axiosInstance.get(endpoint);
    return response.data;
  },

  post: async (endpoint, data) => {
    const response = await axiosInstance.post(endpoint, data);
    return response.data;
  },

  put: async (endpoint, data) => {
    const response = await axiosInstance.put(endpoint, data);
    return response.data;
  },
  patch: async (endpoint, userData) => {
    const response = await axiosInstance.patch(endpoint, userData);
    return response.data;
  },

  delete: async (endpoint) => {
    const response = await axiosInstance.delete(endpoint);
    return response.data;
  },
};

export default api;