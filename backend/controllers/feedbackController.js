import Feedback from '../models/Feedback.js';

export const submitFeedback = async (req, res) => {
  try {
    const feedback = new Feedback({
      ...req.body,
      status: 'unread',
    });
    await feedback.save();
    res.status(201).json({ message: 'Feedback submitted successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Failed to submit feedback', error });
  }
};

export const getAllFeedback = async (req, res) => {
  try {
    const feedbacks = await Feedback.find().sort({ createdAt: -1 });
    res.status(200).json(feedbacks);
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve feedbacks', error });
  }
};

export const updateFeedbackStatus = async (req, res) => {
  const { id } = req.params;
  const { status, deletedAt } = req.body;

  try {
    const feedback = await Feedback.findByIdAndUpdate(
      id,
      { status, deletedAt },
      { new: true },
    );
    res.status(200).json(feedback);
  } catch (err) {
    res
      .status(500)
      .json({ message: 'Failed to update feedback status', error: err });
  }
};

export const getUnreadFeedbackCount = async (req, res) => {
  try {
    const unreadFeedbackCount = await Feedback.countDocuments({
      status: 'unread',
    });
    res.status(200).json({ totalUnreadFeedbacks: unreadFeedbackCount });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Failed to retrieve unread feedback count', error });
  }
};
