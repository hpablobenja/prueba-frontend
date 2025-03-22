import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Importa useNavigate
import api from "../api"; // Configuración de Axios
import styles from "./RegisterPage.module.css";

function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // Manejo de errores
  const [success, setSuccess] = useState(false); // Manejo de éxito
  const navigate = useNavigate(); // Hook de navegación

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validación en el frontend
    if (!name.trim() || !email.trim() || !password.trim()) {
      setError("Todos los campos son obligatorios.");
      return;
    }

    try {
      setError(""); // Limpia errores previos
      const response = await api.post("/auth/register", { name, email, password });
      console.log("Usuario registrado exitosamente:", response.data);
      setSuccess(true); // Indica éxito en el registro

      // Redirige automáticamente al LoginPage después de 1 segundo
      setTimeout(() => {
        navigate("/"); // Cambia la ruta a "/login"
      }, 1000);
    } catch (err) {
      console.error("Error al registrar usuario:", err);
      setError(err.response?.data?.message || "No se pudo registrar el usuario. Inténtalo nuevamente.");
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Registro</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        {/* Mensajes de error o éxito */}
        {error && <p className={styles.error}>{error}</p>}
        {success && <p className={styles.success}>Registro exitoso. Redirigiendo al inicio de sesión...</p>}

        {/* Input del nombre */}
        <input
          type="text"
          placeholder="Nombre"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={styles.input}
          required
        />

        {/* Input del correo */}
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={styles.input}
          required
        />

        {/* Input de la contraseña */}
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={styles.input}
          required
        />

        {/* Botón de registro */}
        <button type="submit" className={styles.button}>
          Registrar
        </button>
      </form>
    </div>
  );
}

export default RegisterPage;