// pages/DashboardPage.js
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Importa useNavigate
import api from "../api"; // Configuración de la API
import { useAuth } from "../context/AuthContext"; // Obtén logout desde el contexto
import TaskList from "../components/TaskList";
import AddTaskModal from "../components/AddTaskModal";
import styles from "./DashboardPage.module.css"; // Estilos CSS

function DashboardPage() {
  const { user, logout } = useAuth(); // Obtén logout del contexto
  const navigate = useNavigate(); // Inicializa el hook navigate
  const [tasks, setTasks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Función para obtener las tareas
  const fetchTasks = async () => {
    try {
      const response = await api.get("/tasks"); // Solicita tareas al backend
      setTasks(response.data.tasks);
    } catch (error) {
      console.error("Error al obtener las tareas:", error);
    }
  };

  // Función de logout
  const handleLogout = () => {
    logout(navigate); // Pasa navigate como argumento a logout
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Bienvenido, {user?.name}</h1>

      {/* Botón para añadir una nueva tarea */}
      <button
        onClick={() => setIsModalOpen(true)}
        className={styles.addTaskButton}
      >
        Añadir Tarea
      </button>

      {/* Lista de tareas */}
      <TaskList tasks={tasks} onTaskUpdated={fetchTasks} />

      {/* Botón de cerrar sesión */}
      <button onClick={handleLogout} className={styles.logoutButton}>
        Cerrar Sesión
      </button>

      {/* Modal para añadir tareas */}
      {isModalOpen && (
        <AddTaskModal
          onClose={() => setIsModalOpen(false)}
          onSubmit={() => fetchTasks()}
        />
      )}
    </div>
  );
}

export default DashboardPage;








