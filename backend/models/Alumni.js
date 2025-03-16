import mongoose from 'mongoose';

const AlumniSchema = new mongoose.Schema({
    idNo: { type: String, required: true, unique: true },
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    photo: { type: String, default: "" },
    contactNumber: { type: String, default: "" },
    facebookAccount: { type: String, default: "" },
    school: { type: String, required: true },
    level: { type: String, required: true },
    program: { type: String, required: true, trim: true },
    recentGraduate: { type: String, default: "N/A" },
    elementaryAtSMU: { type: String, default: "N/A" },
    juniorHighAtSMU: { type: String, default: "N/A" },
    seniorHighAtSMU: { type: String, default: "N/A" },
    seniorHighStrand: { type: String, default: "N/A" },
    tertiaryAtSMU: { type: String, default: "N/A" },
    nonGraduateAttendance: { type: String, default: "N/A" },
    employmentStatus: { type: String, default: "" },
    currentWork: { type: String, default: "" },
    companyAddress: { type: String, default: "" },
    address: { type: String, default: "" },
    yearGraduated: { type: String, default: "N/A" },
    role: { type: String, default: "alumni" },
    status: { type: String, enum: ["pending", "approved"], default: "pending" }
}, { timestamps: true });

export default mongoose.model('Alumni', AlumniSchema);
