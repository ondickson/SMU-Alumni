import express from 'express';
import multer from 'multer';
import {
  login,
  getProfile,
  registerAlumni,
} from '../controllers/authController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

// Configure Multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

// File upload setup
const upload = multer({ storage });

// Profile route (protected)
router.get('/profile', authMiddleware, getProfile);

// Login route
router.post('/login', login);

// Alumni registration route
router.post(
  '/signup',
  upload.fields([{ name: 'photo' }, { name: 'curriculumVitae' }]),
  registerAlumni,
);

export default router;
