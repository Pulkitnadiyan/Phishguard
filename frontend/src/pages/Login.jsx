import React, { useState } from 'react';
import { login, register } from '../services/api';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            if (isLogin) {
                const response = await login({ email, password });
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('role', response.data.role);
                localStorage.setItem('name', response.data.name);

                if (response.data.role === 'ROLE_ADMIN') {
                    navigate('/admin');
                } else {
                    navigate('/dashboard');
                }
            } else {
                await register({ name, email, password });
                setIsLogin(true); // Switch to login after successful register
                setError('Registration successful! Please login.');
            }
        } catch (err) {
            setError('Authentication failed. Check your credentials.');
        }
    };

    return (
        <div className="max-w-md mx-auto py-16 px-4">
            <h1 className="text-3xl font-bold mb-8 text-center">{isLogin ? 'Login' : 'Sign Up'}</h1>
            <div className="bg-secondary p-8 rounded-lg shadow-lg">
                {error && <div className="bg-red-600 p-2 rounded mb-4 text-center">{error}</div>}

                <form onSubmit={handleSubmit}>
                    {!isLogin && (
                        <div className="mb-4">
                            <label className="block text-sm font-bold mb-2">Name</label>
                            <input
                                type="text"
                                required
                                className="w-full p-2 rounded bg-primary border border-gray-600 focus:border-accent text-white"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                    )}
                    <div className="mb-4">
                        <label className="block text-sm font-bold mb-2">Email</label>
                        <input
                            type="email"
                            required
                            className="w-full p-2 rounded bg-primary border border-gray-600 focus:border-accent text-white"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-sm font-bold mb-2">Password</label>
                        <input
                            type="password"
                            required
                            className="w-full p-2 rounded bg-primary border border-gray-600 focus:border-accent text-white"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="w-full bg-accent text-primary font-bold py-2 rounded hover:opacity-90 transition">
                        {isLogin ? 'Login' : 'Register'}
                    </button>
                </form>

                <p className="mt-4 text-center text-gray-400">
                    {isLogin ? "Don't have an account?" : "Already have an account?"}
                    <button
                        onClick={() => setIsLogin(!isLogin)}
                        className="text-accent ml-2 hover:underline"
                    >
                        {isLogin ? 'Sign Up' : 'Login'}
                    </button>
                </p>
            </div>
        </div>
    );
};

export default Login;
