import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    const name = localStorage.getItem('name');

    const [isOpen, setIsOpen] = useState(false);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        localStorage.removeItem('name');
        setIsOpen(false);
        navigate('/login');
    };

    const closeMenu = () => setIsOpen(false);

    return (
        <nav className="bg-secondary text-white p-4 shadow-md">
            <div className="container mx-auto flex flex-col md:flex-row md:justify-between md:items-center">
                {/* Brand and Hamburger Row */}
                <div className="flex justify-between items-center">
                    <Link to="/" onClick={closeMenu} className="text-2xl font-bold text-accent">PhishGuard AI</Link>
                    <button
                        className="md:hidden text-gray-300 hover:text-white focus:outline-none"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            {isOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                </div>

                {/* Mobile and Desktop Links */}
                <div className={`${isOpen ? 'flex' : 'hidden'} md:flex flex-col md:flex-row items-center w-full md:w-auto mt-4 md:mt-0 space-y-4 md:space-y-0 md:space-x-8`}>

                    <div className="flex flex-col md:flex-row items-center w-full md:w-auto space-y-4 md:space-y-0 md:space-x-6">
                        <Link to="/" onClick={closeMenu} className="hover:text-accent transition">Home</Link>
                        <Link to="/check-url" onClick={closeMenu} className="hover:text-accent transition">Check URL</Link>
                        <Link to="/report" onClick={closeMenu} className="hover:text-accent transition">Report</Link>
                    </div>

                    <div className="flex flex-col md:flex-row items-center w-full md:w-auto space-y-4 md:space-y-0 md:space-x-4 border-t border-gray-700 md:border-t-0 pt-4 md:pt-0">
                        {token ? (
                            <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4 w-full md:w-auto">
                                {name && <span className="text-gray-300">Welcome, <strong className="text-white">{name}</strong>!</span>}
                                <Link to="/dashboard" onClick={closeMenu} className="hover:text-accent transition">Dashboard</Link>
                                {role === 'ROLE_ADMIN' && (
                                    <Link to="/admin" onClick={closeMenu} className="text-purple-400 hover:text-purple-300 transition font-bold">Admin Panel</Link>
                                )}
                                <button onClick={handleLogout} className="w-full md:w-auto bg-red-500 px-4 py-2 md:px-3 md:py-1 rounded hover:bg-red-600 transition">Logout</button>
                            </div>
                        ) : (
                            <Link to="/login" onClick={closeMenu} className="w-full md:w-auto text-center bg-accent text-primary px-4 py-2 md:px-3 md:py-1 rounded hover:opacity-90 transition font-bold">Login</Link>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
