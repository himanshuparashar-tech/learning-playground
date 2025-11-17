import React, { useState } from 'react';

// React Icons
import { BiAbacus, BiAperture, BiCode, BiLeaf, BiMenu } from 'react-icons/bi';
import { CgChevronRight, CgClose } from 'react-icons/cg';
import { FaBookOpen } from 'react-icons/fa';
import { HiHome } from 'react-icons/hi';

// Routing
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false);

    // ⭐ Stores which menus are open (multi-level)
    const [openMenus, setOpenMenus] = useState({});

    const location = useLocation();
    const navigate = useNavigate();

    // ⭐ Toggle logic for ANY level
    const toggleMenu = (item) => {
        if (!isOpen) {
            navigate(item.path);
            return;
        }

        if (item.children) {
            setOpenMenus(prev => ({
                ...prev,
                [item.name]: !prev[item.name]
            }));
        } else {
            navigate(item.path);
        }
    };

    // ⭐ Menu Structure (supports unlimited levels)
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
            path: '/projects',

            children: [
                { name: 'Todo App', icon: <BiAbacus size={20} />, path: '/projects/todo' },
                { name: 'Simple Todo App', icon: <BiAbacus size={20} />, path: '/projects/simpletodo' },

                {
                    name: 'JavaScript',
                    icon: <BiAbacus size={20} />,
                    rightIcon: <CgChevronRight />,
                    path: '/projects/javascript',
                    children: [
                        {
                            name: 'Accordion',
                            icon: <BiAbacus size={20} />,
                            rightIcon: <CgChevronRight />,
                            path: '/projects/singleopenaccordion',

                            // ⭐ 4th Level Example
                            children: [
                                {
                                    name: 'Single Open',
                                    icon: <BiAbacus size={20} />,
                                    path: '/projects/singleopenaccordion'
                                },
                                {
                                    name: 'Multiple Open',
                                    icon: <BiAbacus size={20} />,
                                    path: '/projects/multiopenaccordion'
                                }
                            ]
                        }
                    ]
                },

                {
                    name: 'Bootstrap 5',
                    icon: <BiAbacus size={20} />,
                    rightIcon: <CgChevronRight />,
                    path: '/projects/bootstrap5',
                    children: [
                        { name: 'Modal Example', icon: <BiAbacus size={20} />, path: '/projects/bootstrap5/modal' },
                        { name: 'Carousel Example', icon: <BiAbacus size={20} />, path: '/projects/bootstrap5/carousel' }
                    ]
                },

                {
                    name: 'ReactJS',
                    icon: <BiAbacus size={20} />,
                    rightIcon: <CgChevronRight />,
                    path: '/projects/reactjs',
                    children: [
                        { name: 'useState Example', icon: <BiAbacus size={20} />, path: '/projects/reactjs/usestate' },
                        { name: 'useEffect Example', icon: <BiAbacus size={20} />, path: '/projects/reactjs/useeffect' }
                    ]
                },
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

    // ⭐ Recursive Renderer (this is the magic)
    const renderMenu = (items, level = 1) => {
        return (
            <ul className={`${level > 1 ? "ml-6 border-l border-l-zinc-200 p-0" : "p-0 no-padding"} sidebar-level-${level}`}>
                {items.map((item, index) => {
                    const isActive = location.pathname === item.path;
                    const isOpenItem = openMenus[item.name];

                    return (
                        <li key={index} className="py-1 no-listing text-center">

                            {/* Menu Button */}
                            <div
                                onClick={() => toggleMenu(item)}
                                className={`flex items-center py-2 rounded cursor-pointer ${isOpen ? "justify-between px-3" : "justify-center px-2"}
                                ${isActive
                                        ? "bg-gradient-to-br from-indigo-600 to-purple-600 text-white font-medium"
                                        : "hover:bg-[var(--hover-bg)] text-[var(--text)]"
                                    }`}
                            >
                                <div className={`flex items-center gap-3`}>
                                    <span className={`icon-left `}>{item.icon}</span>
                                    {isOpen && <span className='item-name'>{item.name}</span>}
                                </div>

                                {isOpen && item.children && (
                                    <span className={`transition-transform duration-300 ${isOpenItem ? "rotate-90" : ""} icon-right-${level}`}>
                                        {item.rightIcon}
                                    </span>
                                )}
                            </div>

                            {/* Children */}
                            {isOpen && item.children && isOpenItem && (
                                <div className="mt-2">{renderMenu(item.children, level + 1)}</div>
                            )}

                        </li>
                    );
                })}
            </ul>
        );
    };

    return (
        <div className="bg-[var(--bg)] overflow-auto text-[var(--text)]">
            <aside
                className={`p-5 transition-all duration-300 bg-[var(--bg)]
                ${isOpen ? "w-64" : "w-20"}`}
            >
                {/* Toggle Button */}
                <button
                    className="px-3 mb-6 text-[var(--text)] hover:bg-[var(--hover-bg)]"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <CgClose /> : <BiMenu />}
                </button>

                {/* Render Sidebar */}
                {renderMenu(menuItems)}
            </aside>

            <main className="flex-auto md:flex-1">
                <Outlet />
            </main>
        </div>
    );
};

export default Sidebar;
