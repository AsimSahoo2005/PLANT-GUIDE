import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { PlantContext } from '../context/PlantContext';
import { AuthContext } from '../context/AuthContext';
import api from '../api/axios';
import GlassContainer from '../components/GlassContainer';
import { Droplets, Sun, Wind, CheckCircle, Heart, ArrowLeft, Clock, Tag, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';

const PlantDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { savePlant, removePlant, savedPlants } = useContext(PlantContext);
    const { user } = useContext(AuthContext);
    
    const [plant, setPlant] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDetail = async () => {
            try {
                const response = await api.get(`/plants/${id}`);
                setPlant(response.data);
            } catch (err) {
                console.error("Failed to load plant", err);
                toast.error("Failed to load plant details");
            } finally {
                setLoading(false);
            }
        };
        fetchDetail();
    }, [id]);

    const isSaved = savedPlants.some(p => {
        const pId = p.plant?._id || p.plant || p;
        return String(pId) === String(id);
    });

    const handleSaveToggle = async () => {
        if (!user) {
            toast.error('Please log in to save plants.');
            return;
        }
        
        if (isSaved) {
            const success = await removePlant(id);
            if (success) toast.success(`${plant.name} removed from your garden.`);
            else toast.error('Failed to remove plant.');
        } else {
            const success = await savePlant(id);
            if (success) toast.success(`${plant.name} added to your garden!`);
            else toast.error('Failed to save plant.');
        }
    };

    if (loading) return (
        <div className="flex justify-center items-center py-32">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-green-600"></div>
        </div>
    );
    
    if (!plant) return (
        <div className="text-center py-32">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Plant Not Found</h2>
            <button onClick={() => navigate('/')} className="text-green-600 hover:underline">Return Home</button>
        </div>
    );

    return (
        <div className="max-w-6xl mx-auto animate-fadeIn">
            <button 
                onClick={() => navigate(-1)} 
                className="flex items-center gap-2 text-green-700 hover:text-green-900 font-medium mb-6 transition"
            >
                <ArrowLeft size={20} /> Back to Plants
            </button>

            <GlassContainer className="overflow-hidden flex flex-col lg:flex-row shadow-2xl border-white/40">
                {/* Image Section */}
                <div className="lg:w-1/2 relative min-h-[400px] lg:min-h-full">
                    <img 
                        src={plant.image?.startsWith('/uploads') ? `http://localhost:5055${plant.image}` : plant.image} 
                        alt={plant.name}
                        className="w-full h-full object-cover absolute inset-0"
                        onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?auto=format&fit=crop&q=80&w=800' }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex flex-col justify-end p-8">
                        <span className="bg-white/90 text-green-800 text-xs font-bold px-3 py-1 rounded-full w-max mb-3 uppercase tracking-wider">
                            {plant.category} • {plant.type}
                        </span>
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-1 shadow-sm">{plant.name}</h1>
                        <p className="text-xl text-white/90 italic font-light">{plant.scientificName}</p>
                    </div>
                </div>
                
                {/* Details Section */}
                <div className="p-8 md:p-10 lg:w-1/2 flex flex-col bg-white/70 backdrop-blur-xl">
                    <div className="flex flex-wrap gap-2 mb-6">
                        {plant.commonNames?.map((name, idx) => (
                            <span key={idx} className="bg-green-100 text-green-800 text-xs px-3 py-1 rounded-full border border-green-200">
                                {name}
                            </span>
                        ))}
                    </div>

                    <p className="text-gray-700 text-lg leading-relaxed mb-8">
                        {plant.description}
                    </p>

                    {/* Care Requirements Grid */}
                    <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                        <CheckCircle className="text-green-500" /> Plant Profile
                    </h3>
                    
                    <div className="grid grid-cols-2 gap-4 mb-8">
                        <div className="bg-white/50 p-4 rounded-2xl border border-gray-100/50 shadow-sm flex items-start gap-3">
                            <Droplets className="text-blue-500 mt-1" size={24} />
                            <div>
                                <span className="font-semibold block text-gray-800 text-sm">Watering</span>
                                <span className="text-gray-600 text-sm">{plant.watering}</span>
                            </div>
                        </div>
                        <div className="bg-white/50 p-4 rounded-2xl border border-gray-100/50 shadow-sm flex items-start gap-3">
                            <Sun className="text-yellow-500 mt-1" size={24} />
                            <div>
                                <span className="font-semibold block text-gray-800 text-sm">Sunlight</span>
                                <span className="text-gray-600 text-sm">{plant.sunlight}</span>
                            </div>
                        </div>
                        <div className="bg-white/50 p-4 rounded-2xl border border-gray-100/50 shadow-sm flex items-start gap-3">
                            <Wind className="text-amber-700 mt-1" size={24} />
                            <div>
                                <span className="font-semibold block text-gray-800 text-sm">Soil Type</span>
                                <span className="text-gray-600 text-sm">{plant.soilType}</span>
                            </div>
                        </div>
                        <div className="bg-white/50 p-4 rounded-2xl border border-gray-100/50 shadow-sm flex items-start gap-3">
                            <Clock className="text-purple-500 mt-1" size={24} />
                            <div>
                                <span className="font-semibold block text-gray-800 text-sm">Growth Time</span>
                                <span className="text-gray-600 text-sm">{plant.growthTime}</span>
                            </div>
                        </div>
                    </div>

                    {/* Uses */}
                    {plant.uses && plant.uses.length > 0 && (
                        <div className="mb-8">
                            <h4 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                                <Tag size={18} className="text-green-600" /> Uses
                            </h4>
                            <div className="flex gap-2 flex-wrap">
                                {plant.uses.map((use, i) => (
                                    <span key={i} className="bg-emerald-50 text-emerald-700 px-4 py-1.5 rounded-full text-sm font-medium border border-emerald-100">
                                        {use}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* General Care Instructions */}
                    <div className="bg-green-50/80 p-5 rounded-2xl border border-green-100 mb-8">
                        <h4 className="font-bold text-green-900 mb-2">Care Instructions</h4>
                        <p className="text-green-800/80 text-sm leading-relaxed">{plant.careInstructions}</p>
                    </div>

                    <div className="mt-auto pt-6 border-t border-gray-200/50 flex flex-col gap-2">
                        <button 
                            onClick={handleSaveToggle}
                            className={`w-full py-4 rounded-xl font-bold text-lg transition flex items-center justify-center gap-2 shadow-lg ${
                                isSaved 
                                    ? 'bg-red-50 text-red-600 hover:bg-red-100 border border-red-200' 
                                    : 'bg-green-600 hover:bg-green-700 text-white hover:shadow-green-900/20'
                            }`}
                        >
                            {isSaved ? (
                                <>
                                    <Trash2 size={20} />
                                    Remove from Garden
                                </>
                            ) : (
                                <>
                                    <Heart size={20} />
                                    Save to Garden
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </GlassContainer>
        </div>
    );
};

export default PlantDetail;
