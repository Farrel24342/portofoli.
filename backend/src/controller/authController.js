const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const usersModel = require('../models/usersModel');


// 1. REGISTER: Mendaftarkan akun baru (password di-hash)
async function register(req, res) {
    try {
        const { username, email, password, role } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Username, email, dan password wajib diisi!'
            });
        }

        // Cek apakah username sudah dipakai
        const existingUsername = await usersModel.findByusersname(username);
        if (existingUsername) {
            return res.status(400).json({
                success: false,
                message: 'Username sudah digunakan, silakan pilih username lain!'
            });
        }

        // Cek apakah email sudah dipakai
        const existingEmail = await usersModel.findByEmail(email);
        if (existingEmail) {
            return res.status(400).json({
                success: false,
                message: 'Email sudah terdaftar, silakan gunakan email lain!'
            });
        }

        // Hash password menggunakan bcrypt
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Tentukan role (default ke 'users' jika tidak diisi)
        const usersRole = role || 'user';

        // Simpan users baru ke database
        const usersId = await usersModel.createUser({
            username,
            email,
            password: hashedPassword,
            role: usersRole
        });

        return res.status(201).json({
            success: true,
            message: 'Registrasi berhasil!',
            data: { id: usersId, username, email, role: usersRole }
        });

    } catch (error) {
        console.error('Error saat register:', error);
        return res.status(500).json({
            success: false,
            message: 'Terjadi kesalahan pada server',
            error: error.message
        });
    }
}

// 2. LOGIN: Memverifikasi akun & mencetak token JWT
const login = async (req, res) => {
    try {
        const { identifier, password } = req.body;

        // Validasi input login (bisa menggunakan usersname atau email)
        if (!identifier || !password) {
            return res.status(400).json({
                success: false,
                message: 'usersname/Email dan password wajib diisi!'
            });
        }

        // Cari users berdasarkan usersname atau email
        let users = await usersModel.findByusersname(identifier);
        if (!users) {
            users = await usersModel.findByEmail(identifier);
        }

        if (!users) {
            return res.status(401).json({
                success: false,
                message: 'Akun tidak ditemukan!'
            });
        }

        // Cek kecocokan password dengan hash di database
        const isPasswordValid = await bcrypt.compare(password, users.password);
        if (!isPasswordValid) {
            return res.status(401).json({
                success: false,
                message: 'Password salah!'
            });
        }

        // Buat token JWT yang berisi payload data users
        const token = jwt.sign(
            { id: users.id, usersname: users.usersname, role: users.role },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );

        return res.status(200).json({
            success: true,
            message: 'Login berhasil!',
            token,
            data: {
                id: users.id,
                usersname: users.usersname,
                email: users.email,
                role: users.role
            }
        });

    } catch (error) {
        console.error('Error saat login:', error);
        return res.status(500).json({
            success: false,
            message: 'Terjadi kesalahan pada server',
            error: error.message
        });
    }
};

// 3. GET PROFILE / ME: Mengambil data users yang sedang login
const getMe = async (req, res) => {
    try {
        // req.users didapat dari hasil verifikasi middleware JWT
        const users = await usersModel.findById(req.users.id);

        if (!users) {
            return res.status(404).json({
                success: false,
                message: 'Data pengguna tidak ditemukan'
            });
        }

        return res.status(200).json({
            success: true,
            data: {
                id: users.id,
                usersname: users.usersname,
                email: users.email,
                role: users.role
            }
        });
    } catch (error) {
        console.error('Error saat mengambil profil:', error);
        return res.status(500).json({
            success: false,
            message: 'Terjadi kesalahan pada server',
            error: error.message
        });
    }
};

// 4. GET ALL usersS (Khusus Admin): Menampilkan seluruh daftar pengguna
const getAlluserss = async (req, res) => {
    try {
        const userss = await usersModel.findAll();
        return res.status(200).json({
            success: true,
            total: userss.length,
            data: userss
        });
    } catch (error) {
        console.error('Error saat mengambil semua userss:', error);
        return res.status(500).json({
            success: false,
            message: 'Terjadi kesalahan pada server',
            error: error.message
        });
    }
};

module.exports = {
    register,
    login,
    getMe,
    getAlluserss
};