// components/TaskList.js
import React from "react";
import TaskCard from "./TaskCard";
import styles from "./TaskList.module.css";

function TaskList({ tasks, onTaskUpdated }) {
  return (
    <div className={styles.grid}>
      {tasks.map((task) => {
        const taskId = task.id || task._id; // Asignar el ID correctamente
        if (!taskId) {
          console.error("Error: La tarea no tiene un ID válido.");
          return null;
        }

        return (
          <TaskCard
            key={taskId}
            task={task}
            onTaskUpdated={onTaskUpdated}
          />
        );
      })}
    </div>
  );
}

export default TaskList;

