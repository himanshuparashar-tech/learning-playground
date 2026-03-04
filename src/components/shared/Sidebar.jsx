import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BiAbacus, BiAperture, BiCalculator, BiCode, BiLeaf, BiMenu } from 'react-icons/bi';
import { CgChevronRight, CgDisplayGrid } from 'react-icons/cg';
import { FaBookOpen } from 'react-icons/fa';
import { HiHome } from 'react-icons/hi';
import { MdDarkMode, MdLightMode } from 'react-icons/md';
import { IoLogOutOutline } from 'react-icons/io5';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const menuItems = [
  {
    name: 'Getting Started',
    icon: <HiHome size={20} />,
    rightIcon: <CgChevronRight />,
    path: '/intro',
    children: [{ name: 'Introduction', icon: <BiAbacus />, path: '/intro' }],
  },
  {
    name: 'Learn',
    icon: <BiLeaf size={20} />,
    rightIcon: <CgChevronRight />,
    path: '/tabsLayout',
    children: [{ name: 'Tabs', icon: <FaBookOpen size={20} />, path: '/tabsLayout' }],
  },
  { name: 'About', icon: <FaBookOpen size={20} />, path: '/about' },
  {
    name: 'Projects',
    icon: <BiAbacus size={20} />,
    rightIcon: <CgChevronRight />,
    path: '/projects',
    children: [
      { name: 'Todo App', icon: <BiAbacus size={20} />, path: '/projects/todo' },
      { name: 'Simple Todo App', icon: <BiAbacus size={20} />, path: '/projects/simpletodo' },
      {
        name: 'Bootstrap5',
        icon: <BiAbacus size={20} />,
        rightIcon: <CgChevronRight />,
        path: '/projects/bootstrap_projects',
        children: [
          {
            name: 'Accordion',
            icon: <BiAbacus size={20} />,
            rightIcon: <CgChevronRight />,
            path: '/projects/bs_singleopenaccordion',
            children: [
              { name: 'Single Open', icon: <BiAbacus size={20} />, path: '/projects/bs_singleopenaccordion' },
              { name: 'Multiple Open', icon: <BiAbacus size={20} />, path: '/projects/bs_multiopenaccordion' },
            ],
          },
        ],
      },
      {
        name: 'ReactJs',
        icon: <BiAbacus size={20} />,
        rightIcon: <CgChevronRight />,
        path: '/projects/reactjs',
        children: [
          {
            name: 'Accordion',
            icon: <BiAbacus size={20} />,
            rightIcon: <CgChevronRight />,
            path: '/projects/rjs_singleopenaccordion',
            children: [
              { name: 'Single Open', icon: <BiAbacus size={20} />, path: '/projects/rjs_singleopenaccordion' },
              { name: 'Multiple Open', icon: <BiAbacus size={20} />, path: '/projects/rjs_multiopenaccordion' },
            ],
          },
        ],
      },
    ],
  },
  { name: 'CodePlay', icon: <BiCode size={20} />, path: '/demo' },
  { name: 'FAQ', icon: <BiAperture size={20} />, path: '/faq' },
  { name: 'Display', icon: <CgDisplayGrid size={20} />, path: '/display' },
  { name: 'HBC', icon: <BiCalculator size={20} />, path: '/hbc' },
];

const flattenMenu = (items, level = 1) => {
  let result = [];
  items.forEach((item) => {
    result.push({ name: item.name, level });
    if (item.children) result = result.concat(flattenMenu(item.children, level + 1));
  });
  return result;
};

