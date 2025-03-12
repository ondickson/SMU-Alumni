import express from "express";
import { getJobs, addJob } from "../controllers/jobController.js";

const router = express.Router();

router.get("/", getJobs);
router.post("/", addJob);

export default router;
