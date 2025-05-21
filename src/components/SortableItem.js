import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { FaEdit, FaTrash, FaGripLines } from "react-icons/fa";

function SortableItem({ task, startEditTask, deleteTask, toggleComplete }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task._id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    background: isDragging ? "#f3f3f3" : "transparent",
  };

  return (
    <li
      ref={setNodeRef}
      style={style}
      className={`task-item${task.completed ? " completed" : ""}`}
    >
      {/* Drag handle */}
      <span
        className="drag-handle"
        {...listeners}
        {...attributes}
        title="Drag to reorder"
      >
        <FaGripLines />
      </span>
      {/* Complete checkbox */}
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => toggleComplete(task._id, !task.completed)}
        title="Mark as complete"
      />
      {/* Task text */}
      <span
        className={`task-text${task.completed ? " completed" : ""}`}
        title="Double-click to edit"
      >
        {task.text}
      </span>
      {/* Edit button */}
      <button
        className="edit-btn"
        onClick={() => startEditTask(task._id, task.text)}
        title="Edit"
      >
        <FaEdit />
      </button>
      {/* Delete button */}
      <button
        className="delete-btn"
        onClick={() => deleteTask(task._id)}
        title="Delete"
      >
        <FaTrash />
      </button>
    </li>
  );
}

export default SortableItem;
