import Alumni from "../models/Alumni.js";

// Fetch all alumni
export const getAllAlumni = async (req, res) => {
  try {
    const alumni = await Alumni.find();
    res.status(200).json(alumni);
  } catch (error) {
    res.status(500).json({ message: "Error fetching alumni data", error });
  }
};

export const addAlumni = async (req, res) => {
    try {
        const newAlumni = new Alumni(req.body);
        await newAlumni.save();
        res.status(201).json({ message: "Alumni added successfully", alumni: newAlumni });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
