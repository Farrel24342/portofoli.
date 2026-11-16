const express = require('express');
const router = express.Router();
const ExperienceController = require('../controller/ExperienceController');
const { verifyToken, authorizeRoles } = require('../middleware/authMiddleware');

router.get('/', verifyToken, ExperienceController.getAllExperiences);
router.get('/:id',verifyToken, ExperienceController.getExperienceById);
router.post('/', verifyToken, authorizeRoles('admin'), ExperienceController.createExperience);
router.put('/:id', verifyToken, authorizeRoles('admin'), ExperienceController.updateExperience);
router.delete('/:id', verifyToken, authorizeRoles('admin'), ExperienceController.deleteExperience);

module.exports = router;