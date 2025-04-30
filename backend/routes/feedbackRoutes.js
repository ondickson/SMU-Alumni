import express from 'express';
import {
  submitFeedback,
  getAllFeedback,
  updateFeedbackStatus,
  getUnreadFeedbackCount,
} from '../controllers/feedbackController.js';

const router = express.Router();

// POST feedback
router.post('/submit', submitFeedback);

// GET all feedback
router.get('/', getAllFeedback);

// PUT feedback status
router.put('/:id', updateFeedbackStatus);

// GET unread feedback count
router.get('/unread', getUnreadFeedbackCount);

export default router;
