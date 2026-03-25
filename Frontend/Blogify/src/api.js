import axios from "axios";

export const BASE_URL = import.meta.env.VITE_BASE_URL;

export const publicApi = axios.create({
    baseURL: BASE_URL,
});


const api = axios.create({
    baseURL: BASE_URL,
});

api.interceptors.request.use(
    (config) => {
        //  Safely read token (support both keys)
        const token =
            localStorage.getItem("access") ||
            localStorage.getItem("access_token");

        // Always attach token if present
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => Promise.reject(error)
);

export default api;
