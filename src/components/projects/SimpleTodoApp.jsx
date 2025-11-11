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

            <div style={{ display: "flex", gap: "10px", marginBottom: "20px" , flexWrap: 'wrap'}}>
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

export default SimpleTodoApp;