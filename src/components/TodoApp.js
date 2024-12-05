import React, { useState } from "react";

const TodoApp = () => {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [isEditing, setIsEditing] = useState(null); // Track the index of the task being edited
  const [editText, setEditText] = useState(""); // Track the text for editing
  const [darkMode, setDarkMode] = useState(false);

  const handleAddTask = () => {
    if (task.trim() !== "") {
      setTasks([...tasks, task]);
      setTask(""); // Clear the input
    }
  };

  const handleDeleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  const handleEditTask = (index) => {
    setIsEditing(index);
    setEditText(tasks[index]);
  };

  const handleSaveEdit = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index] = editText;
    setTasks(updatedTasks);
    setIsEditing(null);
    setEditText("");
  };

  const handleCancelEdit = () => {
    setIsEditing(null);
    setEditText("");
  };

  const themeStyles = {
    backgroundColor: darkMode ? "#333" : "#fff",
    color: darkMode ? "#fff" : "#000",
  };

  return (
    <div style={{ ...themeStyles, minHeight: "100vh", position: "relative", padding: "20px" }}>
      {/* Dark Mode Icon */}
      <button
        onClick={() => setDarkMode(!darkMode)}
        style={{
          position: "absolute",
          top: "20px",
          right: "20px",
          padding: "10px",
          backgroundColor: "transparent",
          border: "none",
          cursor: "pointer",
          fontSize: "1.5rem",
          color: darkMode ? "#fff" : "#000",
        }}
      >
        {darkMode ? (
          <i className="fas fa-sun" title="Light Mode"></i>
        ) : (
          <i className="fas fa-moon" title="Dark Mode"></i>
        )}
      </button>

      {/* Main Content */}
      <div style={{ textAlign: "center", marginTop: "50px", fontSize: "2rem" }}>
        <h1>To-Do List</h1>
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Enter a task..."
          style={{
            padding: "15px",
            marginRight: "10px",
            border: "1px solid #ccc",
            borderRadius: "5px",
            fontSize: "1.25rem",
          }}
        />
        <button
          onClick={handleAddTask}
          style={{
            padding: "17px",
            backgroundColor: "#228b22",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontSize: "1rem",
          }}
        >
          <i className="fa-solid fa-plus"></i> Add New Task
        </button>

        <ul style={{ listStyle: "none", marginTop: "40px", padding: "0" }}>
          {tasks.map((t, index) => (
            <li
              key={index}
              style={{
                marginBottom: "10px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                maxWidth: "800px",
                margin: "auto",
                border: "1px solid #ddd",
                borderRadius: "5px",
                padding: "10px",
                marginBottom: "20px",
              }}
            >
              {/* Show input for editing or task text */}
              {isEditing === index ? (
                <input
                  type="text"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  style={{
                    flex: "1",
                    marginRight: "10px",
                    padding: "10px",
                    fontSize: "1rem",
                  }}
                />
              ) : (
                <span>{t}</span>
              )}

              {/* Buttons */}
              <div style={{ display: "flex", gap: "10px" }}>
                {isEditing === index ? (
                  <>
                    <button
                      onClick={() => handleSaveEdit(index)}
                      style={{
                        padding: "10px 15px",
                        backgroundColor: "#00b7eb",
                        color: "#fff",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer",
                        fontSize: "1rem",
                      }}
                    >
                      <i class="fa-solid fa-check"></i> Save
                    </button>
                    <button
                      onClick={handleCancelEdit}
                      style={{
                        padding: "10px 15px",
                        backgroundColor: "#FF4D4D",
                        color: "#fff",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer",
                        fontSize: "1rem",
                      }}
                    >
                      <i class="fa-solid fa-xmark"></i> Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => handleEditTask(index)}
                      style={{
                        padding: "10px 15px",
                        backgroundColor: "#FFA500",
                        color: "#fff",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer",
                        fontSize: "1rem",
                      }}
                    >
                     <i class="fa-solid fa-pen-to-square"></i> Edit Task
                    </button>
                    <button
                      onClick={() => handleDeleteTask(index)}
                      style={{
                        padding: "10px 15px",
                        backgroundColor: "#FF4D4D",
                        color: "#fff",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer",
                        fontSize: "1rem",
                      }}
                    >
                      <i class="fa-solid fa-trash"></i> Delete Task
                    </button>
                  </>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TodoApp;
