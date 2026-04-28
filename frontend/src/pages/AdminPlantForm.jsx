import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import api from '../api/axios';
import toast from 'react-hot-toast';
import { ArrowLeft, Upload, Save } from 'lucide-react';

const AdminPlantForm = () => {
    const { id } = useParams();
    const isEditMode = !!id;
    const navigate = useNavigate();
    
    const [loading, setLoading] = useState(isEditMode);
    const [submitting, setSubmitting] = useState(false);
    const [imagePreview, setImagePreview] = useState(null);
    
    const [formData, setFormData] = useState({
        name: '',
        scientificName: '',
        category: 'Indoor',
        type: 'Foliage',
        plantGroup: 'Other',
        difficultyLevel: 'Easy',
        sunlight: 'Bright Indirect Light',
        watering: 'When top 2 inches of soil are dry',
        wateringInterval: 7,
        soilType: 'Well-draining potting mix',
        growthTime: 'Moderate',
        description: '',
        careInstructions: '',
        aiCareTip: '',
        commonNames: '',
        uses: ''
    });
    
    const [imageFile, setImageFile] = useState(null);

    useEffect(() => {
        if (isEditMode) {
            fetchPlant();
        }
    }, [id]);

    const fetchPlant = async () => {
        try {
            const response = await api.get(`/plants/${id}`);
            const plant = response.data;
            
            setFormData({
                name: plant.name || '',
                scientificName: plant.scientificName || '',
                category: plant.category || 'Indoor',
                type: plant.type || 'Foliage',
                plantGroup: plant.plantGroup || 'Other',
                difficultyLevel: plant.difficultyLevel || 'Easy',
                sunlight: plant.sunlight || '',
                watering: plant.watering || '',
                wateringInterval: plant.wateringInterval || 7,
                soilType: plant.soilType || '',
                growthTime: plant.growthTime || '',
                description: plant.description || '',
                careInstructions: plant.careInstructions || '',
                aiCareTip: plant.aiCareTip || '',
                commonNames: plant.commonNames ? plant.commonNames.join(', ') : '',
                uses: plant.uses ? plant.uses.join(', ') : ''
            });
            
            if (plant.image) {
                setImagePreview(plant.image.startsWith('http') ? plant.image : `http://localhost:5000${plant.image}`);
            }
            
            setLoading(false);
        } catch (error) {
            console.error('Error fetching plant details:', error);
            toast.error('Failed to load plant details');
            navigate('/admin/dashboard');
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        try {
            const data = new FormData();
            
            // Append all text fields
            Object.keys(formData).forEach(key => {
                if (key === 'commonNames' || key === 'uses') {
                    // Convert comma separated string to array structure if needed by backend, 
                    // though backend currently expects an array, let's send it as comma-separated 
                    // and let backend handle it, or we split it here.
                    const arr = formData[key].split(',').map(item => item.trim()).filter(Boolean);
                    arr.forEach(item => data.append(`${key}[]`, item));
                } else {
                    data.append(key, formData[key]);
                }
            });

            if (imageFile) {
                data.append('image', imageFile);
            }

            if (isEditMode) {
                await api.put(`/plants/${id}`, data, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
                toast.success('Plant updated successfully');
            } else {
                if (!imageFile) {
                    toast.error('Please upload an image');
                    setSubmitting(false);
                    return;
                }
                await api.post('/plants', data, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
                toast.success('Plant created successfully');
            }

            navigate('/admin/dashboard');
        } catch (error) {
            console.error('Error saving plant:', error);
            toast.error(error.response?.data?.message || 'Failed to save plant');
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return <div className="flex justify-center items-center h-64">Loading form...</div>;
    }

    return (
        <div className="bg-white/80 backdrop-blur-md rounded-3xl p-8 shadow-xl border border-white/50 max-w-4xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
                <Link to="/admin/dashboard" className="p-2 hover:bg-green-50 rounded-full transition text-gray-500 hover:text-green-700">
                    <ArrowLeft size={24} />
                </Link>
                <h1 className="text-3xl font-bold text-green-800">
                    {isEditMode ? 'Edit Plant' : 'Add New Plant'}
                </h1>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Image Upload Section */}
                <div className="flex flex-col items-center p-6 border-2 border-dashed border-green-200 rounded-2xl bg-green-50/50">
                    <div className="w-40 h-40 mb-4 rounded-xl overflow-hidden bg-gray-100 flex items-center justify-center shadow-inner relative group">
                        {imagePreview ? (
                            <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                        ) : (
                            <Upload size={40} className="text-gray-400" />
                        )}
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <span className="text-white font-medium text-sm">Change Image</span>
                        </div>
                        <input 
                            type="file" 
                            name="image" 
                            accept="image/*" 
                            onChange={handleImageChange}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        />
                    </div>
                    <p className="text-sm text-gray-500">Click to upload or drag and drop an image</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Basic Info */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-gray-700 border-b pb-2">Basic Information</h3>
                        
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
                            <input 
                                type="text" name="name" required value={formData.name} onChange={handleChange}
                                className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Scientific Name *</label>
                            <input 
                                type="text" name="scientificName" required value={formData.scientificName} onChange={handleChange}
                                className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Common Names (comma separated)</label>
                            <input 
                                type="text" name="commonNames" value={formData.commonNames} onChange={handleChange}
                                className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500"
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
                                <select 
                                    name="category" value={formData.category} onChange={handleChange}
                                    className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500"
                                >
                                    <option value="Indoor">Indoor</option>
                                    <option value="Outdoor">Outdoor</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Type *</label>
                                <select 
                                    name="type" value={formData.type} onChange={handleChange}
                                    className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500"
                                >
                                    <option value="Foliage">Foliage</option>
                                    <option value="Succulent">Succulent</option>
                                    <option value="Flowering">Flowering</option>
                                    <option value="Herb">Herb</option>
                                    <option value="Cactus">Cactus</option>
                                </select>
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Difficulty Level *</label>
                            <select 
                                name="difficultyLevel" value={formData.difficultyLevel} onChange={handleChange}
                                className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500"
                            >
                                <option value="Easy">Easy</option>
                                <option value="Medium">Medium</option>
                                <option value="Hard">Hard</option>
                            </select>
                        </div>
                    </div>

                    {/* Care Details */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-gray-700 border-b pb-2">Care Requirements</h3>
                        
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Sunlight *</label>
                            <input 
                                type="text" name="sunlight" required value={formData.sunlight} onChange={handleChange}
                                className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Watering (Instructions) *</label>
                            <input 
                                type="text" name="watering" required value={formData.watering} onChange={handleChange}
                                className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Watering Interval (Days) *</label>
                            <input 
                                type="number" name="wateringInterval" required value={formData.wateringInterval} onChange={handleChange} min="1"
                                className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Soil Type *</label>
                            <input 
                                type="text" name="soilType" required value={formData.soilType} onChange={handleChange}
                                className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Growth Time *</label>
                            <input 
                                type="text" name="growthTime" required value={formData.growthTime} onChange={handleChange}
                                className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500"
                            />
                        </div>
                    </div>
                </div>

                {/* Long Text Areas */}
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
                        <textarea 
                            name="description" required value={formData.description} onChange={handleChange} rows="3"
                            className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Care Instructions (Detailed) *</label>
                        <textarea 
                            name="careInstructions" required value={formData.careInstructions} onChange={handleChange} rows="3"
                            className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">AI Care Tip *</label>
                        <textarea 
                            name="aiCareTip" required value={formData.aiCareTip} onChange={handleChange} rows="2"
                            className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                    </div>
                </div>

                <div className="flex justify-end pt-4 border-t">
                    <Link 
                        to="/admin/dashboard"
                        className="px-6 py-2 rounded-full text-gray-600 hover:bg-gray-100 font-medium transition mr-4"
                    >
                        Cancel
                    </Link>
                    <button 
                        type="submit" 
                        disabled={submitting}
                        className="flex items-center gap-2 bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white px-8 py-2 rounded-full font-medium transition shadow-md"
                    >
                        <Save size={18} />
                        {submitting ? 'Saving...' : 'Save Plant'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AdminPlantForm;
