const mongoose = require('mongoose');

const plantSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    scientificName: {
        type: String,
        required: true,
        trim: true
    },
    commonNames: {
        type: [String],
        default: []
    },
    description: {
        type: String,
        required: true
    },
    careInstructions: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    aiCareTip: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    plantGroup: {
        type: String,
        required: true,
        default: 'Other'
    },
    uses: {
        type: [String],
        default: []
    },
    sunlight: {
        type: String,
        required: true
    },
    watering: {
        type: String,
        required: true
    },
    wateringInterval: {
        type: Number,
        required: true,
        default: 7
    },
    soilType: {
        type: String,
        required: true
    },
    growthTime: {
        type: String,
        required: true
    },
    difficultyLevel: {
        type: String,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Plant', plantSchema);
