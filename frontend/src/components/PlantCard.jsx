import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { PlantContext } from '../context/PlantContext';
import { AuthContext } from '../context/AuthContext';
import { Trash2, Heart } from 'lucide-react';
import toast from 'react-hot-toast';
import GlassContainer from './GlassContainer';

const PlantCard = ({ plant }) => {
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    const { savedPlants, savePlant, removePlant } = useContext(PlantContext);

    // Ensure we handle case where savedPlants might not be populated or might be an array of IDs
    const isSaved = savedPlants.some(p => {
        const id = p.plant?._id || p.plant || p;
        return id === plant._id;
    });

    const handleSave = async (e) => {
        e.stopPropagation(); // Prevent navigating to plant details
        if (!user) {
            toast.error('Please log in to save plants.');
            return;
        }

        if (isSaved) {
            const success = await removePlant(plant._id);
            if (success) {
                toast.success(`${plant.name} removed from your garden.`);
            } else {
                toast.error('Failed to remove plant.');
            }
        } else {
            const success = await savePlant(plant._id);
            if (success) {
                toast.success(`${plant.name} added to your garden!`);
            } else {
                toast.error('Failed to save plant.');
            }
        }
    };

    const handleCardClick = () => {
        navigate(`/plants/${plant._id}`);
    };

    return (
        <GlassContainer 
            className="overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition duration-300 flex flex-col h-full bg-white/60 backdrop-blur-lg border border-white/20 cursor-pointer"
            onClick={handleCardClick}
        >
            <div className="h-56 overflow-hidden relative">
                <img 
                    src={plant.image?.startsWith('/uploads') ? `http://localhost:5055${plant.image}` : plant.image} 
                    alt={plant.name}
                    className="w-full h-full object-cover hover:scale-105 transition duration-500"
                    onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?auto=format&fit=crop&q=80&w=600' }}
                />
                <span className="absolute top-3 right-3 bg-white/80 backdrop-blur-sm text-green-800 text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                    {plant.difficultyLevel}
                </span>
                <span className="absolute top-3 left-3 bg-green-600/90 backdrop-blur-sm text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm uppercase tracking-wider">
                    {plant.plantGroup}
                </span>
            </div>
            
            <div className="p-5 flex-1 flex flex-col">
                <h3 className="text-xl font-bold text-gray-800 mb-1">{plant.name}</h3>
                <p className="text-sm text-gray-500 italic mb-4">{plant.scientificName}</p>
                
                {/* AI Care Tip */}
                <div className="bg-green-50/70 border border-green-100 rounded-lg p-3 mb-4 flex-1">
                    <p className="text-xs text-green-800 font-bold mb-1">✨ AI Care Tip</p>
                    <p className="text-sm text-green-700/90 leading-relaxed line-clamp-3">{plant.aiCareTip}</p>
                </div>
                
                <div className="mt-auto pt-4 border-t border-gray-100/50">
                    <button 
                        onClick={handleSave}
                        className={`w-full py-2.5 rounded-xl font-bold flex items-center justify-center gap-2 transition ${
                            isSaved 
                                ? 'bg-red-50 text-red-600 hover:bg-red-100 border border-red-200' 
                                : 'bg-green-600 text-white hover:bg-green-700 shadow-md'
                        }`}
                    >
                        {isSaved ? (
                            <>
                                <Trash2 size={18} />
                                Remove from Garden
                            </>
                        ) : (
                            <>
                                <Heart size={18} />
                                Save to Garden
                            </>
                        )}
                    </button>
                </div>
            </div>
        </GlassContainer>
    );
};

export default PlantCard;
