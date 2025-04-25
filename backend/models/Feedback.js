import mongoose from 'mongoose';

const feedbackSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String },          
  alumniId: { type: String },   
  academic: [String],
  otherAcademic: String,
  administrative: [String],
  otherAdministrative: String,
  finance: [String],
  otherFinance: String,
  importantThings: { type: String, required: true },
  suggestions: { type: String, required: true },
  alumniList: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const Feedback = mongoose.model('Feedback', feedbackSchema);

export default Feedback;
