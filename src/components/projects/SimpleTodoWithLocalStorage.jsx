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
       tasks.length !== 0 && localStorage.setItem("tasks", JSON.stringify(tasks)); // Convert tasks array to string and save
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

            <div style={{ display: "flex", gap: "10px", marginBottom: "20px", flexWrap: 'wrap' }}>
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
