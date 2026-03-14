import axios from 'axios';

import { getApiBaseUrl } from '@/lib/api';

const api = axios.create({
  baseURL: getApiBaseUrl(),
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Add auth token to headers
    // const token = ...;
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle errors globally
    return Promise.reject(error);
  }
);

export default api;
