const projectModel = require('../models/projectModels');

// ============================================================
// 1. Mengambil semua proyek (GET ALL)
// ============================================================

const getAllproject = async (req, res) => {
    try {
        const projects = await projectModel.getAllproject();

        res.status(200).json({
            success: true,
            message: 'Berhasil mengambil semua data proyek.',
            total: projects.length,
            data: projects
        });
    } catch (error) {
        console.error('Error getAllproject:', error.message);

        res.status(500).json({
            success: false,
            message: 'Terjadi kesalahan pada server.',
            error: error.message
        });
    }
};

// ============================================================
// 2. Mengambil satu proyek berdasarkan ID (GET BY ID)
// ============================================================

const getprojectById = async (req, res) => {
    try {
        const { id } = req.params;
        const project = await projectModel.getprojectById(id);

        if (!project) {
            return res.status(404).json({
                success: false,
                message: `Proyek dengan ID ${id} tidak ditemukan.`
            });
        }

        res.status(200).json({
            success: true,
            message: 'Berhasil mengambil data proyek.',
            data: project
        });
    } catch (error) {
        console.error('Error getprojectById:', error.message);

        res.status(500).json({
            success: false,
            message: 'Terjadi kesalahan pada server.',
            error: error.message
        });
    }
};

// ============================================================
// 3. Menambahkan proyek baru (CREATE / POST)
// ============================================================

const createproject = async (req, res) => {
    try {
        const data = req.body;

        // Validasi: pastikan title tidak kosong
        if (!data.title) {
            return res.status(400).json({
                success: false,
                message: 'Kolom "title" wajib diisi!'
            });
        }

        const result = await projectModel.createproject(data);

        res.status(201).json({
            success: true,
            message: 'Proyek berhasil ditambahkan!',
            data: { id: result.insertId }
        });
    } catch (error) {
        console.error('Error createproject:', error.message);

        res.status(500).json({
            success: false,
            message: 'Terjadi kesalahan pada server.',
            error: error.message
        });
    }
};

// ============================================================
// 4. Memperbarui data proyek (UPDATE / PUT)
// ============================================================

const updateproject = async (req, res) => {
    try {
        const { id } = req.params;
        const data = req.body;

        // Validasi: pastikan title tidak kosong
        if (!data.title) {
            return res.status(400).json({
                success: false,
                message: 'Kolom "title" wajib diisi!'
            });
        }

        const result = await projectModel.updateproject(id, data);

        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: `Proyek dengan ID ${id} tidak ditemukan.`
            });
        }

        res.status(200).json({
            success: true,
            message: 'Data proyek berhasil diperbarui.',
            data: result
        });
    } catch (error) {
        console.error('Error updateproject:', error.message);

        res.status(500).json({
            success: false,
            message: 'Terjadi kesalahan pada server.',
            error: error.message
        });
    }
};

// ============================================================
// 5. Menghapus proyek (DELETE)
// ============================================================

const deleteproject = async (req, res) => {
    try {
        const { id } = req.params;

        const result = await projectModel.deleteproject(id);

        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: `Proyek dengan ID ${id} tidak ditemukan.`
            });
        }

        res.status(200).json({
            success: true,
            message: 'Proyek berhasil dihapus.'
        });
    } catch (error) {
        console.error('Error deleteproject:', error.message);

        res.status(500).json({
            success: false,
            message: 'Terjadi kesalahan pada server.',
            error: error.message
        });
    }
};

// ============================================================
// EXPORT SEMUA CONTROLLER
// ============================================================

module.exports = {
    getAllproject,
    getprojectById,
    createproject,
    updateproject,
    deleteproject
};