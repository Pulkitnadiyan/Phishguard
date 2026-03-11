import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="text-center">
            <div className="py-20 bg-gradient-to-b from-primary to-secondary">
                <h1 className="text-5xl font-bold mb-6 text-accent">Stay Safe from Phishing Attacks</h1>
                <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                    PhishGuard AI uses advanced machine learning to detect and block malicious websites, keeping your data secure.
                </p>
                <div className="flex flex-col sm:flex-row justify-center items-center gap-4 px-4">
                    <Link to="/check-url" className="w-full sm:w-auto bg-accent text-primary px-6 py-3 rounded-lg font-bold text-lg hover:opacity-90 transition">
                        Check URL
                    </Link>
                    <Link to="/report" className="w-full sm:w-auto bg-red-600 px-6 py-3 rounded-lg font-bold text-lg hover:bg-red-700 transition">
                        Report Suspicious Site
                    </Link>
                </div>
            </div>

            <div className="container mx-auto py-16 px-4">
                <h2 className="text-3xl font-bold mb-10">Why PhishGuard?</h2>
                <div className="grid md:grid-cols-3 gap-8">
                    <div className="bg-secondary p-6 rounded-lg shadow-lg">
                        <h3 className="text-xl font-bold mb-2 text-accent">Real-time Detection</h3>
                        <p className="text-gray-400">Instantly analyze URLs using our ML model trained on thousands of phishing sites.</p>
                    </div>
                    <div className="bg-secondary p-6 rounded-lg shadow-lg">
                        <h3 className="text-xl font-bold mb-2 text-accent">Community Reporting</h3>
                        <p className="text-gray-400">Join our community in reporting and verifying malicious links to protect others.</p>
                    </div>
                    <div className="bg-secondary p-6 rounded-lg shadow-lg">
                        <h3 className="text-xl font-bold mb-2 text-accent">Detailed Analytics</h3>
                        <p className="text-gray-400">Track current threats and view global statistics on our dashboard.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
