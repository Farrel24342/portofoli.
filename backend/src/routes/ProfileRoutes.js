const express = require('express');
const router = express.Router();
const ProfileController = require('../controller/ProfileController');

router.get('/profile', ProfileController.getProfile);
router.put('/profile/:id', ProfileController.updateProfile);

module.exports = router;