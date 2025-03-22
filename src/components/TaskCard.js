import React from "react";
import styles from "./TaskCard.module.css";
import api from "../api";

function TaskCard({ task, onTaskUpdated }) {
  const handleEdit = async () => {
    try {
      const taskId = task.id || task._id;
      if (!taskId) {
        alert("No se puede actualizar esta tarea porque falta el ID.");
        return;
      }

      const newStatus =
        task.status === "pendiente" ? "en progreso" : "completada";

      await api.put(`/tasks/${taskId}`, {
        title: task.title,
        description: task.description,
        status: newStatus,
        dueDate: task.dueDate,
      });

      onTaskUpdated();
    } catch (error) {
      console.error("Error al actualizar la tarea:", error);
      alert("Ocurrió un error al intentar actualizar la tarea.");
    }
  };

  const handleDelete = async () => {
    try {
      const taskId = task.id || task._id;
      if (!taskId) {
        alert("No se puede eliminar esta tarea porque falta el ID.");
        return;
      }

      await api.delete(`/tasks/${taskId}`);
      onTaskUpdated();
    } catch (error) {
      console.error("Error al eliminar la tarea:", error);
      alert("Ocurrió un error al intentar eliminar la tarea.");
    }
  };

  return (
    <div className={styles.card}>
      <h3 className={styles.title}>{task.title}</h3>
      <p className={styles.description}>
        {task.description || "Sin descripción"}
      </p>
      <p className={styles.dueDate}>
        Fecha límite:{" "}
        {task.dueDate
          ? new Date(task.dueDate).toLocaleDateString() // Formatea la fecha
          : "Sin fecha límite"}
      </p>
      <p className={styles.status}>Estado: {task.status}</p>
      <div className={styles.actions}>
        <button onClick={handleEdit} className={styles.editButton}>
          {task.status === "pendiente" ? "Iniciar" : "Completar"}
        </button>
        <button onClick={handleDelete} className={styles.deleteButton}>
          Eliminar
        </button>
      </div>
    </div>
  );
}

export default TaskCard;