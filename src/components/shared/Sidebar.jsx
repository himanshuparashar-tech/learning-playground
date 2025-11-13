import React, { useState } from 'react';

// React Icons
import { BiAbacus, BiAperture, BiCode, BiFace, BiLeaf, BiMenu } from 'react-icons/bi';
import { CgChevronRight, CgClose } from 'react-icons/cg';
import { FaBookOpen } from 'react-icons/fa';
import { HiHome } from 'react-icons/hi';

// Routing
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';


const Sidebar = () => {

    // State changing while click
    const [isOpen, setIsOpen] = useState(false);
    const [openMenu, setOpenMenu] = useState(null); // Track which menu is expanded
    const location = useLocation(); // Get Current Route
    const navigate = useNavigate();


    const handleParentClick = (item) => {
        if (!isOpen && item.path || isOpen && !item.children) {
            // Sidebar is collapsed → Navigate directly
            navigate(item.path);
        } else if (item.children && item.children.length > 0) {
            // Sidebar expanded → toggle submenu
            setOpenMenu(openMenu === item.name ? null : item.name);
        }

    };

    const menuItems = [
        {
            name: 'Getting Started',
            icon: <HiHome size={20} />,
            rightIcon: <CgChevronRight />,
            path: '/intro',
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
        },
        {
            name: 'Projects',
            icon: <BiAbacus size={20} />,
            rightIcon: <CgChevronRight />,
            path: '/projects/todo',
            children: [
                { name: 'Todo App', icon: <BiAbacus size={20} />, path: '/projects/todo' },
                { name: 'Simple Todo App', icon: <BiAbacus size={20} />, path: '/projects/simpletodo' },
                { name: 'Simple Todo Toaster', icon: <BiAbacus size={20} />, path: '/projects/simpletodowithtoaster' },
                { name: 'Simple Todo Edit', icon: <BiAbacus size={20} />, path: '/projects/simpletodowithedit' },
                { name: 'Simple Todo Delete', icon: <BiAbacus size={20} />, path: '/projects/simpletodowithdelete' },
                { name: 'Simple Todo Local Storage', icon: <BiAbacus size={20} />, path: '/projects/simpletodowithlocalstorage' },
            ]
        },
        {
            name: 'CodePlay',
            icon: <BiCode size={20} />,
            path: '/demo',
        },
        {
            name: 'FAQ',
            icon: <BiAperture size={20} />,
            path: '/faq',
        }
    ];
    return (
        <div className=' bg-[var(--bg)] overflow-auto text-[var(--text)]'>

            {/* Sidebar */}
            <aside className={`text-[var(--text)] p-5 transition-all duration-300 ${isOpen ? 'w-64' : 'w-20'} bg-[var(--bg)]`}>

                {/* Toggle Button */}
                <button className='px-3 mb-6 flex-items-center gap-2 text-[var(--text)] hover:bg-[var(--hover-bg)]' onClick={() => setIsOpen(!isOpen)}>
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
                                <div onClick={() => handleParentClick(item)} className={`flex items-center justify-between gap-3 rounded hover:bg-gray-100 p-2 ${isActiveParent ? 'bg-gradient-to-br from-indigo-600 to-purple-600 text-white font-medium' : 'hover:bg-[var(--hover-bg)] hover:text-[var(--text)]'}`}>

                                    <div className="flex items-center gap-3">
                                        {/* Icon */}
                                        <span onClick={() => handleParentClick(item)}>
                                            {item.icon}
                                        </span>
                                        {isOpen && <span>{item.name}</span>}
                                    </div>

                                    {/* Arrow */}
                                    {isOpen && item.children && (
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
                                                <li key={i} className={`hover:text-purple-600 p-2 rounded no-listing 
                                                    ${isActiveChild
                                                        ? "bg-gradient-to-br from-indigo-300 to-purple-300 text-black font-medium"
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
            <main className='flex-auto md:flex-1'>
                <Outlet />
            </main>
        </div >
    )
};
export default Sidebar