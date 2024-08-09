import axios from "axios";
import React, { useEffect, useState } from "react";

function TodoList() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tasks, setTasks] = useState([]);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  function fetchTasks() {
    axios
      .get("http://localhost:8000/api/v1/gettodo")
      .then((response) => {
        const { data, success } = response.data;
        if (success && Array.isArray(data)) {
          setTasks(data);
        } else {
          console.error("Unexpected response format:", response.data);
          setTasks([]);
        }
      })
      .catch((error) => {
        console.error("Error fetching tasks:", error);
        setTasks([]);
      });
  }

  function addHandler() {
    if (title && description) {
      axios
        .post("http://localhost:8000/api/v1/createtodo", { title, description })
        .then((response) => {
          const { success, message } = response.data;
          if (success) {
            fetchTasks();
            setTitle("");
            setDescription("");
          } else {
            console.error("Error adding task:", message || "Unknown error");
          }
        })
        .catch((error) => {
          console.error("Error adding task:", error);
        });
    } else {
      console.warn("Both title and description are required");
    }
  }

  function deleteHandler(id) {
    axios
      .delete(`http://localhost:8000/api/v1/deletetodo/${id}`)
      .then((response) => {
        if (response.status === 200) {
          fetchTasks();
        } else {
          console.error(
            "Failed to delete task:",
            response.data.message || "Unknown error"
          );
        }
      })
      .catch((error) => {
        console.error("Error deleting task:", error.message);
      });
  }

  function updateHandler() {
    if (editingId && title && description) {
      axios
        .put(`http://localhost:8000/api/v1/updatetodo/${editingId}`, {
          title,
          description,
        })
        .then((response) => {
          const { message, success } = response.data;
          if (success) {
            setTasks((prevTasks) =>
              prevTasks.map((task) =>
                task._id === editingId ? { ...task, title, description } : task
              )
            );
            setTitle("");
            setDescription("");
            setEditingId(null);
          } else {
            console.error("Error updating task:", message || "Unknown error");
          }
        })
        .catch((error) => {
          console.error("Error updating task:", error.message);
        });
    } else {
      console.warn("Task ID, title, and description are required");
    }
  }

  return (
    <div>
      <input
        type="text"
        value={title}
        placeholder="Write Task Title"
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        value={description}
        placeholder="Write Task Description"
        onChange={(e) => setDescription(e.target.value)}
      />
      <button onClick={editingId ? updateHandler : addHandler}>
        {editingId ? "Update" : "Add"}
      </button>

      <div>
        {!title && !description ? "" : <div>Both fields are required</div>}
      </div>

      <h2>Added Task</h2>
      <div>
        {tasks.length === 0 ? (
          <div className="subLine">No tasks found</div>
        ) : (
          tasks.map((task) => (
            <div key={task._id} className="container">
              <div className="box">
                <div className="outer">
                  <h3>Title: </h3>
                  <p>{task.title}</p>
                </div>
                <div>
                  <h3>Description: </h3>
                  <p>{task.description}</p>
                </div>
              </div>
              <button
                onClick={() => {
                  setTitle(task.title);
                  setDescription(task.description);
                  setEditingId(task._id);
                }}
              >
                Edit
              </button>
              <button onClick={() => deleteHandler(task._id)}>Delete</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default TodoList;
