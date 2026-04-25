const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');
require('dotenv').config();

const Plant = require('./models/Plant');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/plantguide';
const uploadDir = path.join(__dirname, 'uploads');

if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Helper to download an image
const downloadImage = (url, filepath) => {
    return new Promise((resolve, reject) => {
        const client = url.startsWith('https') ? https : http;
        client.get(url, (res) => {
            if (res.statusCode === 200) {
                res.pipe(fs.createWriteStream(filepath))
                   .on('error', reject)
                   .once('close', () => resolve(filepath));
            } else if (res.statusCode === 301 || res.statusCode === 302) {
                // Handle redirect for unsplash links
                downloadImage(res.headers.location, filepath).then(resolve).catch(reject);
            } else {
                res.resume();
                reject(new Error(`Request Failed With a Status Code: ${res.statusCode}`));
            }
        }).on('error', reject);
    });
};

const migrateImages = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log('Connected to MongoDB');

        const plants = await Plant.find({});
        console.log(`Found ${plants.length} plants to process...`);

        let count = 0;
        for (const plant of plants) {
            if (plant.image && plant.image.startsWith('http')) {
                // Image is an external URL, needs migration
                console.log(`Migrating image for plant: ${plant.name}`);
                
                const sanitizedName = plant.name.replace(/\s+/g, '_').toLowerCase();
                const filename = `${Date.now()}-${sanitizedName}.jpg`;
                const filepath = path.join(uploadDir, filename);

                try {
                    await downloadImage(plant.image, filepath);
                    
                    // Update database
                    plant.image = `/uploads/${filename}`;
                    await plant.save();
                    console.log(`✅ Success: ${plant.name} -> /uploads/${filename}`);
                    count++;
                } catch (err) {
                    console.error(`❌ Failed to download image for ${plant.name}: ${err.message}`);
                }
            } else {
                console.log(`⏩ Skipping ${plant.name}: Image is already local (${plant.image})`);
            }
        }

        console.log(`\nMigration Complete. Processed ${count} images.`);
    } catch (error) {
        console.error('Migration error:', error);
    } finally {
        mongoose.disconnect();
        process.exit(0);
    }
};

migrateImages();
