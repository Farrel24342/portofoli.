const ProfileModel = require('../models/ProfileModel');

const getProfile = async (req, res) => {
    try {
        const profile = await ProfileModel.getProfile();

        if (!profile) {
            return res.status(404).json({
                success: false,
                message: 'Data profil belum tersedia!'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Data profil berhasil diambil!',
            data: profile
        });
    } catch (error) {
        console.error('Error getProfile:', error);

        res.status(500).json({
            success: false,
            message: 'Terjadi kesalahan pada server.',
            error: error.message
        });
    }
};

const updateProfile = async (req, res) => {
    try {
        const { id } = req.params;
        const data = req.body;

        if (!data.name || !data.role) {
            return res.status(400).json({
                success: false,
                message: 'kolom nama harus diisi!'
            });
        }

        const result = await ProfileModel.updateProfile(id, data);

        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: `Profil dengan ID ${id} tidak ditemukan!`
            });
        }

        res.status(200).json({
            success: true,
            message: 'Data profil berhasil diperbarui!',
            data: result
        });
    } catch (error) {
        console.error('Error updateProfile:', error);

        res.status(500).json({
            success: false,
            message: 'Terjadi kesalahan pada server.',
            error: error.message
        });
    }
};

module.exports = {
    getProfile,
    updateProfile
};