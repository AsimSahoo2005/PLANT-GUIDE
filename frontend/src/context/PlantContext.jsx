import React, { createContext, useState, useEffect, useContext } from 'react';
import api from '../api/axios';
import { AuthContext } from './AuthContext';

export const PlantContext = createContext();

export const PlantProvider = ({ children }) => {
    const { user } = useContext(AuthContext);
    const [plants, setPlants] = useState([]);
    const [savedPlants, setSavedPlants] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchPlants = async (searchParams = '') => {
        setLoading(true);
        try {
            const response = await api.get(`/plants${searchParams}`);
            setPlants(response.data);
            setError(null);
        } catch (err) {
            setError('Failed to load plants');
        } finally {
            setLoading(false);
        }
    };

    const fetchSavedPlants = async () => {
        if (!user) return;
        try {
            const response = await api.get('/users/reminders');
            setSavedPlants(response.data);
        } catch (err) {
            console.error('Error fetching saved plants');
        }
    };

    const savePlant = async (plantId) => {
        if (!user) return false;
        try {
            await api.post('/users/save', { plantId });
            await fetchSavedPlants();
            return true;
        } catch (err) {
            console.error(err.response?.data?.message || 'Error saving plant');
            return false;
        }
    };

    const removePlant = async (plantId) => {
        if (!user) return false;
        try {
            await api.delete(`/users/remove/${plantId}`);
            await fetchSavedPlants();
            return true;
        } catch (err) {
            console.error(err.response?.data?.message || 'Error removing plant');
            return false;
        }
    };

    useEffect(() => {
        fetchPlants();
    }, []);

    useEffect(() => {
        if (user) {
            fetchSavedPlants();
        } else {
            setSavedPlants([]);
        }
    }, [user]);

    return (
        <PlantContext.Provider value={{ plants, savedPlants, loading, error, fetchPlants, savePlant, removePlant, fetchSavedPlants }}>
            {children}
        </PlantContext.Provider>
    );
};
