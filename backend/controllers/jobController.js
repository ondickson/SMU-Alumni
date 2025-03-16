import JobPost from "../models/JobPost.js";
import multer from "multer";

// Multer storage setup
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Get jobs with search functionality
export const getJobs = async (req, res) => {
    try {
        const search = req.query.search || "";
        const jobs = await JobPost.find({
            $or: [
                { title: { $regex: search, $options: "i" } },
                { description: { $regex: search, $options: "i" } },
            ],
        });

        res.status(200).json(jobs);
    } catch (error) {
        res.status(500).json({ message: "Error fetching jobs", error });
    }
};

// Handle job posting with file upload
export const addJob = async (req, res) => {
    try {
        const { title, description, link } = req.body;
        const image = req.file ? req.file.buffer.toString("base64") : ""; // Convert image to base64
        const newJob = new JobPost({ title, description, link, image });

        await newJob.save();
        res.status(201).json(newJob);
    } catch (error) {
        res.status(500).json({ message: "Error adding job", error });
    }
};
