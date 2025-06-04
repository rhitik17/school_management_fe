import  { useAuthStore } from "../stores/tokenStore";
import axios from "axios";

export const api = axios.create({
  baseURL: "https://smsbe-production.up.railway.app/api/v1/",
  // baseURL: "https://worthwhile-siusan-visionsapi-a12554b9.koyeb.app/api/v1/",
});

// Setup request interceptor
api.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().getAccessToken();
    console.log(token)

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
