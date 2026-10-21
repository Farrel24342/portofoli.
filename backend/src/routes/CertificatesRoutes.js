const express = require('express');
const router = express.Router();
const certificatesController = require('../controller/CertificatesController.js');

// 1. GET /api/certificates - Ambil semua data sertifikat
router.get('/', certificatesController.getAllCertificates);

// 2. GET /api/certificates/:id - Ambil 1 sertifikat berdasarkan ID
router.get('/:id', certificatesController.getCertificateById);

// 3. POST /api/certificates - Tambah data sertifikat baru
router.post('/', certificatesController.createCertificate);

// 4. PUT /api/certificates/:id - Update data sertifikat berdasarkan ID
router.put('/:id', certificatesController.updateCertificate);

// 5. DELETE /api/certificates/:id - Hapus data sertifikat berdasarkan ID
router.delete('/:id', certificatesController.deleteCertificate);

module.exports = router;