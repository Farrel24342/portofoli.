
const express = require('express');
const router = express.Router();
const resumeController = require('../controller/resumeController');
const upload = require('../config/uploudConfig');
const { verifyToken, authorizeRoles } = require('../middleware/authMiddleware');

router.get('/', verifyToken, resumeController.getAllResumes);
router.get('/active', verifyToken, resumeController.getActiveResume);
router.get('/:id', verifyToken, resumeController.getResumeById);
router.post('/',verifyToken, authorizeRoles('admin'), upload.single('resume_file'), resumeController.uploadResume);
router.put('/:id', verifyToken, authorizeRoles('admin'), resumeController.updateResume);
router.delete('/:id', verifyToken, authorizeRoles('admin'), resumeController.deleteResume);

module.exports = router;
