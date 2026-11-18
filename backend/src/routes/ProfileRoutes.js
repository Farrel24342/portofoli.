const express = require('express');
const router = express.Router();
const ProfileController = require('../controller/ProfileController');
const { verifyToken, authorizeRoles } = require('../middleware/authMiddleware');

router.get('/profile', verifyToken, ProfileController.getProfile);
router.put('/profile/:id', verifyToken, ProfileController.updateProfile);

module.exports = router;