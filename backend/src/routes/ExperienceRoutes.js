const express = require('express');
const router = express.Router();
const ExperienceController = require('../controller/ExperienceController');

router.get('/', ExperienceController.getAllExperiences);
router.get('/:id', ExperienceController.getExperienceById);
router.post('/', ExperienceController.createExperience);
router.put('/:id', ExperienceController.updateExperience);
router.delete('/:id', ExperienceController.deleteExperience);

module.exports = router;