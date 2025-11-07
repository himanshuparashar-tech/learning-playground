import React, { useState } from 'react';

// React Icons
import { BiAbacus, BiLeaf, BiMenu } from 'react-icons/bi';
import { CgChevronRight, CgClose } from 'react-icons/cg';
import { FaBookOpen } from 'react-icons/fa';
import { HiHome } from 'react-icons/hi';

// Routing
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';


const Sidebar = () => {

    // State changing while click
    const [isOpen, setIsOpen] = useState(true);
    const [openMenu, setOpenMenu] = useState(null); // Track which menu is expanded
    const location = useLocation(); // Get Current Route
    const navigate = useNavigate();

    const handleParentClick = ((item) => {
        if (item.children && item.children.length > 0) {
            // Toggle Submenu
            setOpenMenu(openMenu === item.name ? null : item.name);
        }
        else {
            navigate(item.path);
        }
    })

    const menuItems = [
        {
            name: 'Getting Started',
            icon: <HiHome size={20} />,
            rightIcon: <CgChevronRight />,
            path: '',
            children: [
                { name: 'Introduction', icon: <BiAbacus />, path: '/intro' }
            ]
        },
        {
            name: 'Learn',
            icon: <BiLeaf size={20} />,
            rightIcon: <CgChevronRight />,
            path: '/tabsLayout',
            children: [
                { name: 'Tabs', icon: <FaBookOpen size={20} />, path: '/tabsLayout' },
            ]
        },
        {
            name: 'About',
            icon: <FaBookOpen size={20} />,
            path: '/about'
        }
    ];
    return (
        <div className='flex min-h-screen bg-white'>

            {/* Sidebar */}
            <aside className={`border-r border-r-zinc-100 p-5 transition-all duration-300 ${isOpen ? 'w-64' : 'w-20'}`}>

                {/* Toggle Button */}
                <button className=' mb-6 flex-items-center gap-2' onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? <CgClose /> : <BiMenu />}
                </button>

                {/* Sidebar Menu using Map */}
                <ul className='p-0' style={{ padding: 0 }}>
                    {menuItems.map((item, index) => {
                        const isActiveParent =
                            item.children?.some((child) => child.path === location.pathname) ||
                            item.path === location.pathname;
                        return (
                            <li key={index}
                                className='cursor-pointer no-listing py-2'>

                                {/* Parent Menu */}
                                <div onClick={() => handleParentClick(item)} className={`flex items-center gap-3 rounded hovr:bg-gray-700 p-2 ${isActiveParent ? 'bg-gray-300 text-black font-medium' : 'hover:bg-gray-100'}`}>
                                    {item.icon}
                                    {isOpen && <span>{item.name}</span>}

                                    {/* Arrow */}
                                    {item.children && (
                                        <span className={` transition-transform duration-300 
                                        ${openMenu === item.name ? 'rotate-90' : 'rotate-0'}`}>
                                            {item.rightIcon}
                                        </span>
                                    )}
                                </div>

                                {/* Render Child Links */}
                                {isOpen && item.children && openMenu === item.name && (
                                    <ul className="ml-6 border-l border-l-zinc-200">
                                        {item.children.map((child, i) => {
                                            const isActiveChild = location.pathname === child.path;
                                            return (
                                                <li li key={i} className={`hover:text-purple-600 p-2 rounded no-listing 
                                                    ${isActiveChild
                                                        ? "bg-gray-300 text-black font-medium"
                                                        : "hover:bg-gray-100"
                                                    }`}
                                                >
                                                    <Link to={child.path}>{child.name}</Link>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                )
                                }
                            </li>
                        )
                    }
                    )}
                </ul>
            </aside>

            {/* Main Content */}
            <main className='flex-1 p-8 '>
                <Outlet />
            </main>
        </div >
    )
};
export default Sidebar