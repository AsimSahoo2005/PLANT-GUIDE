import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import GlassContainer from '../components/GlassContainer';
import { Droplet, Calendar, AlertCircle, CheckCircle2 } from 'lucide-react';
import toast from 'react-hot-toast';

const formatDate = (dateInput) => {
    const d = new Date(dateInput);
    const day = d.getDate();
    const month = d.toLocaleString('en-US', { month: 'short' });
    const year = d.getFullYear();
    let hours = d.getHours();
    const minutes = d.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    return `${day} ${month} ${year}, ${hours}:${minutes} ${ampm}`;
};

const Reminders = () => {
    const [plants, setPlants] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchReminders = async (showLoader = true) => {
        try {
            if (showLoader) setLoading(true);
            const res = await api.get('/users/reminders');
            setPlants(res.data);
        } catch (error) {
            console.error('Error fetching reminders:', error);
            toast.error('Failed to load reminders');
        } finally {
            if (showLoader) setLoading(false);
        }
    };

    useEffect(() => {
        fetchReminders(true);
    }, []);

    const handleMarkWatered = async (id) => {
        try {
            await api.put(`/users/water/${id}`);
            toast.success('Plant marked as watered! 💧');
            // Refresh the reminders to get the new status without full reload spinner
            fetchReminders(false);
        } catch (error) {
            console.error('Error marking watered:', error);
            toast.error('Failed to mark as watered');
        }
    };

    const calculateStatus = (lastWatered, intervalDays) => {
        const last = new Date(lastWatered);
        const next = new Date(last.getTime() + intervalDays * 24 * 60 * 60 * 1000);
        const today = new Date();
        
        // Normalize times to compare just dates
        today.setHours(0, 0, 0, 0);
        const nextDate = new Date(next);
        nextDate.setHours(0, 0, 0, 0);

        const diffTime = nextDate.getTime() - today.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays < 0) {
            return { status: 'overdue', label: '🔴 Overdue', color: 'text-red-600', bg: 'bg-red-50 border-red-200' };
        } else if (diffDays === 0) {
            return { status: 'today', label: '💧 Water Today', color: 'text-red-600', bg: 'bg-red-50 border-red-200' };
        } else if (diffDays > 0 && diffDays <= 2) {
            return { status: 'upcoming', label: '⏳ Upcoming', color: 'text-yellow-600', bg: 'bg-yellow-50 border-yellow-200' };
        } else {
            return { status: 'healthy', label: '🟢 Healthy', color: 'text-green-600', bg: 'bg-green-50 border-green-200' };
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-green-600"></div>
            </div>
        );
    }

    // Sort plants so that Overdue and Today come first
    const sortedPlants = [...plants].sort((a, b) => {
        const statusA = calculateStatus(a.lastWatered, a.wateringInterval).status;
        const statusB = calculateStatus(b.lastWatered, b.wateringInterval).status;
        const priority = { 'overdue': 0, 'today': 1, 'upcoming': 2 };
        return priority[statusA] - priority[statusB];
    });

    return (
        <div className="space-y-8 animate-fadeIn">
            <div className="bg-blue-50/50 rounded-3xl p-8 md:p-12 text-center backdrop-blur-sm border border-blue-100">
                <h1 className="text-4xl md:text-5xl font-bold text-blue-900 mb-4 tracking-tight">Watering Reminders</h1>
                <p className="text-blue-800/80 max-w-2xl mx-auto text-lg">Keep your garden thriving by staying on top of your watering schedule.</p>
            </div>

            {sortedPlants.length === 0 ? (
                <div className="text-center py-20 bg-white/50 backdrop-blur-sm rounded-3xl border border-white">
                    <span className="text-6xl mb-4 block">🌱</span>
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">No plants found</h3>
                    <p className="text-gray-500">Your garden is currently empty.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {sortedPlants.map(item => {
                        if (!item || !item.plant) return null;
                        const { status, label, color, bg } = calculateStatus(item.lastWatered, item.wateringInterval);
                        const plant = item.plant;
                        
                        return (
                            <GlassContainer key={plant._id} className="overflow-hidden flex flex-col h-full bg-white/60 backdrop-blur-lg border border-white/20">
                                <div className="h-48 overflow-hidden relative">
                                    <img 
                                        src={plant.image?.startsWith('/uploads') ? `http://localhost:5055${plant.image}` : plant.image} 
                                        alt={plant.name}
                                        className="w-full h-full object-cover"
                                    />
                                    <div className={`absolute top-3 left-3 px-3 py-1 rounded-full font-bold text-xs shadow-sm uppercase border bg-white/90 backdrop-blur-md ${color}`}>
                                        {label}
                                    </div>
                                </div>
                                
                                <div className="p-5 flex-1 flex flex-col">
                                    <h3 className="text-xl font-bold text-gray-800 mb-1">{plant.name}</h3>
                                    <p className="text-sm text-gray-500 italic mb-4">{plant.plantGroup}</p>
                                    
                                    <div className={`rounded-xl p-4 mb-4 flex-1 border ${bg}`}>
                                        <div className="flex justify-between items-center mb-2">
                                            <span className="text-sm font-medium text-gray-600">Last Watered</span>
                                            <span className="text-sm font-bold text-gray-800 text-right ml-2">{formatDate(item.lastWatered)}</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm font-medium text-gray-600">Next Watering</span>
                                            <span className="text-sm font-bold text-gray-800 text-right ml-2">{formatDate(new Date(new Date(item.lastWatered).getTime() + item.wateringInterval * 24 * 60 * 60 * 1000))}</span>
                                        </div>
                                    </div>
                                    
                                    <button 
                                        onClick={() => handleMarkWatered(plant._id)}
                                        className="w-full py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition shadow-md bg-blue-600 text-white hover:bg-blue-700"
                                    >
                                        <CheckCircle2 size={20} />
                                        Mark as Watered
                                    </button>
                                </div>
                            </GlassContainer>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default Reminders;
