import axios from "axios";

// Create custom Axios instance
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

// Request Interceptor: Automatically attach Bearer token to every request
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiClient;