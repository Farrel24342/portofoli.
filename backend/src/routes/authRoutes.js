const express = require("express");
const router = express.Router();
const authController = require("../controller/authController");
const { verifyToken, authorizeRoles } = require("../middleware/authMiddleware");

// Route untuk registrasi pengguna baru
router.post("/register", authController.register);
router.post("/login", authController.login);

//endpoint untuk mendapatkan profil pengguna yang sedang login
router.get('/me', verifyToken, authController.getMe);

//endpoint untuk mendapatkan semua pengguna (hanya untuk admin)
router.get('/users', verifyToken, authorizeRoles('admin'), authController.getAlluserss);

module.exports = router;