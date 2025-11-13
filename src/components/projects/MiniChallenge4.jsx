import React, { useState } from 'react';
import { ArrayData } from '../pages/ArrayData';

const MiniChallenge4 = () => {
    const [darkMode, setDarkMode] = useState(false);

    // ToggleTheme
    const toggleTheme = () => {
        setDarkMode(prev => !prev);
    }

    return (
        <div className={`p-6 rounded-xl shadow-lg transition-all duration-300 ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
            <h2 className='text-2xl font-bold mb-3'>
                {darkMode ? "🌙 Dark Mode" : "☀️ Light Mode"}
            </h2>

            <p className='mb-4'>Click to toggle between light and dark mode</p>

            <button onClick={toggleTheme} className='cstm'>{darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}</button>
        </div>
    )
}

export default MiniChallenge4