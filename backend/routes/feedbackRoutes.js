import express from 'express';
import { submitFeedback, getAllFeedback } from '../controllers/feedbackController.js';

const router = express.Router();

// POST feedback
router.post('/submit', submitFeedback);

// GET all feedback
router.get('/', getAllFeedback);

export default router;
