// components/AddTaskModal.js
import React, { useState } from "react";
import styles from "./AddTaskModal.module.css"; // Importa los estilos CSS

function AddTaskModal({ onClose, onSubmit }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault(); // Evita que el formulario recargue la página

    // Validar que el título no esté vacío
    if (!title.trim()) {
      alert("El título es obligatorio.");
      return;
    }

    const taskData = {
      title: title.trim(), // Elimina espacios al inicio y al final
      description: description.trim(), // Opcional
      status: "pendiente", // Todas las tareas nuevas comienzan como "pendiente"
      dueDate: dueDate || null, // Si no hay fecha, envía null
    };

    try {
      // Llama a la función pasada como prop para manejar la tarea
      await onSubmit(taskData);
      setTitle(""); // Limpia los campos después de guardar
      setDescription("");
      setDueDate("");
      onClose(); // Cierra el modal
    } catch (error) {
      console.error("Error al guardar la tarea:", error);
      alert("No se pudo guardar la tarea. Por favor, inténtalo nuevamente.");
    }
  };

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <h2 className={styles.title}>Añadir Nueva Tarea</h2>
        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            type="text"
            placeholder="Título"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={styles.input}
            required
          />
          <textarea
            placeholder="Descripción"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className={styles.textarea}
          />
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className={styles.input}
          />
          <div className={styles.actions}>
            <button type="submit" className={styles.submitButton}>
              Guardar
            </button>
            <button
              type="button"
              onClick={onClose}
              className={styles.cancelButton}
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddTaskModal;