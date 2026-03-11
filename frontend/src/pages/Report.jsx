import React from 'react';
import ReportForm from '../components/ReportForm';

const Report = () => {
    return (
        <div className="max-w-2xl mx-auto py-12 px-4">
            <h1 className="text-3xl font-bold mb-8 text-center">Report a Phishing Attack</h1>
            <p className="text-center text-gray-400 mb-8">
                Help us make the internet safer by reporting suspicious websites.
            </p>
            <ReportForm />
        </div>
    );
};

export default Report;
