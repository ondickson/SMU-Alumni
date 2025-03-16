import express from "express";
import { getJobs, addJob } from "../controllers/jobController.js";
import multer from "multer";

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.get("/", getJobs);
router.post("/", upload.single("image"), addJob); // Handle image uploads

export default router;
