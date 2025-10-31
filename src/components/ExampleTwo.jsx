import React, { useState } from 'react'


const ExampleTwo = () => {
    const [randomNumber, setRandomNumber] = useState(() => Math.floor(Math.random() * 100));
    const generateNewRandomNumber = () => {
        const newNumber = Math.floor(Math.random() * 100);
        setRandomNumber(newNumber);
    }
    return (
        <div>
            <h6>Random Number : {randomNumber}</h6>
            <button className='cstm m-1' onClick={generateNewRandomNumber}>Generate New Number</button>
        </div>
    )
}

export default ExampleTwo