const menuItemsFlat = flattenMenu(menuItems);

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [openMenus, setOpenMenus] = useState({});
  const [isMobile, setIsMobile] = useState(false);
  const [theme, setTheme] = useState('light');
  const [mounted, setMounted] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const sidebarRef = useRef(null);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('theme');
      if (saved === 'dark' || saved === 'light') {
        setTheme(saved);
        document.documentElement.classList.toggle('dark', saved === 'dark');
      } else {
        const prefersDark = window.matchMedia?.('(prefers-color-scheme: dark)').matches;
        setTheme(prefersDark ? 'dark' : 'light');
        document.documentElement.classList.toggle('dark', prefersDark);
      }
    } catch (_) {
      setTheme('light');
    }
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    document.documentElement.classList.toggle('dark', theme === 'dark');
    try {
      localStorage.setItem('theme', theme);
    } catch (_) {}
  }, [theme, mounted]);

  useEffect(() => {
    if (!isMobile) {
      document.documentElement.style.setProperty('--sidebar-width', isOpen ? '260px' : '80px');
    } else {
      document.documentElement.style.setProperty('--sidebar-width', '0px');
    }
    return () => {
      document.documentElement.style.removeProperty('--sidebar-width');
    };
  }, [isOpen, isMobile]);

  useEffect(() => {
    if (isMobile && isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isMobile, isOpen]);

  const toggleMenu = (item, level) => {
    if (!isOpen && !isMobile) {
      if (item.children) setIsOpen(true);
      else navigate(item.path);
      return;
    }
    if (item.children) {
      setOpenMenus((prev) => {
        const updated = { ...prev };
        menuItemsFlat.filter((m) => m.level === level).forEach((m) => {
          if (m.name !== item.name) updated[m.name] = false;
        });
        updated[item.name] = !prev[item.name];
        return updated;
      });
    } else {
      navigate(item.path);
      if (isMobile) setIsOpen(false);
    }
  };

  const handleLogout = () => {
    localStorage.setItem('lastRoute', location.pathname);
    logout();
    setIsOpen(false);
    navigate('/login');
  };

  const renderMenu = (items, level = 1) => (
    <ul className={`list-none p-0 m-0 ${level > 1 ? 'ml-3 border-l border-[var(--border)] pl-3 mt-1 space-y-0.5' : 'space-y-1'}`}>
      {items.map((item, index) => {
        const isActive = location.pathname === item.path;
        const isOpenItem = openMenus[item.name];
        return (
          <motion.li
            key={`${item.name}-${index}`}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2, delay: index * 0.02 }}
            className="list-none"
          >
            <motion.div
              onClick={() => toggleMenu(item, level)}
              className={`flex items-center gap-3 py-2.5 px-3 rounded-xl cursor-pointer transition-all duration-200 min-h-[42px]
                ${isOpen ? 'justify-between' : 'justify-center'}
                ${isActive ? 'bg-indigo-500/15 dark:bg-indigo-400/15 text-indigo-600 dark:text-indigo-400 font-semibold ring-1 ring-indigo-500/30' : 'hover:bg-[var(--hover-bg)] text-[var(--text)]'}
              `}
              whileHover={{ scale: isActive ? 1 : 1.01 }}
              whileTap={{ scale: 0.99 }}
            >
              <div className="flex items-center gap-3 min-w-0">
                <span className={`flex-shrink-0 ${isActive ? 'text-indigo-600 dark:text-indigo-400' : ''}`}>{item.icon}</span>
                {isOpen && <span className="truncate text-[15px]">{item.name}</span>}
              </div>
              {isOpen && item.children && (
                <motion.span
                  animate={{ rotate: isOpenItem ? 90 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex-shrink-0 opacity-60"
                >
                  {item.rightIcon}
                </motion.span>
              )}
            </motion.div>
            <AnimatePresence>
              {isOpen && item.children && isOpenItem && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: 'easeInOut' }}
                  className="overflow-hidden"
                >
                  <div className="mt-1 ml-1">{renderMenu(item.children, level + 1)}</div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.li>
        );
      })}
    </ul>
  );

  const sidebarContent = (
    <>
      <div className="flex items-center p-4 border-b border-[var(--border)]">
        <motion.button
          onClick={() => {
            if (isMobile) setIsOpen(false);
            else setIsOpen((o) => !o);
          }}
          className="flex items-center gap-3 w-full text-left rounded-xl p-2 -m-2 hover:bg-[var(--hover-bg)] transition-colors"
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          aria-label={isOpen ? 'Collapse sidebar' : 'Expand sidebar'}
        >
          <span className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-indigo-500/25 flex-shrink-0">E</span>
          {isOpen && <span className="font-bold text-lg text-[var(--text)] truncate">E-Learning</span>}
        </motion.button>
      </div>

      <nav className="sidebar-nav flex-1 overflow-y-auto px-3 py-4 scrollbar-gradient" style={{ maxHeight: 'calc(100vh - 200px)' }}>
        {renderMenu(menuItems)}
      </nav>

      <div className="p-3 border-t border-[var(--border)] bg-[var(--bg)] space-y-1">
        <motion.button
          onClick={() => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))}
          className={`w-full flex items-center gap-3 py-2.5 px-3 rounded-xl hover:bg-[var(--hover-bg)] text-[var(--text-secondary)] hover:text-[var(--text)] transition-colors ${!isOpen ? 'justify-center' : ''}`}
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? <MdLightMode size={20} /> : <MdDarkMode size={20} />}
          {isOpen && <span className="text-sm">Theme</span>}
        </motion.button>
        {user && (
          <motion.button
            onClick={handleLogout}
            className={`w-full flex items-center gap-3 py-2.5 px-3 rounded-xl hover:bg-red-500/10 text-[var(--text-secondary)] hover:text-red-500 transition-colors ${!isOpen ? 'justify-center' : ''}`}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
          >
            <IoLogOutOutline size={20} />
            {isOpen && <span className="text-sm">Logout</span>}
          </motion.button>
        )}
      </div>
    </>
  );

  if (isMobile) {
    return (
      <>
        <motion.button
          onClick={() => setIsOpen(true)}
          className="fixed z-40 w-14 h-14 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-xl shadow-indigo-500/40 flex items-center justify-center bottom-[max(1.5rem,env(safe-area-inset-bottom))] left-[max(1.5rem,env(safe-area-inset-left))]"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 260, damping: 20 }}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Open menu"
        >
          <BiMenu size={24} />
        </motion.button>

        <AnimatePresence>
          {isOpen && (
            <>
              <motion.div
                className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                onClick={() => setIsOpen(false)}
                aria-hidden="true"
              />
              <motion.aside
                ref={sidebarRef}
                className="fixed top-0 left-0 bottom-0 w-[min(300px,85vw)] bg-[var(--bg)] shadow-2xl z-50 flex flex-col border-r border-[var(--border)]"
                initial={{ x: '-100%' }}
                animate={{ x: 0 }}
                exit={{ x: '-100%' }}
                transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              >
                <div className="pt-2">{sidebarContent}</div>
              </motion.aside>
            </>
          )}
        </AnimatePresence>
      </>
    );
  }

  return (
    <motion.aside
      className="fixed left-0 top-0 bottom-0 z-30 flex flex-col overflow-hidden bg-[var(--bg)] border-r border-[var(--border)] shadow-sm"
      style={{ width: isOpen ? 260 : 80 }}
      initial={false}
      animate={{ width: isOpen ? 260 : 80 }}
      transition={{ type: 'spring', damping: 30, stiffness: 300 }}
    >
      {sidebarContent}
    </motion.aside>
  );
};

export default Sidebar;
