import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-secondary text-gray-400 p-6 mt-10 text-center">
            <p>&copy; {new Date().getFullYear()} PhishGuard AI. All rights reserved.</p>
            <p className="text-sm mt-2">Stay Safe. Stay Alert.</p>
        </footer>
    );
};

export default Footer;
