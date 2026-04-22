import axios from 'axios';

const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';

const api = axios.create({
    baseURL: API_URL,
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const checkUrl = (url) => api.post('/check-url', { url });
export const reportPhishing = (data) => api.post('/report', data);
export const getReports = () => api.get('/reports');
export const getStats = () => api.get('/stats');
export const login = (credentials) => api.post('/auth/login', credentials);
export const register = (userData) => api.post('/auth/register', userData);

export const getAllUsers = async (token) => {
    return await axios.get(`${API_URL}/admin/users`, {
        headers: { Authorization: `Bearer ${token}` }
    });
};

export const deleteUser = async (id, token) => {
    return await axios.delete(`${API_URL}/admin/user/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
    });
};

export const deleteReport = async (id, token) => {
    return await axios.delete(`${API_URL}/admin/report/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
    });
};

export const verifyReport = async (id, token) => {
    return await axios.put(`${API_URL}/admin/report/${id}/verify`, {}, {
        headers: { Authorization: `Bearer ${token}` }
    });
};

export default api;
