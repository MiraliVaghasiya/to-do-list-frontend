import React from "react";
import TaskItem from "./TaskItem";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

function TaskList({
  tasks,
  editTask,
  deleteTask,
  toggleComplete,
  reorderTasks,
}) {
  if (tasks.length === 0) {
    return <p className="empty-list">No tasks yet! 🎉</p>;
  }

  const handleOnDragEnd = (result) => {
    if (!result.destination) return;
    reorderTasks(result.source.index, result.destination.index);
  };

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Droppable droppableId="tasks">
        {(provided) => (
          <ul
            className="task-list"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {tasks.map((task, idx) => (
              <Draggable
                key={task.id}
                draggableId={task.id.toString()}
                index={idx}
              >
                {(provided) => (
                  <li
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <TaskItem
                      task={task}
                      editTask={editTask}
                      deleteTask={deleteTask}
                      toggleComplete={toggleComplete}
                    />
                  </li>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default TaskList;
