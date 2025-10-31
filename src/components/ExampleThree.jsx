import React, { useEffect, useState } from 'react'

const ExampleThree = () => {
    const [name, setName] = useState(() => {
        const savedName = localStorage.getItem('name');
        return savedName ? JSON.parse(savedName) : ''
    })

    useEffect(() => {
        localStorage.setItem('name', JSON.stringify(name))
    }, [name])

    const handleChange = (event) => {
        setName(event.target.value);
    }
    const handleClear = () => {
        setName('');
    }
    return (
        <div>
            <h6>Your Name : {name}</h6>
            <input type="text" value={name} onChange={handleChange} placeholder='Enter your name' className='cstm-input' />
            <button onClick={handleClear} className='cstm m-1'>Clear Name</button>
        </div>
    )
}

export default ExampleThree