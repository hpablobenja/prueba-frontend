// pages/LoginPage.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import styles from "./LoginPage.module.css";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(email, password, navigate); // Pasa navigate como argumento
    } catch (error) {
      console.error("Error al iniciar sesión:", error.response?.data?.message || error.message);
      alert("Credenciales incorrectas. Por favor, intenta de nuevo.");
    }
  };




  return (
    <div className={styles.container}>
      <form onSubmit={handleLogin} className={styles.form}>
        <h1 className={styles.title}>Iniciar Sesión</h1>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Correo"
          className={styles.input}
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Contraseña"
          className={styles.input}
          required
        />
        <button type="submit" className={styles.button}>
          Entrar
        </button>
      </form>
      <p className={styles.registerPrompt}>
        ¿No tienes una cuenta? <a href="/register" className={styles.link}>Regístrate aquí</a>
      </p>
    </div>
  );
}

export default LoginPage;
