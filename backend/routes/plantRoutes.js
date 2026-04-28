const express = require('express');
const router = express.Router();
const plantController = require('../controllers/plantController');
const upload = require('../middleware/upload');

const authMiddleware = require('../middleware/auth');
const adminMiddleware = require('../middleware/admin');

router.get('/', plantController.getAllPlants);
router.get('/:id', plantController.getPlantById);
router.post('/', authMiddleware, adminMiddleware, upload.single('image'), plantController.createPlant);
router.put('/:id', authMiddleware, adminMiddleware, upload.single('image'), plantController.updatePlant);
router.delete('/:id', authMiddleware, adminMiddleware, plantController.deletePlant);

module.exports = router;
