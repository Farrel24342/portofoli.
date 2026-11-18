const db = require('../config/db');

// ============================================================
// FUNGSI 1: Mengambil SEMUA data proyek
// ============================================================

const getAllproject = async () => {
    const [rows] = await db.query(
        'SELECT * FROM project ORDER BY created_at DESC'
    );

    return rows;
};

// ============================================================
// FUNGSI 2: Mengambil SATU proyek berdasarkan ID
// ============================================================

const getprojectById = async (id) => {
    const [rows] = await db.query(
        'SELECT * FROM project WHERE id = ?',
        [id]
    );

    return rows[0];
};

// ============================================================
// FUNGSI 3: Menambahkan proyek baru (CREATE)
// ============================================================

const createproject = async (data) => {
    const { title, description, category, image_url, demo_url, github_url, tech_stack, is_featured } = data;

    const [result] = await db.query(
        `INSERT INTO project (title, description, category, image_url, demo_url, github_url, tech_stack, is_featured)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [title, description, category, image_url, demo_url, github_url, tech_stack, is_featured || false]
    );
    return result;
};
// ============================================================
// FUNGSI 4: Memperbarui data proyek (UPDATE)
// ============================================================

const updateproject = async (id, data) => {
    const { title, description, category, image_url, demo_url, github_url, tech_stack, is_featured } = data;

    const [result] = await db.query(
        `UPDATE project SET 
        title = ?, description = ?, category = ?,
        image_url = ?, demo_url = ?, github_url = ?, 
        tech_stack = ?, is_featured = ?
        WHERE id = ?`,
        [title, description, category, image_url, demo_url, github_url, tech_stack, is_featured, id]
    );
    return result;
};
// ============================================================
// FUNGSI 5: Menghapus proyek (DELETE)
// ============================================================

const deleteproject = async (id) => {
    const [result] = await db.query(
        'DELETE FROM project WHERE id = ?',
        [id]
    );

    return result;
};

// ============================================================
// EXPORT SEMUA FUNGSI
// ============================================================

module.exports = {
    getAllproject,
    getprojectById,
    createproject,
    updateproject,
    deleteproject
};
