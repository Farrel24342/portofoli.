;const db =require('../config/db');

//ini yang tampilkan semua data
const getAllExperiences = async () =>{
    const [rows] = await db.query('SELECT * FROM experiences');
    return rows;
};

//ini tampilkan semua data berdasarkan id
const getExperienceById =async (id) =>{
    const [rows] = await db.query('SELECT * FROM experiences WHERE ID = ?', [id]);
    return rows[0];
};
//membuat data
const createExperience = async (data) => {
    const { title, company, location, start_date,  end_date,  is_current, description } = data;
    const[result] = await db.query(
        'INSERT INTO experiences ( title, company, location, start_date, end_date, is_current, description) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [title, company, location, start_date, end_date, is_current, description]
    );
    return result;
};
//mengedit data
const updateExperience = async (id, data) => {
    const {title, company, location, start_date,  end_date,  is_current, description } = data;
    const [result] = await db.query(
        'UPDATE experiences SET title = ?, company = ?, location = ?, start_date = ?, end_date = ?, is_current = ?, description = ? WHERE id = ?',
        [title, company, location, start_date,  end_date,  is_current, description, id]
    );
    return result;
};

//mengahpus data
const deleteExperience = async (id) => {
    const [result] = await db.query('DELETE FROM experiences WHERE id = ?',[id]);
    return result;
};

module.exports = { getAllExperiences, getExperienceById, createExperience, updateExperience, deleteExperience };