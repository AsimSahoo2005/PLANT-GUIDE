const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/auth');

// Protected routes
router.post('/save', authMiddleware, userController.savePlant);
router.delete('/remove/:id', authMiddleware, userController.removePlant);
router.get('/reminders', authMiddleware, userController.getReminders);
router.put('/water/:plantId', authMiddleware, userController.waterPlant);

module.exports = router;
