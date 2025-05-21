import React from "react";

function TaskForm({
  submitTask,
  inputValue,
  setInputValue,
  isEditing,
  cancelEdit,
}) {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim() === "") return;
    submitTask(inputValue.trim());
    setInputValue("");
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        type="text"
        value={inputValue}
        placeholder={isEditing ? "Edit task..." : "Add a new task..."}
        onChange={(e) => setInputValue(e.target.value)}
        autoFocus
      />
      <button type="submit">{isEditing ? "Save" : "Add"}</button>
      {isEditing && (
        <button type="button" onClick={cancelEdit}>
          Cancel
        </button>
      )}
    </form>
  );
}

export default TaskForm;
