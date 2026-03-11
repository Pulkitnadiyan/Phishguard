import React, { useState } from 'react';
import { reportPhishing } from '../services/api';

const ReportForm = () => {
    const [url, setUrl] = useState('');
    const [description, setDescription] = useState('');
    const [message, setMessage] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await reportPhishing({ url, description });
            setMessage({ type: 'success', text: 'Report submitted successfully!' });
            setUrl('');
            setDescription('');
        } catch (error) {
            setMessage({ type: 'error', text: 'Failed to submit report. Try again.' });
        }
    };

    return (
        <div className="bg-secondary p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">Report Suspicious URL</h2>
            {message && (
                <div className={`p-3 rounded mb-4 ${message.type === 'success' ? 'bg-green-600' : 'bg-red-600'}`}>
                    {message.text}
                </div>
            )}
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-sm font-bold mb-2">Phishing URL</label>
                    <input
                        type="url"
                        required
                        className="w-full p-2 rounded bg-primary border border-gray-600 focus:border-accent text-white"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        placeholder="http://example.com"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-bold mb-2">Description</label>
                    <textarea
                        className="w-full p-2 rounded bg-primary border border-gray-600 focus:border-accent text-white"
                        rows="4"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Describe the incident..."
                    />
                </div>
                <button type="submit" className="w-full bg-red-600 py-2 rounded font-bold hover:bg-red-700 transition">
                    Submit Report
                </button>
            </form>
        </div>
    );
};

export default ReportForm;
