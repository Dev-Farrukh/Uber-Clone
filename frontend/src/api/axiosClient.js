import axios from "axios";

// Create custom Axios instance
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

// Request Interceptor: Automatically attach Bearer token to every request
apiClient.interceptors.request.use(
  (config) => {
    const riderEndpoints = ["confirm-ride", "start-ride", "end-ride"];
    const usesRiderToken = riderEndpoints.some((endpoint) => config.url?.includes(endpoint));
    const tokenKey = usesRiderToken ? "riderToken" : "userToken";
    const token = localStorage.getItem(tokenKey);
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