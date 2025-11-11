import React, { useState } from 'react'

const MiniChallenge2 = () => {
    const [state, setState] = useState({ count: 0, color: 'goldenrod' });

    const handleClick = () => {
        setState(prev => ({
            count: prev.count + 1,
            color: prev.count % 2 === 0 ? 'goldenrod' : 'gray'
        }))
    }

    return (
        <div style={{ padding: '10px', display: 'flex', justifyContent: 'space-between' }}>
            <button
                className='cstm'
                onClick={handleClick}
                style={{ backgroundColor: state.color, color: 'white' }}>Click Me
            </button>
            <h1 style={{ color: state.color }}>Product: {state.count}</h1>
        </div>
    )
}

export default MiniChallenge2