import React, { useState } from "react";                 // Import React and useState hook
import toast, { Toaster } from "react-hot-toast";       // Import toast and Toaster from react-hot-toast library

const SimpleTodoWithDelete = () => {                       // Define a functional component called SimpleTodoWithDelete
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
            toast.error("Task already exists!");         // Show error toast
            return;                                         // Stop function
        }

        setTasks([...tasks, trimmedInput]);               // Add new task to tasks array using spread operator
        setInput("");                                     // Clear input field
        toast.success("Task added!");                  // Show success toast
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

            <h2 style={{ textAlign: "center" }} className="mb-2">Todo App</h2>     {/* Heading, centered */}

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
                    onClick={addTask}  // call addTask on click
                    className='bg-gradient-to-r rounded-md font-semibold from-indigo-600 to-purple-600 text-white'
                    style={{ padding: '8px 12px' }}>
                    Add
                </button>
            </div>



            {/* List of tasks */}
            <ul style={{ padding: '0' }}>
                {tasks.map((task, index) => (              // Loop through tasks array
                    <li
                        key={index}                             // Unique key for React rendering
                        style={{ display: "flex", justifyContent: "center", padding: "4px 1px", borderRadius: '12px' }} // Flex row: task text + delete button
                        className="relative p-1 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 mb-2"
                    >
                        <div className="bg-white rounded-lg p-2 w-[98%] flex justify-between">
                            <span >{task}</span>                     {/* Display task text */}
                            <button
                                onClick={() => deleteTask(index)}     // Call deleteTask when clicked
                                style={{ color: "red", marginLeft: "10px" }} // Red delete button with spacing
                            >
                                ✕                                       {/* Unicode cross symbol */}
                            </button>
                        </div>
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

export default SimpleTodoWithDelete;                  // Export component so it can be used in App.jsx
