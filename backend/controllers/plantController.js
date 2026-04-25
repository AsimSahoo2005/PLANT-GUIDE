const Plant = require('../models/Plant');
const fs = require('fs');
const path = require('path');

exports.getAllPlants = async (req, res) => {
    try {
        const { category, type, sunlight, watering, uses, search, plantGroup } = req.query;
        let query = {};

        if (category) query.category = category;
        if (type) query.type = type;
        if (sunlight) query.sunlight = sunlight;
        if (watering) query.watering = watering;
        if (plantGroup) query.plantGroup = plantGroup;
        
        if (uses) {
            // Uses can be passed as a string or array if multiple. We'll handle a single string for now.
            query.uses = { $in: [uses] };
        }

        if (search) {
            query.$or = [
                { name: { $regex: search, $options: 'i' } },
                { commonNames: { $regex: search, $options: 'i' } }
            ];
        }

        const plants = await Plant.find(query);
        res.status(200).json(plants);
    } catch (error) {
        console.error('Error fetching plants:', error);
        res.status(500).json({ message: 'Server error fetching plants' });
    }
};

exports.getPlantById = async (req, res) => {
    try {
        const plant = await Plant.findById(req.params.id);
        if (!plant) {
            return res.status(404).json({ message: 'Plant not found' });
        }
        res.status(200).json(plant);
    } catch (error) {
        console.error('Error fetching plant:', error);
        if (error.kind === 'ObjectId') {
             return res.status(404).json({ message: 'Plant not found (invalid ID)' });
        }
        res.status(500).json({ message: 'Server error fetching plant' });
    }
};

exports.createPlant = async (req, res) => {
    try {
        const plantData = { ...req.body };
        if (req.file) {
            plantData.image = `/uploads/${req.file.filename}`;
        }
        
        const newPlant = new Plant(plantData);
        const savedPlant = await newPlant.save();
        res.status(201).json(savedPlant);
    } catch (error) {
        console.error('Error creating plant:', error);
        res.status(400).json({ message: 'Failed to create plant', error: error.message });
    }
};

exports.updatePlant = async (req, res) => {
    try {
        const plantData = { ...req.body };
        const plantId = req.params.id;

        // Check if there is an existing plant to optionally delete the old image
        const existingPlant = await Plant.findById(plantId);
        if (!existingPlant) {
            return res.status(404).json({ message: 'Plant not found' });
        }

        if (req.file) {
            plantData.image = `/uploads/${req.file.filename}`;
            // Delete old image if it's stored locally
            if (existingPlant.image && existingPlant.image.startsWith('/uploads/')) {
                const oldImagePath = path.join(__dirname, '..', existingPlant.image);
                if (fs.existsSync(oldImagePath)) {
                    fs.unlinkSync(oldImagePath);
                }
            }
        }

        const updatedPlant = await Plant.findByIdAndUpdate(plantId, plantData, { new: true, runValidators: true });
        res.status(200).json(updatedPlant);
    } catch (error) {
        console.error('Error updating plant:', error);
        res.status(400).json({ message: 'Failed to update plant', error: error.message });
    }
};

exports.deletePlant = async (req, res) => {
    try {
        const deletedPlant = await Plant.findByIdAndDelete(req.params.id);
        if (!deletedPlant) {
            return res.status(404).json({ message: 'Plant not found' });
        }

        // Delete associated image if it's stored locally
        if (deletedPlant.image && deletedPlant.image.startsWith('/uploads/')) {
            const imagePath = path.join(__dirname, '..', deletedPlant.image);
            if (fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath);
            }
        }

        res.status(200).json({ message: 'Plant deleted successfully' });
    } catch (error) {
        console.error('Error deleting plant:', error);
        res.status(500).json({ message: 'Server error deleting plant' });
    }
};
