import express from 'express';
import { getAllAlumni, addAlumni, deleteAlumni, updateAlumni, getTotals } from '../controllers/alumniController.js';

const router = express.Router();

router.get('/alumni', getAllAlumni);
router.post('/alumni', addAlumni);
router.delete('/alumni/:idNo', deleteAlumni);
router.put('/alumni/:idNo', updateAlumni);
router.get("/totals", getTotals);

export default router;
