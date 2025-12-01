import React, { useEffect, useState } from 'react'

const UseEffectBlock = () => {
    const [value, setValue] = useState(0);
    const [some, setSome] = useState(0);


    useEffect(() => {
        console.log("call useEffect")
        document.title = `Increment ${value}`
    }, [value]);

    return (
        <div>
            <h2>{value}</h2>
            <button onClick={() => setValue(prev => prev + 1)} className='cstm mr-3'>Click</button>
            <button onClick={() => setSome(prev => prev + 1)} className='cstm'>Incre by some</button>
        </div>
    )
}

export default UseEffectBlock