import React from 'react';

const ResultCard = ({ result, url }) => {
    if (!result) return null;

    const isPhishing = result === 'phishing';

    return (
        <div className={`p-6 rounded-lg shadow-lg mt-6 text-center border-2 ${isPhishing ? 'bg-red-900 border-red-500' : 'bg-green-900 border-green-500'}`}>
            <h2 className="text-2xl font-bold mb-2 text-white">
                {isPhishing ? '⚠️ PHISHING DETECTED' : '✅ SAFE WEBSITE'}
            </h2>
            <p className="text-gray-200 mb-4 break-all">{url}</p>
            <div className="text-lg">
                {isPhishing ? (
                    <p className="text-red-200">This website shows signs of phishing behavior. Do not visit.</p>
                ) : (
                    <p className="text-green-200">This website appears safe to visit.</p>
                )}
            </div>
        </div>
    );
};

export default ResultCard;
