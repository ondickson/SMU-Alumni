import express from "express";
import { getAllAlumni, addAlumni, deleteAlumni } from "../controllers/alumniController.js";

const router = express.Router();

// Route to get all alumni
router.get("/", getAllAlumni);
router.post('/alumni', addAlumni); 
router.delete("/alumni/:id", deleteAlumni);

export default router;

