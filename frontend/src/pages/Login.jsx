import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { Leaf } from 'lucide-react';

const Login = () => {
    const { login, error } = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        await login(email, password);
        setLoading(false);
    };

    return (
        <div className="min-h-screen grid lg:grid-cols-2 bg-green-50/50">
            {/* Left Side - Visual */}
            <div 
                className="hidden lg:flex flex-col justify-between bg-cover bg-center relative" 
                style={{ backgroundImage: 'url(/hero-bg.jpg)' }}
            >
                <div className="absolute inset-0 bg-green-900/40 mix-blend-multiply"></div>
                
                <div className="relative z-10 p-12 text-white">
                    <Link to="/" className="flex items-center gap-2 font-bold text-2xl hover:text-green-200 transition w-fit">
                        <Leaf size={28} />
                        <span>Florista</span>
                    </Link>
                </div>
                
                <div className="relative z-10 p-12">
                    <div className="bg-white/10 backdrop-blur-md border border-white/20 p-10 rounded-[2rem] shadow-2xl">
                        <h2 className="text-4xl font-bold mb-4 text-white leading-tight">Cultivate your digital garden</h2>
                        <p className="text-green-50 text-lg leading-relaxed">
                            Join our community of plant enthusiasts. Track your plants, receive timely care reminders, and watch your botanical sanctuary thrive.
                        </p>
                    </div>
                </div>
            </div>

            {/* Right Side - Form */}
            <div className="flex flex-col justify-center px-8 sm:px-16 lg:px-24 py-12 bg-white">
                <div className="w-full max-w-md mx-auto">
                    {/* Mobile Logo */}
                    <div className="flex lg:hidden items-center gap-2 font-bold text-2xl text-green-700 mb-12">
                        <Leaf size={28} />
                        <span>Florista</span>
                    </div>

                    <div className="mb-10">
                        <h1 className="text-3xl font-bold text-gray-900 mb-3">Welcome back</h1>
                        <p className="text-gray-500">Please enter your details to sign in.</p>
                    </div>

                    {error && (
                        <div className="bg-red-50 text-red-600 p-4 rounded-xl mb-6 text-sm border border-red-100 font-medium">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="email">Email</label>
                            <input 
                                id="email"
                                type="email" 
                                required 
                                className="w-full px-4 py-3.5 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:bg-white transition text-gray-900"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="password">Password</label>
                            <input 
                                id="password"
                                type="password" 
                                required 
                                className="w-full px-4 py-3.5 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:bg-white transition text-gray-900"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        
                        <div className="flex items-center justify-between mt-2">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input type="checkbox" className="w-4 h-4 rounded text-green-600 focus:ring-green-500 border-gray-300" />
                                <span className="text-sm text-gray-600">Remember me</span>
                            </label>
                            <a href="#" className="text-sm font-medium text-green-600 hover:text-green-700">Forgot password?</a>
                        </div>

                        <button 
                            type="submit" 
                            disabled={loading}
                            className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3.5 rounded-xl transition shadow-lg shadow-green-600/20 disabled:bg-green-400 mt-2"
                        >
                            {loading ? 'Signing in...' : 'Sign in'}
                        </button>
                    </form>

                    <div className="mt-8 mb-6">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-200"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-4 bg-white text-gray-500">Or continue with</span>
                            </div>
                        </div>
                    </div>

                    <button className="w-full flex items-center justify-center gap-3 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 font-semibold py-3.5 rounded-xl transition">
                        <svg className="w-5 h-5" viewBox="0 0 24 24">
                            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                        </svg>
                        Google
                    </button>

                    <p className="text-center mt-8 text-gray-600 text-sm">
                        Don't have an account? <Link to="/register" className="text-green-600 hover:text-green-700 font-bold hover:underline">Register now</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
