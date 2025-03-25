import express from 'express';
import { getAllAlumni, addAlumni, deleteAlumni, updateAlumni, getTotals, getAlumniProfile } from '../controllers/alumniController.js';
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.get('/alumni', getAllAlumni);
router.post('/alumni', addAlumni);
router.delete('/alumni/:idNo', deleteAlumni);
router.put('/alumni/:idNo', updateAlumni);
router.get("/totals", getTotals);

router.get("/profile", authMiddleware, getAlumniProfile); // Protected route

export default router;
