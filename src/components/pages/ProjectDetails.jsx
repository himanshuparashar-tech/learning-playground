import React from 'react'
import { useParams, Link } from 'react-router-dom'
import TodoApp from '../projects/TodoApp';
import SimpleTodoApp from '../projects/SimpleTodoApp';
import SimpleTodoWithToaster from '../projects/SimpleTodoWithToaster';
import SimpleTodoWithDelete from '../projects/SimpleTodoWithDelete';
import SimpleTodoWithEdit from '../projects/SimpleTodoWithEdit';
import SimpleTodoWithLocalStorage from '../projects/SimpleTodoWithLocalStorage';

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
    title: 'Simple Todo App',
    component: <SimpleTodoApp />,
    code: `
    import React, { useState } from 'react';
    
    const SimpleTodoApp = () => {
        const [tasks, setTasks] = useState([]) // Stores Tasks
        const [input, setInput] = useState('') // Stores Input text
    
        const addTasks = () => {
            const trimmedInput = input.trim();
            if (!trimmedInput) return; //ignore empty input
            setTasks([...tasks, trimmedInput]);
            setInput("");
        };
        return (
            <div style={{ maxWidth: "400px", margin: "50px auto", padding: "20px", border: "1px solid #ccc", borderRadius: "8px" }}>
                <h2 style={{ textAlign: "center" }} className='mb-2'>Todo App</h2>
    
                <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder='Add a task'
                        style={{ flexGrow: '1', padding: '8px' }}
                        className='border *:border-gray-200 border-xl focus:border-gray-100'
                    />
                    <button onClick={addTasks} className='bg-gradient-to-r from-indigo-600 to-purple-600 text-white' style={{ padding: '8px 12px' }}> Add</button>
                </div>
                <ul>
                    {tasks.map((task, index) => (
                        <li key={index}>
                            {task}
                        </li>
                    ))}
                </ul>
    
                {tasks.length === 0 && <p style={{ textAlign: 'center', color: '#888' }}>No Tasks Yet.</p>}
            </div>
        )
    }
    
    export default SimpleTodoApp;`
  },
  simpletodowithtoaster: {
    title: 'Simple Todo App With Toaster',
    component: <SimpleTodoWithToaster />,
    code: `import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

const SimpleTodoWithToaster = () => {
    const [tasks, setTasks] = useState([]) // Stores Tasks
    const [input, setInput] = useState('') // Stores Input text

    const addTasks = () => {
        const trimmedInput = input.trim(); // remove spaces at start/end
        if (!trimmedInput) return; // do nothing if input is empty

        // Prevent duplicate tasks
        const isDuplicate = tasks.some(
            (task) => task.toLowerCase() === trimmedInput.toLowerCase()
        )
        if (isDuplicate) {
            toast.error('Task already Exist '); // Show Error Toast
            return;
        }
        setTasks([...tasks, trimmedInput]); // add new task to the list
        setInput("");
        toast.success('Task added'); // show success toast
    };
    return (
        <div style={{ maxWidth: "400px", margin: "50px auto", padding: "20px", border: "1px solid #ccc", borderRadius: "8px" }}>
            {/* Toaster component displays the toast notifications */}
            {/* shows at top right newest toast appears on top */}
            <Toaster position='top-right' reverseOrder={false} toasterId='default'/> 

            <h2 style={{ textAlign: "center" }} className='mb-2'>Todo App</h2>

            {/* Input and Add button */}
            <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
                <input
                    type="text" // input type is text
                    value={input} // controlled input
                    onChange={(e) => setInput(e.target.value)} // update input state
                    placeholder='Add a task' // placeholder text
                    style={{ flexGrow: '1', padding: '8px' }} // flexGrow: input takes available space
                    className='border *:border-gray-200 border-xl focus:border-gray-100'
                />
                <button
                    onClick={addTasks}  // call addTask on click
                    className='bg-gradient-to-r rounded-md font-semibold from-indigo-600 to-purple-600 text-white'
                    style={{ padding: '8px 12px' }}>
                    Add
                </button>
            </div>

            {/* List of tasks */}
            <ul>
                {tasks.map((task, index) => (
                    <li key={index}>
                        {task}
                    </li>
                ))}
            </ul>

            {/* Empty state message */}
            {tasks.length === 0 &&
                <p style={{ textAlign: 'center', color: '#888' }}>
                    No Tasks Yet.
                </p>
            }
        </div>
    )
}

export default SimpleTodoWithToaster;`
  },
  simpletodowithdelete: {
    title: 'Simple Todo App With Delete',
    component: <SimpleTodoWithDelete />,
    code: `import React, { useState } from "react";                 // Import React and useState hook
import toast, { Toaster } from "react-hot-toast";       // Import toast and Toaster from react-hot-toast library

const TodoAppWithDelete = () => {                       // Define a functional component called TodoAppWithDelete
    const [tasks, setTasks] = useState([]);              // State variable 'tasks' stores the list of tasks, initialized as empty array
    const [input, setInput] = useState("");              // State variable 'input' stores the text typed by the user, initialized as empty string

    // Function to add a new task
    const addTask = () => {
        const trimmedInput = input.trim();                // Remove whitespace from start and end of input
        if (!trimmedInput) return;                         // If input is empty after trimming, stop function

        const isDuplicate = tasks.some(                   // Check if the task already exists
            (task) => task.toLowerCase() === trimmedInput.toLowerCase() // Convert both to lowercase for case-insensitive comparison
        );
        if (isDuplicate) {                                // If a duplicate exists
            toast.error("Task already exists! ❌");         // Show error toast
            return;                                         // Stop function
        }

        setTasks([...tasks, trimmedInput]);               // Add new task to tasks array using spread operator
        setInput("");                                     // Clear input field
        toast.success("Task added! ✅");                  // Show success toast
    };

    // Function to delete a task
    const deleteTask = (index) => {                     // index is the position of task in array
        const newTasks = tasks.filter((_, i) => i !== index); // Create a new array excluding the task to delete
        setTasks(newTasks);                               // Update tasks state with new array
        toast.success("Task deleted! 🗑️");               // Show success toast for deletion
    };

    return (                                            // JSX: what this component renders
        <div
            style={{                                       // Inline CSS styles for container
                maxWidth: "400px",                           // Maximum width 400px
                margin: "50px auto",                         // 50px top/bottom margin, auto left/right to center
                padding: "20px",                              // 20px padding inside container
                border: "1px solid #ccc",                     // 1px light gray border
                borderRadius: "8px",                          // Rounded corners
            }}
        >
            <Toaster position="top-right" reverseOrder={false} />  {/* Toaster component displays toast notifications */}

            <h2 style={{ textAlign: "center" }}>Todo App</h2>     {/* Heading, centered */}

            {/* Input and Add button */}
            <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}> {/* Flex container for input and button */}
                <input
                    type="text"                               // Text input
                    value={input}                             // Controlled input linked to input state
                    onChange={(e) => setInput(e.target.value)}// Update input state on typing
                    placeholder="Add a task"                  // Placeholder text
                    style={{ flexGrow: 1, padding: "8px" }}  // FlexGrow: input expands to fill space; padding 8px
                />
                <button onClick={addTask} style={{ padding: "8px 12px" }}>Add</button> {/* Button calls addTask on click */}
            </div>

            {/* List of tasks */}
            <ul>
                {tasks.map((task, index) => (              // Loop through tasks array
                    <li
                        key={index}                             // Unique key for React rendering
                        style={{ display: "flex", justifyContent: "space-between", padding: "4px 0" }} // Flex row: task text + delete button
                    >
                        <span>{task}</span>                     // Display task text
                        <button
                            onClick={() => deleteTask(index)}     // Call deleteTask when clicked
                            style={{ color: "red", marginLeft: "10px" }} // Red delete button with spacing
                        >
                            ✕                                       {/* Unicode cross symbol */}
                        </button>
                    </li>
                ))}
            </ul>

            {/* Empty state message */}
            {tasks.length === 0 && (                     // If no tasks
                <p style={{ textAlign: "center", color: "#888" }}>No tasks yet.</p>  // Show message
            )}
        </div>
    );
};

export default TodoAppWithDelete;                  // Export component so it can be used in App.jsx
`
  },
  simpletodowithedit: {
    title: 'Simple Todo With Add, Edit, Delete, Toaster',
    component: <SimpleTodoWithEdit />,
    code: `
    import React, { useState } from "react";                 // Import React and useState hook
    import toast, { Toaster } from "react-hot-toast";       // Import toast and Toaster component for notifications

    const TodoAppListEditIcon = () => {                     // Define functional component
      const [tasks, setTasks] = useState([]);              // tasks: array to store all tasks
      const [input, setInput] = useState("");              // input: stores current input value
      const [editIndex, setEditIndex] = useState(null);    // editIndex: index of task being edited

      // Function to add new task or save edited task
      const handleAddOrEdit = () => {
        const trimmedInput = input.trim();                 // Remove spaces at start/end
        if (!trimmedInput) return;                         // Stop if empty

        const isDuplicate = tasks.some(
          (task, i) => task.toLowerCase() === trimmedInput.toLowerCase() && i !== editIndex
        );                                                // Check for duplicates excluding the task being edited
        if (isDuplicate) {
          toast.error("Task already exists! ❌");          // Show error if duplicate
          return;
        }

        if (editIndex !== null) {                          // If editing
          const newTasks = [...tasks];                     // Copy tasks array
          newTasks[editIndex] = trimmedInput;             // Update task
          setTasks(newTasks);                              // Update state
          setEditIndex(null);                              // Exit edit mode
          toast.success("Task updated! ✅");               // Show success toast
        } else {                                          // If adding new task
          setTasks([...tasks, trimmedInput]);             // Add task
          toast.success("Task added! ✅");                 // Show success toast
        }

        setInput("");                                      // Clear input
      };

      // Function to delete task
      const deleteTask = (index) => {
        const newTasks = tasks.filter((_, i) => i !== index); // Remove task
        setTasks(newTasks);                                // Update state
        toast.success("Task deleted! 🗑️");                // Show toast
      };

      // Function to start editing a task
      const startEdit = (index) => {
        setEditIndex(index);                               // Set editIndex
        setInput(tasks[index]);                             // Fill input with task text
      };

      return (
        <div
          style={{
            maxWidth: "400px",
            margin: "50px auto",
            padding: "20px",
            border: "1px solid #ccc",
            borderRadius: "8px",
          }}
        >
          <Toaster position="top-right" reverseOrder={false} /> {/* Display toast notifications */}

          <h2 style={{ textAlign: "center" }}>Todo App</h2>    {/* Title */}

          {/* Input and Add/Save button */}
          <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Add a task"
              style={{ flexGrow: 1, padding: "8px" }}
            />
            <button onClick={handleAddOrEdit} style={{ padding: "8px 12px" }}>
              {editIndex !== null ? "Save" : "Add"}          {/* Button text changes */}
            </button>
          </div>

          {/* Task List */}
          <ul>
            {tasks.map((task, index) => (
              <li
                key={index}                                // Unique key
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "4px 0",
                }}
              >
                {/* Show icon next to task if it is being edited */}
                <span>
                  {editIndex === index ? "✏️ " : ""}        {/* Show pencil icon if editing this task */}
                  {task}                                   {/* Show task text */}
                </span>
                <div>
                  <button
                    onClick={() => startEdit(index)}       // Start editing this task
                    style={{ marginRight: "5px", color: "blue" }}
                  >
                    ✏️
                  </button>
                  <button
                    onClick={() => deleteTask(index)}      // Delete task
                    style={{ color: "red" }}
                  >
                    ✕
                  </button>
                </div>
              </li>
            ))}
          </ul>

          {/* Empty state */}
          {tasks.length === 0 && (
            <p style={{ textAlign: "center", color: "#888" }}>No tasks yet.</p>
          )}
        </div>
      );
    };

    export default TodoAppListEditIcon;                     // Export component `
  },
  simpletodowithlocalstorage: {
    title: 'Simple Todo With Add, Edit, Delete, Toaster, Local Storage',
    component: <SimpleTodoWithLocalStorage />,
    code: `
    import React, { useState, useEffect } from "react";       // Import React and hooks
    import toast, { Toaster } from "react-hot-toast";        // Import toast notifications

    const SimpleTodoWithLocalStorage = () => {                 
        const [tasks, setTasks] = useState([]);              // Store tasks
        const [input, setInput] = useState("");              // Input value
        const [editIndex, setEditIndex] = useState(null);    // Index of task being edited

        // 1️⃣ Load tasks from localStorage when component mounts
        useEffect(() => {
            const savedTasks = JSON.parse(localStorage.getItem("tasks") || "[]"); // Get tasks from localStorage, or empty array
            setTasks(savedTasks); // Set them in state
        }, []); // Empty dependency array -> runs only once

        // 2️⃣ Save tasks to localStorage whenever tasks change
        useEffect(() => {
            localStorage.setItem("tasks", JSON.stringify(tasks)); // Convert tasks array to string and save
        }, [tasks]); // Runs every time tasks state changes

        // Add or edit task
        const handleAddOrEdit = () => {
            const trimmedInput = input.trim();                
            if (!trimmedInput) return;                        

            const isDuplicate = tasks.some(
                (task, i) => task.toLowerCase() === trimmedInput.toLowerCase() && i !== editIndex
            );                                                
            if (isDuplicate) {
                toast.error("Task already exists! ❌");          
                return;
            }

            if (editIndex !== null) {                          
                const newTasks = [...tasks];                    
                newTasks[editIndex] = trimmedInput;             
                setTasks(newTasks);                              
                setEditIndex(null);                              
                toast.success("Task updated! ✅");               
            } else {                                          
                setTasks([...tasks, trimmedInput]);             
                toast.success("Task added! ✅");                 
            }

            setInput("");                                      
        };

        // Delete task
        const deleteTask = (index) => {
            const newTasks = tasks.filter((_, i) => i !== index); 
            setTasks(newTasks);                                
            toast.success("Task deleted! 🗑️");                
        };

        // Start editing task
        const startEdit = (index) => {
            setEditIndex(index);                               
            setInput(tasks[index]);                             
        };

        return (
            <div
                style={{
                    maxWidth: "400px",
                    margin: "50px auto",
                    padding: "20px",
                    border: "1px solid #ccc",
                    borderRadius: "8px",
                }}
            >
                <Toaster position="top-right" reverseOrder={false} /> 

                <h2 style={{ textAlign: "center" }} className="mb-3">Todo App</h2>  

                <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
                    <input
                        type="text" 
                        value={input} 
                        onChange={(e) => setInput(e.target.value)} 
                        placeholder='Add a task' 
                        style={{ flexGrow: '1', padding: '8px' }} 
                        className='border *:border-gray-200 border-xl focus:border-gray-100'
                    />
                    <button
                        onClick={handleAddOrEdit}  
                        className='bg-gradient-to-r rounded-md font-semibold from-indigo-600 to-purple-600 text-white'
                        style={{ padding: '8px 12px' }}>
                        {editIndex !== null ? "Save" : "Add"}
                    </button>
                </div>

                <ul>
                    {tasks.map((task, index) => (
                        <li
                            key={index}                                
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                padding: "4px 0",
                            }}
                        >
                            <span>
                                {editIndex === index ? "✏️ " : ""}        
                                {task}                                   
                            </span>
                            <div>
                                <button
                                    onClick={() => startEdit(index)}       
                                    style={{ marginRight: "5px", color: "blue" }}
                                >
                                    ✏️
                                </button>
                                <button
                                    onClick={() => deleteTask(index)}      
                                    style={{ color: "red" }}
                                >
                                    ✕
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>

                {tasks.length === 0 && (
                    <p style={{ textAlign: "center", color: "#888" }}>No tasks yet.</p>
                )}
            </div>
        );
    };

    export default SimpleTodoWithLocalStorage;
`
  },
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

      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
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