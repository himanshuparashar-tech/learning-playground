import React, { useEffect, useState } from 'react'

const LocalStorage = () => {
    const [name, setName] = useState(() => {
        const savedName = localStorage.getItem("name");
        return savedName ? JSON.parse(savedName) : ""
    })

    useEffect(() => {
        localStorage.setItem("name", JSON.stringify(name))
    }, [name]);

    const handleChange = (e) => {
        setName(e.target.value);
    }

    const handleClear = () => {
        setName("");
    }
    return (
        <div>
            <h1>Your Name  :  {name}</h1>
            <input className="cstm-input" type="text" value={name} onChange={handleChange} placeholder='Enter your name' />
            <button className="cstm" type='button' onClick={handleClear}>Clear</button>
        </div>
    )
}

export default LocalStorage