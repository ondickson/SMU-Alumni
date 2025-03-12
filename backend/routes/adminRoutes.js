import express from 'express';
import { getAllAlumni, addAlumni, deleteAlumni, updateAlumni } from '../controllers/adminController.js';

const router = express.Router();

router.get('/alumni', getAllAlumni);
router.post('/alumni', addAlumni); 
router.delete('/alumni/:idNo', deleteAlumni);
router.put('/alumni/:idNo', updateAlumni);

export default router;
