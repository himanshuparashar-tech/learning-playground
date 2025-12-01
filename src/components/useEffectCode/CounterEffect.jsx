import React, { useEffect, useState } from 'react'

const CounterEffect = () => {
    const [countValue, setCountValue] = useState(0);

    useEffect(() => {
        document.title = `count: ${countValue}`
    }, [countValue])

    return (
        <div>
            <h5>{countValue}</h5>
            <button className='cstm' onClick={() => setCountValue(prev => prev + 1)}>click me</button>
        </div>
    )
}

export default CounterEffect