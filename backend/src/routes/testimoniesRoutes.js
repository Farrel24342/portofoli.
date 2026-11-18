
const express = require('express');
const router = express.Router();

const testimoniController = require('../controller/testimoniesController');
const { verifyToken, authorizeRoles } = require('../middleware/authMiddleware');

// GET - Mengambil semua testimoni
router.get('/',verifyToken, testimoniController.getAllTestimonies);

// GET - Mengambil testimoni berdasarkan ID
router.get('/:id', verifyToken, testimoniController.getTestimoniById);

// POST - Menambahkan testimoni
router.post('/', verifyToken, authorizeRoles('admin'), testimoniController.createTestimoni);

// PUT - Memperbarui testimoni
router.put('/:id', verifyToken, authorizeRoles('admin'), testimoniController.updateTestimoni);

// DELETE - Menghapus testimoni
router.delete('/:id', verifyToken, authorizeRoles('admin'), testimoniController.deleteTestimoni);

module.exports = router;
