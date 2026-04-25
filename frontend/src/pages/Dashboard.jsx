import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { PlantContext } from '../context/PlantContext';
import PlantCard from '../components/PlantCard';
import { Link } from 'react-router-dom';
import { Droplet } from 'lucide-react';

const Dashboard = () => {
    const { user } = useContext(AuthContext);
    const { savedPlants, fetchSavedPlants } = useContext(PlantContext);

    React.useEffect(() => {
        if (user) {
            fetchSavedPlants();
        }
    }, [user]);

    const calculateNeedsWaterCount = () => {
        return savedPlants.filter(item => {
            if (!item.lastWatered || !item.wateringInterval) return false;
            const last = new Date(item.lastWatered);
            const next = new Date(last.getTime() + item.wateringInterval * 24 * 60 * 60 * 1000);
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            next.setHours(0, 0, 0, 0);
            return next.getTime() <= today.getTime();
        }).length;
    };

    const needsWaterCount = calculateNeedsWaterCount();

    return (
        <div className="space-y-8">
            <div className="bg-white/40 backdrop-blur-md rounded-3xl p-8 border border-white/40 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, {user?.name}!</h1>
                    <p className="text-gray-600">Manage your virtual garden and keep track of your favorites.</p>
                </div>
                
                <div className="flex gap-4 items-center">
                    {needsWaterCount > 0 && (
                        <div className="bg-red-50 text-red-700 font-bold px-5 py-3 rounded-2xl flex items-center gap-2 border border-red-200">
                            <Droplet size={20} />
                            <span>{needsWaterCount} plants need water</span>
                        </div>
                    )}
                    <Link to="/reminders" className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3 rounded-2xl transition shadow-md whitespace-nowrap">
                        Go to Reminders
                    </Link>
                </div>
            </div>

            <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                    My Saved Plants
                </h2>

                {savedPlants.length === 0 ? (
                    <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-12 text-center border border-white flex flex-col items-center">
                        <span className="text-6xl mb-4">🌱</span>
                        <h3 className="text-xl font-bold text-gray-800 mb-2">Your garden is empty</h3>
                        <p className="text-gray-500 max-w-md">You haven't saved any plants yet. Head over to the home page to discover new plants to add to your collection.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {savedPlants.map(item => {
                            if (!item || !item.plant) return null;
                            return <PlantCard key={item.plant._id} plant={item.plant} />;
                        })}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
