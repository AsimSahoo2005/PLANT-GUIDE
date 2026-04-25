import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import PlantDetail from './pages/PlantDetail';
import Dashboard from './pages/Dashboard';
import Reminders from './pages/Reminders';
import Login from './pages/Login';
import Register from './pages/Register';
import { AuthContext } from './context/AuthContext';

import { Toaster } from 'react-hot-toast';

function App() {
    const { user, loading } = React.useContext(AuthContext);

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center bg-green-50">Loading...</div>;
    }

    return (
        <Router>
            <Toaster position="top-center" />
            <div className="min-h-screen relative text-gray-800">
                <Navbar />
                <div className="pt-24 pb-10 px-4 md:px-8 max-w-7xl mx-auto">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/plants/:id" element={<PlantDetail />} />
                        <Route path="/reminders" element={<Reminders />} />
                        <Route path="/login" element={!user ? <Login /> : <Navigate to="/dashboard" />} />
                        <Route path="/register" element={!user ? <Register /> : <Navigate to="/dashboard" />} />
                        <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/login" />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

export default App;
