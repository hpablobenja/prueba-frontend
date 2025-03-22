import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import { useAuth } from "../context/AuthContext";
import TaskList from "../components/TaskList";
import AddTaskModal from "../components/AddTaskModal";
import styles from "./DashboardPage.module.css";

function DashboardPage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState(""); // Filtrado por estado
  const [search, setSearch] = useState(""); // Búsqueda por palabra clave
  const [startDate, setStartDate] = useState(""); // Fecha inicial
  const [endDate, setEndDate] = useState(""); // Fecha final

  const fetchTasks = async () => {
    setIsLoading(true);
    setError("");
    try {
      const response = await api.get("/tasks", {
        params: { status: filter, search, startDate, endDate },
      });
      setTasks(response.data.tasks);
    } catch (err) {
      console.error("Error al obtener las tareas:", err);
      setError("No se pudieron obtener las tareas. Inténtalo nuevamente.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleTaskSubmit = async (taskData) => {
    setIsLoading(true);
    setError("");
    try {
      const response = await api.post("/tasks", taskData);
      fetchTasks();
      setIsModalOpen(false);
    } catch (err) {
      console.error("Error al guardar la tarea:", err);
      setError("No se pudo guardar la tarea. Verifica los datos e inténtalo nuevamente.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    logout(navigate);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Bienvenido, {user?.name}</h1>

      {/* Filtros y Búsqueda */}
      <div className={styles.filtersContainer}>
        <div className={styles.filters}>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className={styles.filterSelect}
          >
            <option value="">Todos</option>
            <option value="pendiente">Pendiente</option>
            <option value="en progreso">En Progreso</option>
            <option value="completada">Completada</option>
          </select>

          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar tareas..."
            className={styles.searchInput}
          />

          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className={styles.dateInput}
          />

          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className={styles.dateInput}
          />

          <button onClick={fetchTasks} className={styles.filterButton}>
            Aplicar
          </button>
        </div>
      </div>

      {/* Lista de Tareas */}
      {error && <p className={styles.error}>{error}</p>}
      {isLoading ? (
        <p className={styles.loadingMessage}>Cargando tareas...</p>
      ) : tasks.length === 0 ? (
        <p className={styles.emptyMessage}>No hay tareas disponibles.</p>
      ) : (
        <TaskList tasks={tasks} onTaskUpdated={fetchTasks} />
      )}

      {/* Botón para Añadir Tarea */}
      <button
        onClick={() => setIsModalOpen(true)}
        className={styles.addTaskButton}
      >
        Añadir Tarea
      </button>

      {/* Modal para Crear Nueva Tarea */}
      {isModalOpen && (
        <AddTaskModal
          onClose={() => setIsModalOpen(false)}
          onSubmit={(data) => handleTaskSubmit(data)}
        />
      )}

      {/* Botón de Logout */}
      <button onClick={handleLogout} className={styles.logoutButton}>
        Cerrar Sesión
      </button>
    </div>
  );
}

export default DashboardPage;