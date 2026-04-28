import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';
import toast from 'react-hot-toast';
import { Trash2, Edit, Plus, Search } from 'lucide-react';

const AdminDashboard = () => {
    const [plants, setPlants] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchPlants();
    }, []);

    const fetchPlants = async () => {
        try {
            const response = await api.get('/plants');
            setPlants(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching plants:', error);
            toast.error('Failed to load plants');
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this plant? This action cannot be undone.')) {
            try {
                await api.delete(`/plants/${id}`);
                toast.success('Plant deleted successfully');
                setPlants(plants.filter(plant => plant._id !== id));
            } catch (error) {
                console.error('Error deleting plant:', error);
                toast.error('Failed to delete plant');
            }
        }
    };

    const filteredPlants = plants.filter(plant => 
        plant.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        plant.scientificName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) {
        return <div className="flex justify-center items-center h-64">Loading plants...</div>;
    }

    return (
        <div className="bg-white/80 backdrop-blur-md rounded-3xl p-8 shadow-xl border border-white/50">
            <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                <h1 className="text-3xl font-bold text-green-800">Admin Dashboard</h1>
                <Link 
                    to="/admin/plants/add" 
                    className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-full font-medium transition shadow-md"
                >
                    <Plus size={20} />
                    Add New Plant
                </Link>
            </div>

            <div className="relative mb-6 max-w-md">
                <input 
                    type="text" 
                    placeholder="Search plants..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-full border border-green-200 focus:outline-none focus:ring-2 focus:ring-green-500 bg-white shadow-sm"
                />
                <Search className="absolute left-4 top-3.5 text-gray-400" size={20} />
            </div>

            <div className="overflow-x-auto bg-white rounded-2xl shadow-sm border border-gray-100">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-green-50 text-green-800 border-b border-green-100">
                            <th className="py-4 px-6 font-semibold">Image</th>
                            <th className="py-4 px-6 font-semibold">Name</th>
                            <th className="py-4 px-6 font-semibold">Category</th>
                            <th className="py-4 px-6 font-semibold">Difficulty</th>
                            <th className="py-4 px-6 font-semibold text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredPlants.length > 0 ? (
                            filteredPlants.map(plant => (
                                <tr key={plant._id} className="border-b border-gray-50 hover:bg-green-50/50 transition">
                                    <td className="py-3 px-6">
                                        <img 
                                            src={plant.image?.startsWith('/uploads') ? `http://localhost:5055${plant.image}` : plant.image} 
                                            alt={plant.name} 
                                            className="w-16 h-16 object-cover rounded-lg shadow-sm"
                                            onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1416879598555-21d1b95f26ea?w=150&q=80' }}
                                        />
                                    </td>
                                    <td className="py-3 px-6">
                                        <p className="font-semibold text-gray-800">{plant.name}</p>
                                        <p className="text-xs text-gray-500">{plant.scientificName}</p>
                                    </td>
                                    <td className="py-3 px-6 text-gray-600">{plant.category}</td>
                                    <td className="py-3 px-6">
                                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                                            plant.difficultyLevel === 'Easy' ? 'bg-green-100 text-green-700' :
                                            plant.difficultyLevel === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                                            'bg-red-100 text-red-700'
                                        }`}>
                                            {plant.difficultyLevel}
                                        </span>
                                    </td>
                                    <td className="py-3 px-6 text-right">
                                        <div className="flex justify-end gap-3">
                                            <Link 
                                                to={`/admin/plants/edit/${plant._id}`}
                                                className="p-2 text-blue-600 hover:bg-blue-50 rounded-full transition"
                                                title="Edit"
                                            >
                                                <Edit size={18} />
                                            </Link>
                                            <button 
                                                onClick={() => handleDelete(plant._id)}
                                                className="p-2 text-red-600 hover:bg-red-50 rounded-full transition"
                                                title="Delete"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="py-8 text-center text-gray-500">
                                    No plants found. Try adjusting your search.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminDashboard;
