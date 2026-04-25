const fs = require('fs');

const replacements = [
    {
        target: 'image: "https://images.unsplash.com/photo-1598046124578-1a52fc996d93?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",',
        replacement: 'image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Tulasi_-_Holy_Basil.JPG/800px-Tulasi_-_Holy_Basil.JPG",'
    },
    {
        target: 'image: "https://images.unsplash.com/photo-1611843467160-25afb8df1074?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",',
        replacement: 'image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/Neem_tree_leaves.jpg/800px-Neem_tree_leaves.jpg",'
    },
    {
        target: 'image: "https://images.unsplash.com/photo-1596483582496-f94676643265?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",',
        replacement: 'image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/Chamomile%40Smyrna.jpg/800px-Chamomile%40Smyrna.jpg",'
    },
    {
        target: 'image: "https://images.unsplash.com/photo-1508759073847-92cbfa4fdad3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",',
        replacement: 'image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Single_lavendar_flower02.jpg/800px-Single_lavendar_flower02.jpg",'
    },
    {
        target: 'image: "https://images.unsplash.com/photo-1626245366479-7984cd12d26f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", // Using a general herb image',
        replacement: 'image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Withania_somnifera_plant.jpg/800px-Withania_somnifera_plant.jpg",'
    },
    {
        target: 'image: "https://images.unsplash.com/photo-1596199279584-c8c3a1f1074e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",',
        replacement: 'image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/76/Solanum_melongena_24_08_2012_%281%29.JPG/800px-Solanum_melongena_24_08_2012_%281%29.JPG",'
    },
    {
        target: 'image: "https://images.unsplash.com/photo-1627885970308-412f1704fa7c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",',
        replacement: 'image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Okra_%28Abelmoschus_esculentus%29_2.jpg/800px-Okra_%28Abelmoschus_esculentus%29_2.jpg",'
    },
    {
        target: 'image: "https://images.unsplash.com/photo-1610486034177-33a75871f760?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", // Using general vine/vegetable image',
        replacement: 'image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Bitter_gourd.jpeg/800px-Bitter_gourd.jpeg",'
    },
    {
        target: 'image: "https://images.unsplash.com/photo-1555543440-b6f15779fc70?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", // Alternative gourd image',
        replacement: 'image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Lauki_in_plant.jpg/800px-Lauki_in_plant.jpg",'
    },
    {
        target: 'image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",',
        replacement: 'image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Tomato_je.jpg/800px-Tomato_je.jpg",'
    },
    {
        target: 'image: "https://images.unsplash.com/photo-1588045958564-9ce58da7509f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",',
        replacement: 'image: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Red_Chili_Pepper_Plant.jpg/800px-Red_Chili_Pepper_Plant.jpg",'
    },
    {
        target: 'image: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",',
        replacement: 'image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Spinacia_oleracea_Spinazie_bloeiend.jpg/800px-Spinacia_oleracea_Spinazie_bloeiend.jpg",'
    },
    {
        target: 'image: "https://images.unsplash.com/photo-1568584711475-32e652fb6a7b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",',
        replacement: 'image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Cauliflower_growing.jpg/800px-Cauliflower_growing.jpg",'
    },
    {
        target: 'image: "https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",',
        replacement: 'image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Mango_tree_in_Kerala.jpg/800px-Mango_tree_in_Kerala.jpg",'
    },
    {
        target: 'image: "https://images.unsplash.com/photo-1528825871115-3581a5387919?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",',
        replacement: 'image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Bananas.jpg/800px-Bananas.jpg",'
    },
    {
        target: 'image: "https://images.unsplash.com/photo-1517282009859-f000ec3b26fe?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",',
        replacement: 'image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Papaya_tree_in_India.jpg/800px-Papaya_tree_in_India.jpg",'
    },
    {
        target: 'image: "https://images.unsplash.com/photo-1536511132770-e501e5ca0cc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",',
        replacement: 'image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/Guava_ID.jpg/800px-Guava_ID.jpg",'
    },
    {
        target: 'image: "https://images.unsplash.com/photo-1627885970308-412f1704fa7c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", // Using general tropical image',
        replacement: 'image: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Jackfruit_hanging.JPG/800px-Jackfruit_hanging.JPG",'
    },
    {
        target: 'image: "https://images.unsplash.com/photo-1587496679742-bad502958fbb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",',
        replacement: 'image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Lemon.jpg/800px-Lemon.jpg",'
    },
    {
        target: 'image: "https://images.unsplash.com/photo-1615486171448-4e81cb8d31ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",',
        replacement: 'image: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Pomegranate_fruit.jpg/800px-Pomegranate_fruit.jpg",'
    },
    {
        target: 'image: "https://images.unsplash.com/photo-1587595431973-160d0d94add1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",',
        replacement: 'image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Coconut_palm_tree.jpg/800px-Coconut_palm_tree.jpg",'
    }
];

let content = fs.readFileSync('seed.js', 'utf8');

replacements.forEach(({ target, replacement }) => {
    content = content.replace(target, replacement);
});

fs.writeFileSync('seed.js', content, 'utf8');
console.log('Seed file updated successfully.');
