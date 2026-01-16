import axios from "axios";

export const BASE_URL = import.meta.env.VITE_BASE_URL;

// PUBLIC API (No Auth Header)
export const publicApi = axios.create({
    baseURL: BASE_URL,
});

// PRIVATE API (With Auth Header)
const api = axios.create({
    baseURL: BASE_URL,
});

/**
 * ================================
 * REQUEST INTERCEPTOR
 * - Automatically attach JWT token
 * ================================
 */
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
