require('dotenv').config();
const mongoose = require('mongoose');
const Plant = require('./models/Plant');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/plantguide';

const now = new Date();
// Generate a past date given days ago
const pastDate = (daysAgo) => new Date(now.getTime() - daysAgo * 24 * 60 * 60 * 1000);

const seedPlants = [
    // --- MEDICINAL ---
    {
        name: "Tulsi (Holy Basil)",
        scientificName: "Ocimum tenuiflorum",
        commonNames: ["Holy Basil", "Tulasi"],
        description: "An aromatic perennial plant widely used in Ayurveda and religious traditions. Known for its extensive medicinal properties and stress-relieving tea.",
        careInstructions: "Water regularly to keep the soil slightly moist. Needs plenty of sunlight. Prune the top leaves to encourage bushy growth and prevent early flowering.",
        image: "https://cdn.britannica.com/87/207887-050-F48CB55D/basil.jpg",
        aiCareTip: "Pinch off the flowers as soon as they appear to keep the leaves flavorful and the plant growing vigorously! 🌿",
        category: "Outdoor",
        type: "Flowering",
        plantGroup: "Medicinal",
        uses: ["Medicinal", "Culinary", "Religious"],
        sunlight: "Full",
        watering: "Medium",
        wateringInterval: 2, // water every 2 days
        lastWatered: pastDate(2), // needs water today!
        soilType: "Rich, loamy, well-drained soil",
        growthTime: "Fast-growing; ready to harvest leaves in 40-50 days.",
        difficultyLevel: "Medium"
    },
    {
        name: "Neem",
        scientificName: "Azadirachta indica",
        commonNames: ["Indian Lilac", "Margosa"],
        description: "A fast-growing evergreen tree. Its leaves, bark, and seed oil are heavily utilized in traditional medicine for anti-bacterial and anti-fungal properties.",
        careInstructions: "Young plants need regular watering, but mature trees are highly drought-tolerant. Ensure it receives full sunlight for optimal growth.",
        image: "https://cdn1.healthians.com/blog/wp-content/uploads/2026/02/Neem-Leaves-Benefits.webp",
        aiCareTip: "If grown in a pot, ensure a deep container since Neem has a strong taproot system.",
        category: "Outdoor",
        type: "Non-flowering",
        plantGroup: "Medicinal",
        uses: ["Medicinal", "Pesticide", "Skincare"],
        sunlight: "Full",
        watering: "Low",
        wateringInterval: 7, // water every 7 days
        lastWatered: pastDate(4), // next in 3 days
        soilType: "Well-drained sandy or loamy soil",
        growthTime: "Moderate growth; can live for centuries.",
        difficultyLevel: "Easy"
    },
    {
        name: "Chamomile",
        scientificName: "Matricaria chamomilla",
        commonNames: ["German Chamomile", "Babune ka Phool"],
        description: "A gentle herb with daisy-like flowers, famous for its use in calming, sleep-inducing teas.",
        careInstructions: "Water lightly but consistently. Doesn't need rich soil; in fact, soil too rich in nutrients will result in more foliage and fewer flowers.",
        image: "https://upload.wikimedia.org/wikipedia/commons/2/26/Kamomillasaunio_%28Matricaria_recutita%29.JPG",
        aiCareTip: "Harvest flowers when they are fully open in the morning for the best flavor and potency in tea.",
        category: "Outdoor",
        type: "Flowering",
        plantGroup: "Medicinal",
        uses: ["Medicinal", "Culinary"],
        sunlight: "Partial",
        watering: "Medium",
        wateringInterval: 3, 
        lastWatered: pastDate(1), 
        soilType: "Sandy, well-draining soil",
        growthTime: "Blooms in about 6-8 weeks from seed.",
        difficultyLevel: "Easy"
    },
    {
        name: "Lavender",
        scientificName: "Lavandula angustifolia",
        commonNames: ["English Lavender", "True Lavender"],
        description: "A fragrant perennial plant known for its beautiful purple spikes and essential oils used for relaxation and aromatherapy.",
        careInstructions: "Thrives in dry, well-draining soil. Do not overwater. Provide full sun and good air circulation.",
        image: "https://cloversgarden.com/cdn/shop/products/CGHidcoteLavenderPrimary_1200x1200.jpg?v=1679602241",
        aiCareTip: "Overwatering is the #1 killer of lavender. When in doubt, let it dry out!",
        category: "Outdoor",
        type: "Flowering",
        plantGroup: "Medicinal",
        uses: ["Medicinal", "Aromatherapy", "Decorative"],
        sunlight: "Full",
        watering: "Low",
        wateringInterval: 10,
        lastWatered: pastDate(11), // overdue!
        soilType: "Sandy, alkaline, well-drained soil",
        growthTime: "Slow-growing; blooms in summer.",
        difficultyLevel: "Medium"
    },
    {
        name: "Ashwagandha",
        scientificName: "Withania somnifera",
        commonNames: ["Indian Ginseng", "Winter Cherry"],
        description: "An ancient medicinal herb known as an adaptogen, meaning it can help the body manage stress and boost brain function.",
        careInstructions: "Prefers a dry climate. Water sparingly only when the soil is completely dry. Harvest roots in the fall.",
        image: "https://www.southernexposure.com/media/products/originals/ashwagandha-from-taylor-wilmott-fairfield-farm-4-cropped-c61ad5f460a2fe5055509c32e1d0841b.jpg",
        aiCareTip: "It's the roots that hold the medicinal power, not the leaves! Patience is required until harvest.",
        category: "Outdoor",
        type: "Non-flowering",
        plantGroup: "Medicinal",
        uses: ["Medicinal", "Supplement"],
        sunlight: "Full",
        watering: "Low",
        wateringInterval: 14,
        lastWatered: pastDate(5),
        soilType: "Sandy or well-draining red soil",
        growthTime: "Roots are ready to harvest after 150-180 days.",
        difficultyLevel: "Hard"
    },

    // --- VEGETABLES ---
    {
        name: "Brinjal (Eggplant)",
        scientificName: "Solanum melongena",
        commonNames: ["Eggplant", "Baingan", "Aubergine"],
        description: "A warm-weather plant that yields glossy, purple, teardrop-shaped vegetables. Requires patience and heat to thrive.",
        careInstructions: "Provide consistent moisture but ensure excellent drainage. Needs heavily amended soil with compost. Use a stake to support the heavy fruits.",
        image: "https://upload.wikimedia.org/wikipedia/commons/7/76/Solanum_melongena_24_08_2012_%281%29.JPG",
        aiCareTip: "Flea beetles love eggplant leaves. Keep an eye out for tiny holes and use neem oil as a deterrent.",
        category: "Outdoor",
        type: "Flowering",
        plantGroup: "Vegetables",
        uses: ["Culinary"],
        sunlight: "Full",
        watering: "High",
        wateringInterval: 2,
        lastWatered: pastDate(0), // watered today
        soilType: "Loamy, rich, well-draining soil",
        growthTime: "Harvest in 100-120 days from planting.",
        difficultyLevel: "Medium"
    },
    {
        name: "Okra (Bhindi)",
        scientificName: "Abelmoschus esculentus",
        commonNames: ["Lady's Finger", "Bhindi", "Okra"],
        description: "A heat-loving vegetable with beautiful hibiscus-like flowers, producing green seed pods used heavily in Indian cuisine.",
        careInstructions: "Extremely drought-tolerant once established. Needs full sun. Pick pods when they are young and tender (2-3 inches long).",
        image: "https://vgrgardens.com/wp-content/uploads/2024/11/istockphoto-621099742-612x612-1.jpg",
        aiCareTip: "Harvest every other day during peak season; pods become tough and woody if left too long!",
        category: "Outdoor",
        type: "Flowering",
        plantGroup: "Vegetables",
        uses: ["Culinary"],
        sunlight: "Full",
        watering: "Medium",
        wateringInterval: 3,
        lastWatered: pastDate(4), // overdue!
        soilType: "Well-drained, sandy loam soil",
        growthTime: "Fast-growing; harvest in 50-60 days.",
        difficultyLevel: "Easy"
    },
    {
        name: "Bitter Gourd (Karela)",
        scientificName: "Momordica charantia",
        commonNames: ["Bitter Melon", "Karela"],
        description: "A tropical vine that produces warty, distinctly bitter fruits. It is highly valued for its blood-sugar regulating properties.",
        careInstructions: "Requires a strong trellis or support system for the vines to climb. Keep soil consistently moist.",
        image: "https://www.trustbasket.com/cdn/shop/articles/Bittergourd.webp?v=1687165171",
        aiCareTip: "Pinch off the tip of the main vine when it reaches the top of your trellis to encourage side branching and more fruit.",
        category: "Outdoor",
        type: "Flowering",
        plantGroup: "Vegetables",
        uses: ["Culinary", "Medicinal"],
        sunlight: "Full",
        watering: "High",
        wateringInterval: 2,
        lastWatered: pastDate(2), // needs water today!
        soilType: "Rich, well-draining loamy soil",
        growthTime: "Harvest in 55-60 days.",
        difficultyLevel: "Medium"
    },
    {
        name: "Bottle Gourd (Lauki)",
        scientificName: "Lagenaria siceraria",
        commonNames: ["Calabash", "Lauki", "Dudhi"],
        description: "A vigorous climbing vine that produces pale green, bottle-shaped squash. Extremely popular in Indian curries and known for aiding digestion.",
        careInstructions: "Needs heavy feeding and consistent watering. Hand pollination may be required if natural pollinators are scarce.",
        image: "https://cdn.shopify.com/s/files/1/0579/7924/0580/files/50bb9d6235_600x600.jpg?v=1735908918",
        aiCareTip: "The flowers open at night! If fruits aren't setting, try hand-pollinating them with a small brush in the late evening.",
        category: "Outdoor",
        type: "Flowering",
        plantGroup: "Vegetables",
        uses: ["Culinary", "Medicinal"],
        sunlight: "Full",
        watering: "High",
        wateringInterval: 2,
        lastWatered: pastDate(1),
        soilType: "Moist, nutrient-rich soil",
        growthTime: "Harvest in 60-70 days.",
        difficultyLevel: "Medium"
    },
    {
        name: "Tomato",
        scientificName: "Solanum lycopersicum",
        commonNames: ["Tomato", "Tamatar"],
        description: "The crown jewel of the vegetable garden. While technically a fruit, it is used as a vegetable in countless global cuisines.",
        careInstructions: "Plant deeply, burying a portion of the stem. Water at the base to prevent blight. Provide strong stakes or cages.",
        image: "https://m.media-amazon.com/images/I/71MwMz52+EL._AC_UF1000,1000_QL80_.jpg",
        aiCareTip: "Prune the 'suckers' (small shoots in the crotches of branches) to direct energy into fruit production.",
        category: "Outdoor",
        type: "Flowering",
        plantGroup: "Vegetables",
        uses: ["Culinary"],
        sunlight: "Full",
        watering: "High",
        wateringInterval: 2,
        lastWatered: pastDate(3), // overdue!
        soilType: "Rich, well-draining loamy soil",
        growthTime: "Harvest in 60-100 days depending on variety.",
        difficultyLevel: "Medium"
    },
    {
        name: "Chili Pepper",
        scientificName: "Capsicum annuum",
        commonNames: ["Hari Mirch", "Green Chili"],
        description: "A compact plant that packs a punch. Indispensable for adding heat and flavor to Indian dishes.",
        careInstructions: "Thrives in heat. Let the top inch of soil dry out between waterings. Fertilize with a balanced organic fertilizer when flowers appear.",
        image: "https://media.istockphoto.com/id/468099810/photo/capsicum-annuum-plant-with-small-red-peppers.jpg",
        aiCareTip: "Slight water stress (letting it wilt just a tiny bit before watering) can actually make the peppers hotter! 🌶️",
        category: "Outdoor",
        type: "Flowering",
        plantGroup: "Vegetables",
        uses: ["Culinary", "Medicinal"],
        sunlight: "Full",
        watering: "Medium",
        wateringInterval: 3,
        lastWatered: pastDate(1),
        soilType: "Well-drained sandy loam",
        growthTime: "Harvest in 70-85 days.",
        difficultyLevel: "Easy"
    },
    {
        name: "Spinach (Palak)",
        scientificName: "Spinacia oleracea",
        commonNames: ["Palak", "Spinach"],
        description: "A fast-growing, cool-weather leafy green that is incredibly rich in iron, calcium, and vitamins.",
        careInstructions: "Needs consistent moisture. Prefers cooler temperatures; it will bolt (go to seed) quickly in intense summer heat.",
        image: "https://bonnieplants.com/cdn/shop/articles/BONNIE-PLANTS_spinach_iStock-915250154-1800px_87cee462-3671-4697-98ef-3007d29145e9.jpg",
        aiCareTip: "Harvest outer leaves continuously to keep the plant producing, rather than pulling the whole plant at once.",
        category: "Outdoor",
        type: "Non-flowering",
        plantGroup: "Vegetables",
        uses: ["Culinary"],
        sunlight: "Partial",
        watering: "High",
        wateringInterval: 2,
        lastWatered: pastDate(2), // needs water today!
        soilType: "Moist, nitrogen-rich soil",
        growthTime: "Fast-growing; harvest in 30-40 days.",
        difficultyLevel: "Easy"
    },
    {
        name: "Cauliflower",
        scientificName: "Brassica oleracea var. botrytis",
        commonNames: ["Phool Gobi", "Cauliflower"],
        description: "A cool-season crop requiring specific conditions to form a tight, white 'curd' or head.",
        careInstructions: "Needs consistent moisture and cool temperatures. When the head is 2-3 inches wide, tie the outer leaves over it ('blanching') to keep it white.",
        image: "https://www.shutterstock.com/image-photo/cauliflower-planted-well-ready-harvest-600nw-2513063125.jpg",
        aiCareTip: "Don't let the plant experience water stress, or the head will prematurely separate into loose florets ('buttoning').",
        category: "Outdoor",
        type: "Non-flowering",
        plantGroup: "Vegetables",
        uses: ["Culinary"],
        sunlight: "Full",
        watering: "High",
        wateringInterval: 3,
        lastWatered: pastDate(0), // watered today
        soilType: "Rich, moisture-retentive soil",
        growthTime: "Harvest in 50-80 days.",
        difficultyLevel: "Hard"
    },

    // --- FRUIT PLANTS ---
    {
        name: "Mango Tree",
        scientificName: "Mangifera indica",
        commonNames: ["Aam", "King of Fruits"],
        description: "A large, long-lived tropical evergreen tree that produces sweet, juicy stone fruits. A staple of Indian summers.",
        careInstructions: "Requires a frost-free climate. Water deeply but infrequently. Prune young trees to establish a strong structural canopy.",
        image: "https://bangaloreagrico.in/wp-content/uploads/2017/05/blackandrews-mango-2years.jpg",
        aiCareTip: "Mango trees drop a lot of natural leaf litter. Leave it around the base as a natural mulch to retain moisture!",
        category: "Outdoor",
        type: "Flowering",
        plantGroup: "Fruit",
        uses: ["Culinary"],
        sunlight: "Full",
        watering: "Low",
        wateringInterval: 14,
        lastWatered: pastDate(10), // next in 4 days
        soilType: "Deep, well-draining soil",
        growthTime: "Takes 3-5 years to bear fruit if grafted.",
        difficultyLevel: "Medium"
    },
    {
        name: "Banana Tree",
        scientificName: "Musa",
        commonNames: ["Kela", "Plantain"],
        description: "Actually a giant herb, not a tree! It grows quickly in warm, humid conditions and produces massive clusters of fruit.",
        careInstructions: "Extremely thirsty and hungry plant. Water heavily and feed with potassium-rich fertilizer. Protect from strong winds which shred the leaves.",
        image: "https://s3.amazonaws.com/YouGarden/Web/500x500/680331_3.jpg",
        aiCareTip: "Once a banana stalk produces fruit, it dies. Cut it down to allow the 'pups' (offshoots) to take over and fruit next year.",
        category: "Outdoor",
        type: "Non-flowering",
        plantGroup: "Fruit",
        uses: ["Culinary", "Decorative"],
        sunlight: "Full",
        watering: "High",
        wateringInterval: 2,
        lastWatered: pastDate(3), // overdue!
        soilType: "Rich, well-draining, slightly acidic soil",
        growthTime: "Produces fruit in 9-15 months.",
        difficultyLevel: "Medium"
    },
    {
        name: "Papaya Tree",
        scientificName: "Carica papaya",
        commonNames: ["Papita", "Pawpaw"],
        description: "A fast-growing, single-stemmed tropical fruit tree that can start bearing fruit within a year.",
        careInstructions: "Highly sensitive to waterlogging—excellent drainage is critical. Thrives in heat and humidity. Needs regular fertilizing.",
        image: "https://5.imimg.com/data5/SELLER/Default/2024/2/383775481/EU/QG/SS/21949238/papaya-plant-500x500.jpg",
        aiCareTip: "Papaya trees can be male, female, or bisexual. Ensure you have bisexual trees or at least one male for every few females to get fruit!",
        category: "Outdoor",
        type: "Flowering",
        plantGroup: "Fruit",
        uses: ["Culinary", "Medicinal"],
        sunlight: "Full",
        watering: "Medium",
        wateringInterval: 5,
        lastWatered: pastDate(2),
        soilType: "Sandy, loamy, extremely well-draining soil",
        growthTime: "Fast-growing; bears fruit in 6-10 months.",
        difficultyLevel: "Medium"
    },
    {
        name: "Guava Tree",
        scientificName: "Psidium guajava",
        commonNames: ["Amrood", "Guava"],
        description: "A tough, resilient tropical tree that produces sweet, fragrant fruits packed with Vitamin C.",
        careInstructions: "Very adaptable and drought-tolerant once established. Pruning helps maintain a manageable size and increases fruit yield.",
        image: "https://www.ugaoo.com/cdn/shop/files/7_eff7e6bc-75ad-438b-8e74-f4756a9ba083.jpg",
        aiCareTip: "Guavas bear fruit on new growth. Regular pruning stimulates new shoots and therefore more guavas!",
        category: "Outdoor",
        type: "Flowering",
        plantGroup: "Fruit",
        uses: ["Culinary"],
        sunlight: "Full",
        watering: "Medium",
        wateringInterval: 7,
        lastWatered: pastDate(7), // needs water today!
        soilType: "Adaptable to most soils if well-draining",
        growthTime: "Takes 2-3 years to bear fruit.",
        difficultyLevel: "Easy"
    },
    {
        name: "Jackfruit Tree",
        scientificName: "Artocarpus heterophyllus",
        commonNames: ["Kathal", "Jack Tree"],
        description: "Produces the largest tree-borne fruit in the world. The massive fruits sprout directly from the main trunk and large branches.",
        careInstructions: "Requires a lot of space. Protect young trees from cold. Keep soil moist but not waterlogged.",
        image: "https://thumbs.dreamstime.com/b/jackfruit-tree-full-fruit-large-oval-shaped-fruits-known-as-jackfruits-artocarpus-heterophyllus-growing-directly-its-375774194.jpg",
        aiCareTip: "Because the fruits are so heavy, they grow directly on the thick trunk rather than thin branches. Amazing evolutionary adaptation!",
        category: "Outdoor",
        type: "Flowering",
        plantGroup: "Fruit",
        uses: ["Culinary", "Timber"],
        sunlight: "Full",
        watering: "Medium",
        wateringInterval: 7,
        lastWatered: pastDate(1),
        soilType: "Deep, well-draining alluvial soil",
        growthTime: "Takes 3-5 years to bear fruit.",
        difficultyLevel: "Hard"
    },
    {
        name: "Lemon Tree",
        scientificName: "Citrus limon",
        commonNames: ["Nimbu", "Lime"],
        description: "A small, thorny evergreen tree known for its highly acidic, universally useful citrus fruits.",
        careInstructions: "Requires regular feeding with citrus-specific fertilizer. Sensitive to frost. Water deeply and allow the top 2 inches of soil to dry out.",
        image: "https://m.media-amazon.com/images/I/71K4WHlTSHL._AC_UF1000,1000_QL80_.jpg",
        aiCareTip: "Yellowing leaves with green veins usually indicate a magnesium or iron deficiency—a common issue for potted citrus.",
        category: "Outdoor",
        type: "Flowering",
        plantGroup: "Fruit",
        uses: ["Culinary", "Medicinal", "Cleaning"],
        sunlight: "Full",
        watering: "Medium",
        wateringInterval: 5,
        lastWatered: pastDate(5), // needs water today!
        soilType: "Well-draining, slightly acidic soil",
        growthTime: "Takes 3-5 years to bear fruit.",
        difficultyLevel: "Medium"
    },
    {
        name: "Pomegranate Tree",
        scientificName: "Punica granatum",
        commonNames: ["Anar", "Pomegranate"],
        description: "A beautiful, drought-tolerant shrub/small tree with stunning red-orange flowers and ruby-red, jewel-like seeds.",
        careInstructions: "Very tough and loves hot, dry summers. While it can survive droughts, regular watering is needed for a good fruit harvest.",
        image: "https://plantskingdom.in/cdn/shop/products/AnarPomegranate.jpg",
        aiCareTip: "Fruit splitting on the tree is usually caused by irregular watering. Try to keep moisture levels consistent while fruit is ripening.",
        category: "Outdoor",
        type: "Flowering",
        plantGroup: "Fruit",
        uses: ["Culinary", "Medicinal"],
        sunlight: "Full",
        watering: "Low",
        wateringInterval: 10,
        lastWatered: pastDate(3),
        soilType: "Adaptable, prefers well-draining loamy soil",
        growthTime: "Takes 2-3 years to bear fruit.",
        difficultyLevel: "Easy"
    },
    {
        name: "Coconut Palm",
        scientificName: "Cocos nucifera",
        commonNames: ["Nariyal", "Kalpavriksha"],
        description: "The 'Tree of Life'. Every part of this iconic tropical palm is utilized—water, meat, shell, husks, and leaves.",
        careInstructions: "Requires high humidity, abundant sunlight, and regular rainfall or watering. Salt tolerant.",
        image: "https://upload.wikimedia.org/wikipedia/commons/5/53/Singapore_coconut.jpg",
        aiCareTip: "Coconuts are actually giant seeds! They can float across oceans and still germinate when they wash up on a new beach.",
        category: "Outdoor",
        type: "Non-flowering",
        plantGroup: "Fruit",
        uses: ["Culinary", "Medicinal", "Industrial"],
        sunlight: "Full",
        watering: "High",
        wateringInterval: 3,
        lastWatered: pastDate(2),
        soilType: "Sandy, well-draining coastal soil",
        growthTime: "Takes 6-10 years to bear fruit.",
        difficultyLevel: "Hard"
    }
];

const seedDB = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log('Connected to MongoDB for Seeding...');

        // Clear existing plants
        await Plant.deleteMany({});
        console.log('Cleared existing plants collection.');

        // Insert new plants
        const insertedPlants = await Plant.insertMany(seedPlants);
        console.log(`Successfully seeded ${insertedPlants.length} plants! 🌱`);

        mongoose.connection.close();
        console.log('Database connection closed.');
    } catch (err) {
        console.error('Error seeding database:', err);
        mongoose.connection.close();
        process.exit(1);
    }
};

seedDB();
