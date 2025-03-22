
// components/TaskCard.js
import React from "react";
import styles from "./TaskCard.module.css";

function TaskCard({ task, onTaskUpdated }) {
  const handleEdit = async () => {
    try {
      const taskId = task.id || task._id; // Asegúrate de obtener correctamente el ID
      if (!taskId) {
        console.error("Error: El ID de la tarea no está definido.");
        alert("No se puede actualizar esta tarea porque falta el ID.");
        return;
      }
  
      const newStatus =
        task.status === "pendiente" ? "en progreso" : "completada";
  
      const response = await fetch(`http://localhost:4000/api/tasks/${taskId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          title: task.title,
          description: task.description,
          status: newStatus,
          dueDate: task.dueDate,
        }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error al actualizar la tarea:", errorData);
        alert(`Error: ${errorData.message || "No se pudo actualizar la tarea correctamente."}`);
        return;
      }
  
      onTaskUpdated(); // Refresca la lista de tareas
    } catch (error) {
      console.error("Error inesperado al actualizar la tarea:", error);
      alert("Ocurrió un error inesperado al intentar actualizar la tarea.");
    }
  };

  const handleDelete = async () => {
    try {
      // Usa la línea para manejar tanto id como _id
      const taskId = task.id || task._id;

      if (!taskId) {
        console.error("Error: El ID de la tarea no está definido.");
        alert("No se puede eliminar esta tarea porque falta el ID.");
        return;
      }

      const response = await fetch(`http://localhost:4000/api/tasks/${taskId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error al eliminar la tarea:", errorData);
        alert(errorData.message || "No se pudo eliminar la tarea.");
        return;
      }

      onTaskUpdated(); // Actualiza la lista de tareas
    } catch (error) {
      console.error("Error al eliminar la tarea:", error);
      alert("Ocurrió un error inesperado al intentar eliminar la tarea.");
    }
  };

  return (
    <div className={styles.card}>
      <h3 className={styles.title}>{task.title}</h3>
      <p className={styles.description}>{task.description}</p>
      <p className={styles.status}>Estado: {task.status}</p>
      <div className={styles.actions}>
        <button onClick={handleEdit} className={styles.editButton}>
          Editar
        </button>
        <button onClick={handleDelete} className={styles.deleteButton}>
          Eliminar
        </button>
      </div>
    </div>
  );
}

export default TaskCard;