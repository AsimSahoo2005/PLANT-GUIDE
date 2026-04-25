import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { PlantContext } from '../context/PlantContext';
import { Leaf } from 'lucide-react';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const { savedPlants } = useContext(PlantContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const needsWaterCount = savedPlants.filter(item => {
        if (!item.lastWatered || !item.wateringInterval) return false;
        const last = new Date(item.lastWatered);
        const next = new Date(last.getTime() + item.wateringInterval * 24 * 60 * 60 * 1000);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        next.setHours(0, 0, 0, 0);
        return next.getTime() <= today.getTime();
    }).length;

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 px-4 py-4">
            <div className="max-w-7xl mx-auto bg-white/70 backdrop-blur-md border border-white/30 shadow-lg rounded-full px-6 py-3 flex justify-between items-center transition-all">
                <Link to={user ? "/plants" : "/login"} className="flex items-center gap-2 text-green-700 font-bold text-xl hover:text-green-800 transition">
                    <Leaf size={24} />
                    <span>Florista</span>
                </Link>

                <div className="flex items-center gap-6">
                    {user ? (
                        <>
                            <Link to="/plants" className="text-gray-700 hover:text-green-700 font-medium transition">Plants</Link>
                            <Link to="/saved" className="text-gray-700 hover:text-green-700 font-medium transition">Saved</Link>
                            <Link to="/reminders" className="text-gray-700 hover:text-green-700 font-medium transition relative">
                                Reminders
                                {needsWaterCount > 0 && (
                                    <span className="absolute -top-2 -right-3 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                                        {needsWaterCount}
                                    </span>
                                )}
                            </Link>
                            <button 
                                onClick={handleLogout}
                                className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-full font-medium transition shadow-md"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="text-gray-700 hover:text-green-700 font-medium transition">Login</Link>
                            <Link to="/register" className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-full font-medium transition shadow-md">Register</Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
