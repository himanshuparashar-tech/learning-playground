import React, { useState } from 'react';

const SimpleTodo = () => {
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
            <h2 style={{ textAlign: "center" }}>Todo App</h2>

            <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder='Add a task'
                    style={{flexGrow: '1', padding: '8px'}}
                />
            </div>

        </div>
    )
}

export default SimpleTodo;