import React, { useEffect, useState } from 'react';
import { getReports, getStats } from '../services/api';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
} from 'chart.js';
import { Bar, Pie } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
);

const Dashboard = () => {
    const [stats, setStats] = useState({ totalChecked: 0, phishingDetected: 0, totalReports: 0 });
    const [reports, setReports] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const statsRes = await getStats();
                setStats(statsRes.data);

                const reportsRes = await getReports();
                setReports(reportsRes.data);
            } catch (err) {
                console.error("Failed to fetch dashboard data", err);
            }
        };

        fetchData();
    }, []);

    const chartData = {
        labels: ['Safe', 'Phishing'],
        datasets: [
            {
                label: 'URLs Checked',
                data: [stats.totalChecked - stats.phishingDetected, stats.phishingDetected],
                backgroundColor: ['#22c55e', '#ef4444'],
            },
        ],
    };

    return (
        <div className="container mx-auto py-10 px-4">
            <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

            {/* Stats Cards */}
            <div className="grid md:grid-cols-3 gap-6 mb-10">
                <div className="bg-secondary p-6 rounded-lg shadow-lg">
                    <h3 className="text-gray-400 mb-2">Total URLs Checked</h3>
                    <p className="text-4xl font-bold text-white">{stats.totalChecked}</p>
                </div>
                <div className="bg-secondary p-6 rounded-lg shadow-lg">
                    <h3 className="text-gray-400 mb-2">Phishing Detected</h3>
                    <p className="text-4xl font-bold text-red-500">{stats.phishingDetected}</p>
                </div>
                <div className="bg-secondary p-6 rounded-lg shadow-lg">
                    <h3 className="text-gray-400 mb-2">Total Reports</h3>
                    <p className="text-4xl font-bold text-accent">{stats.totalReports}</p>
                </div>
            </div>

            {/* Charts */}
            <div className="grid md:grid-cols-2 gap-8 mb-10">
                <div className="bg-secondary p-6 rounded-lg shadow-lg h-80 flex items-center justify-center">
                    <Pie data={chartData} options={{ responsive: true, plugins: { legend: { position: 'bottom' } } }} />
                </div>
                <div className="bg-secondary p-6 rounded-lg shadow-lg">
                    <h3 className="text-xl font-bold mb-4">Recent Community Reports</h3>
                    <div className="overflow-x-auto overflow-y-auto h-64">
                        <table className="w-full text-left">
                            <thead className="border-b border-gray-700">
                                <tr>
                                    <th className="pb-2">URL</th>
                                    <th className="pb-2">Date</th>
                                    <th className="pb-2">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {reports.map((report) => (
                                    <tr key={report.id} className="border-b border-gray-800">
                                        <td className="py-2 text-sm truncate max-w-xs">{report.url}</td>
                                        <td className="py-2 text-sm text-gray-400">{new Date(report.createdAt).toLocaleDateString()}</td>
                                        <td className="py-2 text-sm">
                                            <span className={`px-2 py-0.5 rounded text-xs ${report.status === 'verified' ? 'bg-green-500 text-gray-900' : 'bg-yellow-600'}`}>
                                                {report.status || 'Pending'}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
