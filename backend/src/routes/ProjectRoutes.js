
const express = require('express');
const router = express.Router();
const projectController = require('../controller/projectController.js');
const { verifyToken, authorizeRoles } = require('../middleware/authMiddleware.js');

// GET /api/projects - Mengambil semua proyek
router.get('/', verifyToken, projectController.getAllproject);

// GET /api/projects/:id - Mengambil satu proyek berdasarkan ID
router.get('/:id', verifyToken, projectController.getprojectById);

// POST /api/projects - Menambahkan proyek baru
router.post('/', verifyToken, authorizeRoles('admin'), projectController.createproject);

// PUT /api/projects/:id - Memperbarui proyek berdasarkan ID
router.put('/:id', verifyToken, authorizeRoles('admin'), projectController.updateproject);

// DELETE /api/projects/:id - Menghapus proyek berdasarkan ID
router.delete('/:id', verifyToken, authorizeRoles('admin'), projectController.deleteproject);

module.exports = router;
