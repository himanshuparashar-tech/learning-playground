import React, { useState } from 'react'
import Topic1 from './Daily-Code/Topic1';
import { MdTopic } from 'react-icons/md';
import { BiMenu } from 'react-icons/bi';
import { CgClose } from 'react-icons/cg';

const Demo = () => {
    const [isOpen, setIsOpen] = useState(true);

    // Sidebar menu items
    const menuItems = [
        { name: 'Topic1', icon: <MdTopic size={20} /> },
        { name: 'Topic2', icon: <MdTopic size={20} /> }
    ];

    return (
        <div className="flex min-h-screen bg-gray-100">

            {/* Sidebar */}
            <aside className={`bg-gray-900 text-white p-5 transition-all duration-300  ${isOpen ? 'w-64' : 'w-20'} `}>

                {/* Toggle Button */}
                <button className="text-white mb-6 flex items-center gap-2 hover:text-gray-300"
                    onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? <BiMenu /> : <CgClose />}
                    {isOpen && <span className="text-lg font-semibold">Menu</span>}
                </button>

                {/* Sidebar Menu using Map */}
                <ul className='space-y-3'>
                    {menuItems.map((item, index) => {
                        return (
                            <li key={index} className="hover:bg-gray-700 p-2 rounded flex items-center gap-3 cursor-pointer"
                            >
                                {item.icon}
                                {isOpen && <span>{item.name}</span>}
                            </li>
                        )
                    })
                    }
                </ul>
            </aside>
        </div>
    )
}

export default Demo