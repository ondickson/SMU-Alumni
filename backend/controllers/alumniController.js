import Alumni from "../models/Alumni.js";
import JobPost from "../models/JobPost.js";
import Event from "../models/Event.js";

// Fetch all alumni
export const getAllAlumni = async (req, res) => {
  try {
    const alumni = await Alumni.find();
    res.status(200).json(alumni);
  } catch (error) {
    res.status(500).json({ message: "Error fetching alumni data", error });
  }
};

// Add new alumni
export const addAlumni = async (req, res) => {
  try {
    const {
      idNo, name, email, password, photo, contactNumber, facebookAccount,
      school, level, program, recentGraduate, elementaryAtSMU, juniorHighAtSMU,
      seniorHighAtSMU, seniorHighStrand, tertiaryAtSMU, nonGraduateAttendance,
      employmentStatus, currentWork, companyAddress, address, yearGraduated
    } = req.body;

    const newAlumni = new Alumni({
      idNo, name, email, password, photo, contactNumber, facebookAccount,
      school, level, program, recentGraduate, elementaryAtSMU, juniorHighAtSMU,
      seniorHighAtSMU, seniorHighStrand, tertiaryAtSMU, nonGraduateAttendance,
      employmentStatus, currentWork, companyAddress, address, yearGraduated
    });

    await newAlumni.save();
    res.status(201).json({ message: "Alumni added successfully", alumni: newAlumni });
  } catch (error) {
    res.status(500).json({ message: "Error adding alumni", error: error.message });
  }
};

// Fetch single alumni by ID
export const getAlumniById = async (req, res) => {
  try {
    const alumni = await Alumni.findById(req.params.idNo);
    if (!alumni) {
      return res.status(404).json({ message: "Alumni not found" });
    }
    res.status(200).json(alumni);
  } catch (error) {
    res.status(500).json({ message: "Error fetching alumni data", error });
  }
};

// Update alumni details
export const updateAlumni = async (req, res) => {
  try {
    const updatedAlumni = await Alumni.findOneAndUpdate(
      { idNo: req.params.idNo }, 
      req.body, 
      { new: true }
    );

    if (!updatedAlumni) {
      return res.status(404).json({ message: "Alumni not found" });
    }

    res.status(200).json({ message: "Alumni updated successfully", alumni: updatedAlumni });
  } catch (error) {
    res.status(500).json({ message: "Error updating alumni", error: error.message });
  }
};


// Delete alumni
export const deleteAlumni = async (req, res) => {
  try {
    // console.log("Deleting alumni with idNo:", req.params.idNo);
    // const deletedAlumni = await Alumni.findByIdAndDelete(req.params.idNo);
    const deletedAlumni = await Alumni.findOneAndDelete({ idNo: req.params.idNo });

    if (!deletedAlumni) {
      return res.status(404).json({ message: "Alumni not found" });
    }
    res.status(200).json({ message: "Alumni deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting alumni", error });
  }
};

export const getTotals = async (req, res) => {
  try {
    const totalAlumni = await Alumni.countDocuments();
    const totalJobs = await JobPost.countDocuments();
    const totalEvents = await Event.countDocuments({ date: { $gte: new Date() } });

    res.json({ totalAlumni, totalJobs, totalEvents });
  } catch (error) {
    res.status(500).json({ message: "Error fetching totals", error });
  }
};

  // getAlumniProfile
  export const getAlumniProfile = async (req, res) => {
    try {
        const { idNo } = req.user; 
        const alumni = await Alumni.findOne({ idNo });
  
        if (!alumni) {
            return res.status(404).json({ message: "User not found" });
        }
  
        res.status(200).json(alumni);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
  };