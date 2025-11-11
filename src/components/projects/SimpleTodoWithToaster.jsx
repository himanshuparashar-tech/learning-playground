import React, { useState } from 'react';
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
            <Toaster position='top-right' reverseOrder={false} toasterId='default' />

            <h2 style={{ textAlign: "center" }} className='mb-2'>Todo App</h2>

            {/* Input and Add button */}
            <div style={{ display: "flex", gap: "10px", marginBottom: "20px", flexWrap: 'wrap' }}>
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

export default SimpleTodoWithToaster;