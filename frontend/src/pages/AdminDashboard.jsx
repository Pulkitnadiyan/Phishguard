import { useState, useEffect } from "react";
import { getAllUsers, getReports, deleteUser, deleteReport, verifyReport } from "../services/api";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
    const [users, setUsers] = useState([]);
    const [reports, setReports] = useState([]);
    const [activeTab, setActiveTab] = useState("users");
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        const role = localStorage.getItem("role");

        if (!token || role !== "ROLE_ADMIN") {
            navigate("/login");
            return;
        }

        fetchData(token);
    }, []);

    const fetchData = async (token) => {
        try {
            const usersData = await getAllUsers(token);
            setUsers(usersData.data);

            const reportsData = await getReports();
            setReports(reportsData.data);
        } catch (error) {
            console.error("Error fetching admin data:", error);
        }
    };

    const handleDeleteUser = async (id) => {
        if (window.confirm("Are you sure you want to delete this user?")) {
            await deleteUser(id, localStorage.getItem("token"));
            setUsers(users.filter(user => user.id !== id));
        }
    };

    const handleDeleteReport = async (id) => {
        if (window.confirm("Are you sure you want to delete this report?")) {
            await deleteReport(id, localStorage.getItem("token"));
            setReports(reports.filter(report => report.id !== id));
        }
    };

    const handleVerifyReport = async (id) => {
        await verifyReport(id, localStorage.getItem("token"));
        fetchData(localStorage.getItem("token")); // Refresh to show updated status
    };

    const [selectedReport, setSelectedReport] = useState(null);

    const handleViewReport = (report) => {
        setSelectedReport(report);
    };

    const closeModal = () => {
        setSelectedReport(null);
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white p-8">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-3xl font-bold text-cyan-400 mb-8">Admin Dashboard</h1>

                <div className="flex space-x-4 mb-6">
                    <button
                        onClick={() => setActiveTab("users")}
                        className={`px-4 py-2 rounded-lg font-semibold ${activeTab === "users" ? "bg-cyan-500 text-gray-900" : "bg-gray-800 text-gray-400"
                            }`}
                    >
                        Manage Users
                    </button>
                    <button
                        onClick={() => setActiveTab("reports")}
                        className={`px-4 py-2 rounded-lg font-semibold ${activeTab === "reports" ? "bg-cyan-500 text-gray-900" : "bg-gray-800 text-gray-400"
                            }`}
                    >
                        Manage Reports
                    </button>
                </div>

                <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                    {activeTab === "users" ? (
                        <div>
                            <h2 className="text-xl font-semibold mb-4 text-cyan-300">Registered Users</h2>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="border-b border-gray-700 text-gray-400">
                                            <th className="p-3">ID</th>
                                            <th className="p-3">Name</th>
                                            <th className="p-3">Email</th>
                                            <th className="p-3">Role</th>
                                            <th className="p-3">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {users.map((user) => (
                                            <tr key={user.id} className="border-b border-gray-700 hover:bg-gray-700">
                                                <td className="p-3">{user.id}</td>
                                                <td className="p-3">{user.name}</td>
                                                <td className="p-3">{user.email}</td>
                                                <td className="p-3">
                                                    <span className={`px-2 py-1 rounded text-xs ${user.role === 'ROLE_ADMIN' ? 'bg-purple-500 text-white' : 'bg-blue-500 text-white'
                                                        }`}>
                                                        {user.role}
                                                    </span>
                                                </td>
                                                <td className="p-3">
                                                    <button
                                                        onClick={() => handleDeleteUser(user.id)}
                                                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
                                                    >
                                                        Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    ) : (
                        <div>
                            <h2 className="text-xl font-semibold mb-4 text-cyan-300">Phishing Reports</h2>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="border-b border-gray-700 text-gray-400">
                                            <th className="p-3">ID</th>
                                            <th className="p-3">URL</th>
                                            <th className="p-3">Status</th>
                                            <th className="p-3">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {reports.map((report) => (
                                            <tr key={report.id} className="border-b border-gray-700 hover:bg-gray-700">
                                                <td className="p-3">{report.id}</td>
                                                <td className="p-3 truncate max-w-xs">{report.url}</td>
                                                <td className="p-3">
                                                    <span className={`px-2 py-1 rounded text-xs ${report.status === 'verified' ? 'bg-green-500 text-gray-900' : 'bg-yellow-500 text-gray-900'
                                                        }`}>
                                                        {report.status}
                                                    </span>
                                                </td>
                                                <td className="p-3 flex space-x-2">
                                                    <button
                                                        onClick={() => handleViewReport(report)}
                                                        className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm"
                                                    >
                                                        View
                                                    </button>
                                                    {report.status !== 'verified' && (
                                                        <button
                                                            onClick={() => handleVerifyReport(report.id)}
                                                            className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm"
                                                        >
                                                            Verify
                                                        </button>
                                                    )}
                                                    <button
                                                        onClick={() => handleDeleteReport(report.id)}
                                                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
                                                    >
                                                        Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                </div>

                {/* Report Details Modal */}
                {selectedReport && (
                    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4 z-50">
                        <div className="bg-gray-800 rounded-lg p-8 max-w-2xl w-full shadow-2xl border border-gray-700 relative">
                            <button
                                onClick={closeModal}
                                className="absolute top-4 right-4 text-gray-400 hover:text-white text-xl"
                            >
                                &times;
                            </button>
                            <h2 className="text-2xl font-bold text-cyan-400 mb-6">Report Details</h2>

                            <div className="space-y-4">
                                <div>
                                    <h3 className="text-gray-400 text-sm font-semibold uppercase">URL</h3>
                                    <p className="text-white break-all bg-gray-900 p-3 rounded mt-1 border border-gray-700">
                                        <a href={selectedReport.url} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
                                            {selectedReport.url}
                                        </a>
                                    </p>
                                </div>

                                <div>
                                    <h3 className="text-gray-400 text-sm font-semibold uppercase">Description</h3>
                                    <p className="text-gray-300 bg-gray-900 p-3 rounded mt-1 border border-gray-700">
                                        {selectedReport.description || "No description provided."}
                                    </p>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <h3 className="text-gray-400 text-sm font-semibold uppercase">Status</h3>
                                        <span className={`inline-block mt-1 px-3 py-1 rounded text-sm font-bold ${selectedReport.status === 'verified' ? 'bg-green-500 text-gray-900' : 'bg-yellow-500 text-gray-900'
                                            }`}>
                                            {selectedReport.status}
                                        </span>
                                    </div>
                                    <div>
                                        <h3 className="text-gray-400 text-sm font-semibold uppercase">Date Submitted</h3>
                                        <p className="text-gray-300 mt-1">
                                            {new Date(selectedReport.createdAt).toLocaleString()}
                                        </p>
                                    </div>
                                </div>

                                {selectedReport.imageUrl && (
                                    <div>
                                        <h3 className="text-gray-400 text-sm font-semibold uppercase">Screenshot / Evidence</h3>
                                        <div className="mt-2 border border-gray-700 rounded overflow-hidden">
                                            <img
                                                src={selectedReport.imageUrl}
                                                alt="Report Evidence"
                                                className="w-full h-auto max-h-96 object-contain bg-gray-900"
                                            />
                                        </div>
                                    </div>
                                )}

                                {selectedReport.user && (
                                    <div>
                                        <h3 className="text-gray-400 text-sm font-semibold uppercase">Reported By</h3>
                                        <p className="text-gray-300 mt-1">
                                            {selectedReport.user.name} ({selectedReport.user.email})
                                        </p>
                                    </div>
                                )}
                            </div>

                            <div className="mt-8 flex justify-end space-x-4">
                                {selectedReport.status !== 'verified' && (
                                    <button
                                        onClick={() => {
                                            handleVerifyReport(selectedReport.id);
                                            closeModal();
                                        }}
                                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded font-bold transition"
                                    >
                                        Verify Report
                                    </button>
                                )}
                                <button
                                    onClick={closeModal}
                                    className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded font-bold transition"
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminDashboard;
