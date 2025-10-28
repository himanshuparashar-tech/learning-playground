import React, { useState } from 'react'
// Imports React so you can use JSX.
// Imports useState hook to manage state (like variables that remember values even after a re-render).

const TodoAppOne = () => {
    //Defines a functional component named TodoApp.
    //Think of it as a recipe: this function will return the "dish" (the UI) for your app.

    const [tasks, setTasks] = useState([]);
    return (
        <div>TodoAppOne</div>
    )
}

export default TodoAppOne