import React from 'react'


const Searchbar = ({ value, onChange, placeholder }) => {
    return (
        <div>
            <input
                type="text"
                value={value}
                placeholder={placeholder}
                onChange={(e) => onChange(e.target.value)}
                className="w-full px-4 py-2 border border-[var(--border)] rounded-lg 
                       bg-[var(--bg-secondary)] text-[var(--text)]
                       focus:ring focus:ring-blue-500 outline-none transition"
            />
        </div>
    )
}

export default Searchbar