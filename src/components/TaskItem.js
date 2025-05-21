import React, { useState } from "react";

function TaskItem({ task, editTask, deleteTask, toggleComplete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editInput, setEditInput] = useState(task.text);

  const handleEdit = (e) => {
    e.preventDefault();
    if (editInput.trim() === "") return;
    editTask(task.id, editInput.trim());
    setIsEditing(false);
  };

  return (
    <li className={`task-item ${task.completed ? "completed" : ""}`}>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => toggleComplete(task.id)}
      />
      {isEditing ? (
        <form onSubmit={handleEdit} className="edit-form">
          <input
            type="text"
            value={editInput}
            onChange={(e) => setEditInput(e.target.value)}
            autoFocus
          />
          <button type="submit">Save</button>
          <button
            type="button"
            onClick={() => {
              setIsEditing(false);
              setEditInput(task.text);
            }}
          >
            Cancel
          </button>
        </form>
      ) : (
        <>
          <span
            className="task-text"
            onDoubleClick={() => setIsEditing(true)}
            title="Double-click to edit"
          >
            {task.text}
          </span>
          <button className="edit-btn" onClick={() => setIsEditing(true)}>
            Edit
          </button>
          <button className="delete-btn" onClick={() => deleteTask(task.id)}>
            Delete
          </button>
        </>
      )}
    </li>
  );
}

export default TaskItem;
