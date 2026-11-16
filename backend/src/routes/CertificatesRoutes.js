const express = require('express');
const router = express.Router();
const certificatesController = require('../controller/CertificatesController.js');
const { verifyToken, authorizeRoles } = require('../middleware/authMiddleware');

// 1. GET /api/certificates - Ambil semua data sertifikat
router.get('/', verifyToken, certificatesController.getAllCertificates);

// 2. GET /api/certificates/:id - Ambil 1 sertifikat berdasarkan ID
router.get('/:id', verifyToken,  certificatesController.getCertificateById);

// 3. POST /api/certificates - Tambah data sertifikat baru
router.post('/', verifyToken, authorizeRoles ('admin'), certificatesController.createCertificate);

// 4. PUT /api/certificates/:id - Update data sertifikat berdasarkan ID
router.put('/:id', verifyToken, authorizeRoles ('admin'), certificatesController.updateCertificate);

// 5. DELETE /api/certificates/:id - Hapus data sertifikat berdasarkan ID
router.delete('/:id', verifyToken, authorizeRoles ('admin'), certificatesController.deleteCertificate);

module.exports = router;