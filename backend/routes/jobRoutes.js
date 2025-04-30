import express from "express";
import { getJobs, addJob, updateJob, deleteJob } from "../controllers/jobController.js";
import multer from "multer";

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.get("/", getJobs);
router.post("/", upload.single("image"), addJob); 
router.put("/:jobId", upload.single('image'), updateJob);
router.delete("/:jobId", deleteJob);

export default router;
