import express from "express";
import { getAllAlumni, addAlumni } from "../controllers/alumniController.js";

const router = express.Router();

// Route to get all alumni
router.get("/", getAllAlumni);
router.post('/alumni', addAlumni); 

export default router;
