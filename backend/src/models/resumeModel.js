
const db = require('../config/db');

// 1. GET ALL - Mengambil seluruh riwayat CV
const getAllresumes = async () => {
    const [rows] = await db.query(
        'SELECT * FROM resumes ORDER BY created_at DESC'
    );
    return rows;
};

// 2. GET ACTIVE - Mengambil 1 CV yang berstatus aktif
// untuk tombol Download di frontend
const getActiveresume = async () => {
    const [rows] = await db.query(
        'SELECT * FROM resumes WHERE is_active = TRUE ORDER BY created_at DESC LIMIT 1'
    );
    return rows[0];
};

// 3. GET BY ID - Mengambil data CV berdasarkan ID
const getresumeById = async (id) => {
    const [rows] = await db.query(
        'SELECT * FROM resumes WHERE id = ?',
        [id]
    );
    return rows[0];
};

// 4. CREATE resume - Menyimpan data file CV baru
const createresume = async (data) => {
    const {
        title,
        file_name,
        file_path,
        file_size,
        version,
        is_active
    } = data;

    // Jika CV baru diset aktif, nonaktifkan CV lama terlebih dahulu
    if (is_active) {
        await db.query(
            'UPDATE resumes SET is_active = FALSE'
        );
    }

    const [result] = await db.query(
        `INSERT INTO resumes
        (title, file_name, file_path, file_size, version, is_active)
        VALUES (?, ?, ?, ?, ?, ?)`,
        [
            title,
            file_name,
            file_path,
            file_size,
            version || '1.0',
            is_active !== undefined ? is_active : true
        ]
    );

    return result;
};

// 5. UPDATE - Memperbarui judul, versi, atau status aktif CV
const updateresume = async (id, data) => {
    const { title, version, is_active } = data;

    if (is_active) {
        await db.query(
            'UPDATE resumes SET is_active = FALSE WHERE id != ?',
            [id]
        );
    }

    const [result] = await db.query(
        'UPDATE resumes SET title = ?, version = ?, is_active = ? WHERE id = ?',
        [title, version, is_active, id]
    );

    return result;
};

// 6. DELETE - Menghapus catatan CV dari database
const deleteresumes = async (id) => {
    const [result] = await db.query(
        'DELETE FROM resumes WHERE id = ?',
        [id]
    );

    return result;
};

// Export semua fungsi
module.exports = {
        getAllResumes: getAllresumes,
    getActiveResume: getActiveresume,
    getResumeById: getresumeById,
    createResume: createresume,
    updateResume: updateresume,
    deleteResume: deleteresumes
};
