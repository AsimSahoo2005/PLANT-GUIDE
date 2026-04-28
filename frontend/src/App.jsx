import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Landing from './pages/Landing';
import Home from './pages/Home';
import PlantDetail from './pages/PlantDetail';
import Dashboard from './pages/Dashboard';
import Reminders from './pages/Reminders';
import Login from './pages/Login';
import Register from './pages/Register';
import ProtectedRoute from './components/ProtectedRoute';
import AdminRoute from './components/AdminRoute';
import AdminDashboard from './pages/AdminDashboard';
import AdminPlantForm from './pages/AdminPlantForm';
import { AuthContext } from './context/AuthContext';
import { Toaster } from 'react-hot-toast';

const AppContent = () => {
    const { user } = React.useContext(AuthContext);
    const location = useLocation();
    const isFullScreenRoute = ['/', '/login', '/register'].includes(location.pathname);

    return (
        <div className="min-h-screen relative text-gray-800 bg-white">
            {!isFullScreenRoute && <Navbar />}
            <div className={isFullScreenRoute ? "" : "pt-24 pb-10 px-4 md:px-8 max-w-7xl mx-auto"}>
                <Routes>
                    {/* Public Landing Page */}
                    <Route path="/" element={!user ? <Landing /> : <Navigate to="/plants" replace />} />
                    
                    {/* Protected Routes */}
                    <Route path="/plants" element={<ProtectedRoute><Home /></ProtectedRoute>} />
                    <Route path="/plants/:id" element={<ProtectedRoute><PlantDetail /></ProtectedRoute>} />
                    <Route path="/saved" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                    <Route path="/reminders" element={<ProtectedRoute><Reminders /></ProtectedRoute>} />
                    
                    {/* Auth Routes */}
                    <Route path="/login" element={!user ? <Login /> : <Navigate to="/plants" replace />} />
                    <Route path="/register" element={!user ? <Register /> : <Navigate to="/plants" replace />} />
                    
                    {/* Admin Routes */}
                    <Route path="/admin/dashboard" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
                    <Route path="/admin/plants/add" element={<AdminRoute><AdminPlantForm /></AdminRoute>} />
                    <Route path="/admin/plants/edit/:id" element={<AdminRoute><AdminPlantForm /></AdminRoute>} />
                    
                    {/* Fallback */}
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </div>
        </div>
    );
};

function App() {
    const { loading } = React.useContext(AuthContext);

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center bg-green-50">Loading...</div>;
    }

    return (
        <Router>
            <Toaster position="top-center" />
            <AppContent />
        </Router>
    );
}

export default App;
