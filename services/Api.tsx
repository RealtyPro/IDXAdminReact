import axios, { AxiosInstance } from 'axios';

const axiosInstance: AxiosInstance = axios.create({
  baseURL: 'http://127.0.0.1:8001/api', // Set your base URL here
});

// Request interceptor to add headers
axiosInstance.interceptors.request.use(
  (config) => {
    // You can modify headers here if needed
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!error.response) {
      // console.error('Network Error:', error.message);
      return Promise.reject(new Error('Network Error: Please check your internet connection.'));
    }

    const status = error.response.status;
    const message = (error.response.data as any)?.message || 'Unknown error';

    switch (status) {
      case 400:
        console.error('Bad Request:', message);
        break;
      case 401:
        console.error('Unauthorized:', message);
        break;
      case 403:
        console.error('Forbidden:', message);
        break;
      case 404:
        console.error('Not Found:', message);
        break;
      case 500:
        console.error('Internal Server Error:', message);
        break;
      default:
        console.error('Error:', message);
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
