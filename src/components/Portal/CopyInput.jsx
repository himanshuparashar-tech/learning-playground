import React, { useState } from 'react'
import PopUpContent from './PopUpContent';

const CopyInput = () => {
    const [inputValue, setInputValue] = useState('');
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        if (!inputValue.trim()) return;
        navigator.clipboard.writeText(inputValue).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 5000);
        })
    }
    return (
        <div>
            <input className='cstm-input' type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
            <button className='cstm' onClick={handleCopy}>Copy</button>

            <PopUpContent copied={copied} />
        </div>
    )
}

export default CopyInput