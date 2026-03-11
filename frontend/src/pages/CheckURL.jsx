import React, { useState } from 'react';
import { checkUrl } from '../services/api';
import ResultCard from '../components/ResultCard';

const CheckURL = () => {
    const [url, setUrl] = useState('');
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);

    const handleCheck = async (e) => {
        e.preventDefault();
        setLoading(true);
        setResult(null);
        setError(null);

        try {
            const response = await checkUrl(url);
            setResult(response.data);
        } catch (err) {
            setError('Failed to check URL. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto py-12 px-4">
            <h1 className="text-3xl font-bold mb-8 text-center">Check Website Safety</h1>
            <div className="bg-secondary p-8 rounded-lg shadow-lg">
                <form onSubmit={handleCheck} className="flex flex-col sm:flex-row gap-4">
                    <input
                        type="url"
                        required
                        className="flex-1 p-3 rounded bg-primary border border-gray-600 focus:border-accent text-white"
                        placeholder="Paste URL here (e.g., http://example.com)..."
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                    />
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full sm:w-auto bg-accent text-primary font-bold px-6 py-3 rounded hover:opacity-90 transition disabled:opacity-50"
                    >
                        {loading ? 'Checking...' : 'Check'}
                    </button>
                </form>
                {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
            </div>

            <ResultCard result={result?.result} url={result?.url} />
        </div>
    );
};

export default CheckURL;
