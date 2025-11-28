import React, { useState } from 'react'
import toast, { Toaster } from 'react-hot-toast';

const ReactJs_ArrayOfData = () => {
    const [item, setItem] = useState([]);
    const [input, setInput] = useState("");

    const addHandleChange = () => {
        if (!input.trim()) return;

        // Prevent Duplicate Items
        if (item.includes(input.trim())) {
            toast.error("Already available in the list");
            return;
        }

        setItem([...item, input])
        setInput("");
        toast.success("Item added!")
    }

    return (
        <div>
            <form action="">
                <Toaster position='bottom right' id='defaultId'></Toaster>
                <input type="text" className='cstm-input' placeholder='Please add a task' value={input} onChange={(e) => setInput(e.target.value)} />
                <button type='button' className='cstm' onClick={addHandleChange}>Add</button>

                <ul>
                    {item.map((t, i) => (
                        <li key={i}>{t}</li>
                    ))}
                </ul>
            </form>
        </div>
    )
}

export default ReactJs_ArrayOfData