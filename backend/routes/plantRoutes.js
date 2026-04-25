const express = require('express');
const router = express.Router();
const plantController = require('../controllers/plantController');
const upload = require('../middleware/upload');

router.get('/', plantController.getAllPlants);
router.get('/:id', plantController.getPlantById);
router.post('/', upload.single('image'), plantController.createPlant);
router.put('/:id', upload.single('image'), plantController.updatePlant);
router.delete('/:id', plantController.deletePlant);

module.exports = router;
