import React, { useState } from 'react'

const ReactJs_Counter = () => {
    const [count, setCount] = useState(0);

    const incre = (e) => {
        setCount(prev => prev + 1)
    }
    const decre = (e) => {
        setCount(prev => prev - 1);
    }
    return (
        <div>
            <p>{count}</p>
            <button className='cstm' onClick={decre}>-</button>
            <button className='cstm' onClick={incre}>+</button>
        </div>
    )
}

export default ReactJs_Counter