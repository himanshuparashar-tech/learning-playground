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

            <h2 style={{ textAlign: "center" }} className="mb-3">Todo App</h2>    {/* Title */}

            {/* Input and Add/Save button */}
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
                    onClick={handleAddOrEdit}  // call addTask on click
                    className='bg-gradient-to-r rounded-md font-semibold from-indigo-600 to-purple-600 text-white'
                    style={{ padding: '8px 12px' }}>
                    {editIndex !== null ? "Save" : "Add"}
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

export default TodoAppListEditIcon;                     // Export component
