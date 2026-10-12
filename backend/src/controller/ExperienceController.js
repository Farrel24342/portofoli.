        const ExperienceModel = require('../models/ExperienceModel');

        const getAllExperiences = async (req, res) => {
            try {
                const Experiences = await ExperienceModel.getAllExperiences();
                res.status(200).json({ success: true, total: Experiences.length, data: Experiences });
            } catch (error) {
                res.status(500).json({ success: false, message: 'server error', error: error.message });
            }
        };

        const getExperienceById = async (req, res) =>{
            try {
                const {id} = req.params;
                const Experience = await ExperienceModel.getExperienceById(id);
                if (!Experience) return res.status(404).json({ success: false, message: 'data tidak ditemukan' });
                res.status(200).json ({success: true, data: Experience });
            } catch (error) {
                res.status(500).json({ success: false, message: 'server error', error: error.message});
            }
        };

        const createExperience = async (req, res) =>{
            try{
                const data = req.body;
                if (!data.title || ! data.company) return res.status(400).json({ success: false, message: 'nama Experience wajib diisi'});
                const result = await ExperienceModel.createExperience(data);
                res.status(210).json({ success: true, message: 'Experience ditambahkan', data: { id: result.insertId} });
            }catch (error){
                res.status(500).json({ success: false, message: 'server error', error: error.message});
            }
        };

        const updateExperience = async (req,res) => {
            try {
                const {id} = req.params;
                const data = req.body;
                if (!data.title || ! data.company) return res.status(400).json({ succes:false, message: "Nama Experience wajib diisi"});

                const result = await ExperienceModel.updateExperience(id, data);
                if (result.affectedRows === 0) return res.status(404).json({success: false, message: 'Data tidak ditemukan'});
                res.status(200).json({ success: true, message: 'Experience diperbarui' });
            } catch (error) {
                res.status(500).json({ success: false, message: 'Server Error', error: error.message});

            }
        };

        const deleteExperience =  async (req,res) => {
            try {
                const {id} = req.params;
                const result = await ExperienceModel.deleteExperience(id);
                if (result.affectedRows === 0) return res.status(404).json({success: false, message: 'Data tidak ditemukan'});
                res.status(200).json({ success: true, message: 'Experience dihapus' });
            } catch (error) {
                res.status(500).json({ success: false, message: 'Server Error', error: error.message});
            }
        };

        module.exports = { getAllExperiences, getExperienceById, createExperience, updateExperience, deleteExperience };