import mongoose from "mongoose";

const jobPostSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  salary: { type: String, required: true },
  location: { type: String, required: true },
  image: { type: String },
  createdAt: { type: Date, default: Date.now }
});

const JobPost = mongoose.model("JobPost", jobPostSchema);

export default JobPost;
