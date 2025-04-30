
import Feedback from '../models/Feedback.js';

const THIRTY_DAYS_MS = 30 * 24 * 60 * 60 * 1000;

export const deleteOldDeletedFeedback = async () => {
  try {
    const result = await Feedback.deleteMany({
      status: 'deleted',
      deletedAt: { $lte: new Date(Date.now() - THIRTY_DAYS_MS) },
    });

    console.log(`🧹 Cleaned up ${result.deletedCount} deleted feedbacks`);
  } catch (err) {
    console.error('Failed to clean up deleted feedbacks:', err);
  }
};
