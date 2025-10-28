// components/projects/TodoApp.jsx
import React, { useState } from "react";

const TodoApp = () => {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");

  const addTask = () => {
    if (!input.trim()) return;
    setTasks([...tasks, input]);
    setInput("");
  };

  return (
    <div className="p-4 border rounded-lg bg-white dark:bg-gray-900 shadow">
      <h2 className="text-xl font-semibold mb-2">📝 Todo App</h2>
      <div className="flex gap-2 mb-4">
        <input
          className="border p-2 flex-grow rounded"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Add a task..."
        />
        <button
          onClick={addTask}
          className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-3 py-2 rounded hover:bg-indigo-700"
        >
          Add
        </button>
      </div>
      <ul className="list-disc pl-5 text-gray-800 dark:text-gray-200">
        {tasks.map((t, i) => (
          <li key={i}>{t}</li>
        ))}
      </ul>
    </div>
  );
};

export default TodoApp;
