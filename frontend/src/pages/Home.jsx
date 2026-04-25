import React, { useContext, useState, useEffect } from 'react';
import { PlantContext } from '../context/PlantContext';
import PlantCard from '../components/PlantCard';
import { Search, Filter } from 'lucide-react';

const Home = () => {
    const { plants, loading, fetchPlants } = useContext(PlantContext);
    const [searchTerm, setSearchTerm] = useState('');
    const [category, setCategory] = useState('');
    const [plantGroup, setPlantGroup] = useState('');
    const [type, setType] = useState('');
    const [uses, setUses] = useState('');
    const [sunlight, setSunlight] = useState('');
    const [watering, setWatering] = useState('');
    const [showFilters, setShowFilters] = useState(false);

    useEffect(() => {
        // Build query string
        const queryParams = new URLSearchParams();
        if (searchTerm) queryParams.append('search', searchTerm);
        if (category) queryParams.append('category', category);
        if (plantGroup) queryParams.append('plantGroup', plantGroup);
        if (type) queryParams.append('type', type);
        if (uses) queryParams.append('uses', uses);
        if (sunlight) queryParams.append('sunlight', sunlight);
        if (watering) queryParams.append('watering', watering);
        
        const paramsStr = queryParams.toString();
        fetchPlants(paramsStr ? `?${paramsStr}` : '');
    }, [searchTerm, category, plantGroup, type, uses, sunlight, watering]);

    return (
        <div className="space-y-8 animate-fadeIn">
            <div className="bg-green-700/10 rounded-3xl p-8 md:p-12 text-center backdrop-blur-sm border border-green-700/20">
                <h1 className="text-4xl md:text-5xl font-bold text-green-900 mb-4 tracking-tight">Discover Your Perfect Plant</h1>
                <p className="text-green-800/80 mb-8 max-w-2xl mx-auto text-lg">Explore our curated collection of indoor, outdoor, and unique plants to bring nature into your space.</p>
                
                <div className="max-w-4xl mx-auto flex flex-col gap-4">
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="relative flex-1">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                            <input 
                                type="text" 
                                placeholder="Search plants by name..." 
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-white shadow-lg focus:outline-none focus:ring-2 focus:ring-green-500 border border-transparent transition"
                            />
                        </div>
                        <button 
                            onClick={() => setShowFilters(!showFilters)}
                            className="bg-white px-6 py-3.5 rounded-2xl shadow-lg font-bold text-green-800 border border-transparent hover:border-green-200 flex items-center justify-center gap-2 transition"
                        >
                            <Filter size={20} />
                            Filters
                        </button>
                    </div>

                    {/* Advanced Filters Panel */}
                    <div className={`grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-3 transition-all duration-300 ease-in-out ${showFilters ? 'opacity-100 max-h-[500px] mt-2' : 'opacity-0 max-h-0 overflow-hidden'}`}>
                        <select 
                            value={plantGroup} 
                            onChange={(e) => setPlantGroup(e.target.value)}
                            className="py-3 px-4 rounded-xl bg-white/80 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 cursor-pointer text-sm font-medium text-gray-700"
                        >
                            <option value="">All Plant Groups</option>
                            <option value="Medicinal">Medicinal</option>
                            <option value="Vegetables">Vegetables</option>
                            <option value="Fruit">Fruit</option>
                        </select>

                        <select 
                            value={category} 
                            onChange={(e) => setCategory(e.target.value)}
                            className="py-3 px-4 rounded-xl bg-white/80 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 cursor-pointer text-sm font-medium text-gray-700"
                        >
                            <option value="">All Categories</option>
                            <option value="Indoor">Indoor</option>
                            <option value="Outdoor">Outdoor</option>
                            <option value="Succulent">Succulent</option>
                            <option value="Flowering">Flowering</option>
                            <option value="Fern">Fern</option>
                        </select>

                        <select 
                            value={type} 
                            onChange={(e) => setType(e.target.value)}
                            className="py-3 px-4 rounded-xl bg-white/80 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 cursor-pointer text-sm font-medium text-gray-700"
                        >
                            <option value="">All Types</option>
                            <option value="Flowering">Flowering</option>
                            <option value="Non-flowering">Non-flowering</option>
                        </select>

                        <select 
                            value={uses} 
                            onChange={(e) => setUses(e.target.value)}
                            className="py-3 px-4 rounded-xl bg-white/80 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 cursor-pointer text-sm font-medium text-gray-700"
                        >
                            <option value="">All Uses</option>
                            <option value="Medicinal">Medicinal</option>
                            <option value="Decorative">Decorative</option>
                            <option value="Air Purifying">Air Purifying</option>
                        </select>

                        <select 
                            value={sunlight} 
                            onChange={(e) => setSunlight(e.target.value)}
                            className="py-3 px-4 rounded-xl bg-white/80 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 cursor-pointer text-sm font-medium text-gray-700"
                        >
                            <option value="">Any Sunlight</option>
                            <option value="Low">Low</option>
                            <option value="Partial">Partial</option>
                            <option value="Full">Full</option>
                        </select>

                        <select 
                            value={watering} 
                            onChange={(e) => setWatering(e.target.value)}
                            className="py-3 px-4 rounded-xl bg-white/80 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 cursor-pointer text-sm font-medium text-gray-700"
                        >
                            <option value="">Any Watering</option>
                            <option value="Low">Low</option>
                            <option value="Medium">Medium</option>
                            <option value="High">High</option>
                        </select>
                    </div>
                </div>
            </div>

            {loading ? (
                <div className="flex justify-center items-center py-20">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-green-600"></div>
                </div>
            ) : plants.length === 0 ? (
                <div className="text-center py-20 bg-white/50 backdrop-blur-sm rounded-3xl border border-white">
                    <span className="text-6xl mb-4 block">🔍</span>
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">No plants found</h3>
                    <p className="text-gray-500">Try adjusting your filters or search term to find what you're looking for.</p>
                    <button 
                        onClick={() => {
                            setSearchTerm('');
                            setCategory('');
                            setPlantGroup('');
                            setType('');
                            setUses('');
                            setSunlight('');
                            setWatering('');
                        }}
                        className="mt-6 text-green-600 font-bold hover:underline"
                    >
                        Clear all filters
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {plants.map(plant => (
                        <PlantCard key={plant._id} plant={plant} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Home;
