const mongoose = require('mongoose');
require('dotenv').config();
const User = require('./models/User');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/plantguide';

mongoose.connect(MONGO_URI)
    .then(async () => {
        console.log('Connected to MongoDB for migration');
        await User.updateMany({}, { $set: { savedPlants: [] } });
        console.log('Cleared all savedPlants due to schema change');
        mongoose.disconnect();
    })
    .catch(err => console.error(err));
