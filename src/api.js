// src/api.js
import axios from "axios";

// Configuración de Axios para la API del backend
const api = axios.create({
  baseURL: "http://localhost:4000/api", // Cambia esta URL a la dirección del backend en producción
});

// Interceptor para incluir el token JWT en cada solicitud
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;

