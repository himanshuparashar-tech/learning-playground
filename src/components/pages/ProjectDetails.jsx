import React from 'react'
import { useParams, Link } from 'react-router-dom'
import TodoApp from '../projects/TodoApp';
import SimpleTodo from '../projects/simpleTodo';

const projectMap = {
  todo: {
    title: "Todo App",
    component: <TodoApp />,
    code: `
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
          <div>
            <h2>Todo App</h2>
            <input value={input} onChange={(e) => setInput(e.target.value)} />
            <button onClick={addTask}>Add</button>
            <ul>{tasks.map((t, i) => <li key={i}>{t}</li>)}</ul>
          </div>
        );
      };
      export default TodoApp;`,
  },
  simpletodo: {
    title: "Simple Todo App",
    component: <SimpleTodo /> ,
    code: ``
  }
};

const ProjectDetails = () => {
  const { id } = useParams(); ``
  const project = projectMap[id];

  if (!project) {
    return (
      <div className='p-6'>
        <Link
          to='/projects' className='text-indigo-600 mb-4'>
          👈 Back
        </Link>
        <p className='text-center'> ❌ Project not Found</p>
      </div>
    )
  }
  return (
    <div className="p-6">
      <Link to="/projects" className="text-indigo-600">
        👈 Back to Projects
      </Link>
      <h1 className="text-3xl font-bold mt-4">{project.title}</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <div className="p-4 border rounded-lg bg-gray-50 dark:bg-gray-800">
          <h2 className="font-semibold mb-2 text-lg">💻 Code:</h2>
          <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto " style={{ maxHeight: 'calc(100vh - 275px)' }}>
            {project.code.trim()}
          </pre>
        </div>

        <div className="p-4 border rounded-lg bg-gray-50 dark:bg-gray-800">
          <h2 className="font-semibold mb-2 text-lg">👀 Preview:</h2>
          <div className="p-4 bg-white dark:bg-gray-900 rounded-md">
            {project.component}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails