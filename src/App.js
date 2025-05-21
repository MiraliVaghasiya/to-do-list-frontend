import React, { useState, useEffect } from "react";
import TaskForm from "./components/TaskForm";
import SortableItem from "./components/SortableItem";
import "./App.css";
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

const API_URL = "https://to-do-list-backend-eta.vercel.app/tasks";

function App() {
  const [tasks, setTasks] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editValue, setEditValue] = useState("");

  // Fetch tasks from backend
  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => setTasks(data));
  }, []);

  // Add or edit task
  const submitTask = async (text) => {
    if (editId) {
      const res = await fetch(`${API_URL}/${editId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, completed: false }),
      });
      const updated = await res.json();
      setTasks((tasks) =>
        tasks.map((task) => (task._id === editId ? updated : task))
      );
      setEditId(null);
      setEditValue("");
    } else {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });
      const newTask = await res.json();
      setTasks([...tasks, newTask]);
    }
  };

  const startEditTask = (id, text) => {
    setEditId(id);
    setEditValue(text);
  };

  const deleteTask = async (id) => {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    setTasks(tasks.filter((task) => task._id !== id));
    if (editId === id) {
      setEditId(null);
      setEditValue("");
    }
  };

  const toggleComplete = async (id, completed) => {
    const task = tasks.find((t) => t._id === id);
    const res = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: task.text, completed }),
    });
    const updated = await res.json();
    setTasks((tasks) =>
      tasks.map((task) => (task._id === id ? updated : task))
    );
  };

  // Drag and drop handler (client-side order only)
  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      const oldIndex = tasks.findIndex((task) => task._id === active.id);
      const newIndex = tasks.findIndex((task) => task._id === over.id);
      setTasks((tasks) => arrayMove(tasks, oldIndex, newIndex));
    }
  };

  return (
    <div className="app-container">
      <h1>Daily Task Manager</h1>
      <TaskForm
        submitTask={submitTask}
        inputValue={editValue}
        setInputValue={setEditValue}
        isEditing={!!editId}
        cancelEdit={() => {
          setEditId(null);
          setEditValue("");
        }}
      />
      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext
          items={tasks.map((task) => task._id)}
          strategy={verticalListSortingStrategy}
        >
          <ul className="task-list">
            {tasks.map((task) => (
              <SortableItem
                key={task._id}
                task={task}
                startEditTask={startEditTask}
                deleteTask={deleteTask}
                toggleComplete={toggleComplete}
              />
            ))}
          </ul>
        </SortableContext>
      </DndContext>
    </div>
  );
}

export default App;
