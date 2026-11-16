const express = require('express');
const router = express.Router();
const contactController = require('../controller/ContactController');
const { verifyToken, authorizeRoles } = require('../middleware/authMiddleware');

router.get('/', verifyToken, authorizeRoles('admin'), contactController.getAll);
router.get('/:id', verifyToken, contactController.getById);
router.post('/', verifyToken, authorizeRoles('admin'), contactController.create);
router.delete('/:id', verifyToken, authorizeRoles('admin'), contactController.remove);

module.exports = router;