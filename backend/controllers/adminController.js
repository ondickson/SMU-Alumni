import Alumni from "../models/Alumni.js";

export const getAllAlumni = async (req, res) => {
    try {
        const alumni = await Alumni.find();
        res.json(alumni);
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
};

export const addAlumni = async (req, res) => {
    try {
        // console.log("Incoming request body:", req.body);
        const { idNo, name, email, password, program, yearGraduated } = req.body;
        if (!idNo || !name || !email || !password || !program || !yearGraduated) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const newAlumni = new Alumni({ idNo: String(idNo), name, email, password, program, yearGraduated });
        await newAlumni.save();

        res.status(201).json({ message: "Alumni added successfully", alumni: newAlumni });
    } catch (error) {
        // console.error("Error adding alumni:", error);
        res.status(500).json({ error: error.message });
    }
};

export const deleteAlumni = async (req, res) => {
    try {
        const idNo = String(req.params.idNo); // Ensure it's a string
        console.log("Received request to delete alumni with idNo:", idNo);
        
        const deletedAlumni = await Alumni.findOneAndDelete({ idNo });

        if (!deletedAlumni) {
            return res.status(404).json({ error: "Alumni not found in database" });
        }

        res.json({ message: "Alumni deleted successfully", deletedAlumni });
    } catch (error) {
        console.error("Error deleting alumni:", error);
        res.status(500).json({ error: "Server error" });
    }
};



export const updateAlumni = async (req, res) => {
    try {
        const { idNo } = req.params;
        const updatedData = req.body;

        const updatedAlumni = await Alumni.findOneAndUpdate(
            { idNo },
            updatedData,
            { new: true }
        );

        if (!updatedAlumni) {
            return res.status(404).json({ error: "Alumni not found" });
        }

        res.json(updatedAlumni);
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
};


