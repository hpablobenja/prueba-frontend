// context/AuthContext.js
import React, { createContext, useState, useContext, useEffect } from "react";
import api from "../api"; // Configuración de Axios

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  // Registro de usuario
  const register = async (name, email, password, navigate) => {
    try {
      const response = await api.post("/auth/register", { name, email, password });
      alert("Usuario registrado exitosamente. ¡Ahora puedes iniciar sesión!");
      navigate("/"); // Redirige al login después del registro
    } catch (error) {
      console.error("Error al registrar usuario:", error.response?.data?.message || error.message);
      alert("No se pudo registrar el usuario. Verifica los datos ingresados.");
    }
  };

  // Inicio de sesión
  const login = async (email, password, navigate) => {
    try {
      const response = await api.post("/auth/login", { email, password });
      const { token } = response.data;
      localStorage.setItem("token", token);
      setToken(token);
      fetchUserData(); // Obtiene los datos del usuario autenticado
      navigate("/dashboard"); // Usa navigate pasado como argumento
    } catch (error) {
      console.error("Error al iniciar sesión:", error.response?.data?.message || error.message);
      alert("Credenciales incorrectas. Por favor, intenta de nuevo.");
    }
  };

  // Obtener datos del usuario autenticado
  const fetchUserData = async () => {
    try {
      const response = await api.get("/auth/me", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setUser(response.data.user); // Almacena los datos del usuario
    } catch (error) {
      console.error("Error al obtener los datos del usuario:", error.response?.data?.message || error.message);
      setUser(null); // Limpia el usuario en caso de error
    }
  };

  // Logout del sistema
  const logout = (navigate) => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token"); // Elimina el token de localStorage
    navigate("/"); // Redirige a la página de inicio de sesión
  };

  useEffect(() => {
    if (token) fetchUserData();
  }, [token]);

  return (
    <AuthContext.Provider value={{ user, token, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
