import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";
import { useNavigate, useLocation } from "react-router-dom";

const MenuIcon = ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
  <line x1="4" x2="20" y1="12" y2="12" />
  <line x1="4" x2="20" y1="6" y2="6" />
  <line x1="4" x2="20" y1="18" y2="18" />
</svg>;
const XIcon = ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
  <path d="M18 6 6 18" />
  <path d="m6 6 12 12" />
</svg>;
const MountainIcon = ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
  <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
</svg>;
const SunIcon = ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
  <circle cx="12" cy="12" r="4" />
  <path d="M12 2v2" />
  <path d="M12 20v2" />
  <path d="m4.93 4.93 1.41 1.41" />
  <path d="m17.66 17.66 1.41 1.41" />
  <path d="M2 12h2" />
  <path d="M20 12h2" />
  <path d="m6.34 17.66-1.41 1.41" />
  <path d="m19.07 4.93-1.41 1.41" />
</svg>;
const MoonIcon = ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
  <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
</svg>;

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();


  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);


  const handleLogout = () => {
    // ✅ Save the EXACT current route before auth state changes
    localStorage.setItem("lastRoute", location.pathname);

    logout();                      // clear auth
    setIsDropdownOpen(false);
    setIsMenuOpen(false);
    navigate("/login");            // go to login
  };


  const navLinks = [{ href: "/intro", label: "Home" }, { href: "/about", label: "About" }, { href: "/projects", label: "Projects" }];

  return <header className="bg-black/80 backdrop-blur-sm sticky top-0 z-50 w-full border-b border-gray-200 dark:border-neutral-700 transition-colors duration-300">
    <div className="   mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between h-16">
        <div className="flex-shrink-0">
          <a href="#" className="flex items-center gap-2">
            <MountainIcon className="h-6 w-6 text-gray-900 dark:text-white" />
            <span className="text-lg font-semibold text-gray-900 dark:text-white">E-Learning</span>
          </a>
        </div>

        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map(link => <Link key={link.label} to={link.href} className="text-sm font-medium text-gray-500 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-300">
            {link.label}
          </Link>)}
        </nav>

        <div className="flex items-center gap-4">
          {user && (
            <div className="relative" ref={dropdownRef}>
              {/* Profile / Menu Button */}
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="hidden sm:inline-flex items-center justify-center rounded-md text-sm font-medium h-10 px-4 py-2 bg-gray-900 bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors duration-300"
              >
                {user.name}
              </button>

              {/* Dropdown */}
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-30 bg-white dark:bg-neutral-900 rounded-md shadow-lg border border-gray-200 dark:border-neutral-700 z-50 transition-colors duration-300">
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-neutral-800 transition-colors duration-300 cursor-pointer"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}


          <button onClick={toggleTheme} className="p-2 rounded-md text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-500 dark:focus:ring-gray-400 transition-colors duration-300" aria-label="Toggle theme" title={theme === 'dark' ? '☀ Light mode' : '🌙 Dark mode'}>
            {theme === 'dark' ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
          </button>

          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-500 dark:focus:ring-gray-400 transition-colors duration-300" aria-expanded={isMenuOpen}>
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? <XIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>
    </div>

    {isMenuOpen && <div className="md:hidden border-t border-gray-200 dark:border-neutral-700" id="mobile-menu">
      <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
        {navLinks.map(link => <Link key={link.label} to={link.href} className="text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-neutral-800 hover:text-gray-900 dark:hover:text-white block px-3 py-2 rounded-md text-base font-medium transition-colors duration-300">
          {link.label}
        </Link>)}
        {user && (
          <button
            onClick={handleLogout}
            className="w-full mt-2 text-center items-center border-2 border-white justify-center rounded-md text-sm font-medium h-10 px-4 py-2 bg-transparent text-white hover:bg-red-700 block transition-colors duration-300"
          >
            Logout
          </button>
        )}

      </div>
    </div>}
  </header>;
};

export default Header;