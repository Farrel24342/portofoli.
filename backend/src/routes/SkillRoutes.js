const express = require('express');
const router = express.Router();
const skillController = require('../controller/SkillController');
const { verifyToken, authorizeRoles } = require('../middleware/authMiddleware');

router.get('/',  skillController.getAllSkills);
router.get('/:id', skillController.getSkillById);
router.post('/', skillController.createSkill);
router.put('/:id', skillController.updateSkill);
router.delete('/:id', skillController.deleteSkill);

module.exports = router;