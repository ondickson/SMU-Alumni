import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import authRoutes from './routes/authRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import alumniRoutes from './routes/alumniRoutes.js';
import eventRoutes from "./routes/eventRoutes.js";
import jobRoutes from "./routes/jobRoutes.js";
import feedbackRoutes from './routes/feedbackRoutes.js';

import cron from 'node-cron';
import { deleteOldDeletedFeedback } from './tasks/cleanupFeedback.js';


import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const app = express();

// Middleware
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(cors());

// MongoDB Connection
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/alumniDB';
mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use("/api/alumni", alumniRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/admin", adminRoutes);
// app.use('/api', adminRoutes);
app.use('/api/feedback', feedbackRoutes);


// profile
// For ES Modules (since you're using `import`)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve /uploads folder statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Start Server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// Run cleanup every day at midnight
cron.schedule('0 0 * * *', () => {
  console.log('⏰ Running daily feedback cleanup...');
  deleteOldDeletedFeedback();
});

