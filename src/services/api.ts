import axios from "axios";
import { useAuthStore } from "../stores/userStore";

export const api = axios.create({
  baseURL: "https://school-management-production-394e.up.railway.app/api/v1/",
  // baseURL: "https://worthwhile-siusan-visionsapi-a12554b9.koyeb.app/api/v1/",
});

// Setup request interceptor
api.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().getAccessToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
