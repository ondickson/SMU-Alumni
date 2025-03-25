import express from 'express';
import { login, getProfile, registerAlumni  } from '../controllers/authController.js';
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();


router.get("/profile", authMiddleware, getProfile); 
router.post('/login', login);
router.post('/signup', registerAlumni);

export default router;
