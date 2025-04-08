import mongoose from 'mongoose';

const AlumniSchema = new mongoose.Schema({
    idNo: { type: String, required: true, unique: true },
    firstName: { type: String, required: true, trim: true },
    middleName: { type: String, trim: true, default: "" },
    lastName: { type: String, required: true, trim: true },
    suffix: { type: String, trim: true, default: "" },
    birthday: { type: Date, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    photo: { type: String, default: "" },
    curriculumVitae: { 
        fileName: { type: String, default: "" },
        filePath: { type: String, default: "" } 
    },
    alumniIdApplication: { 
        fileName: { type: String, default: "" },
        filePath: { type: String, default: "" }
    },
    signature: { 
        fileName: { type: String, default: "" },
        filePath: { type: String, default: "" }
    },
    contactNumber: { type: String, default: "" },
    facebookAccount: { type: String, default: "" },
    school: { type: String, required: true },
    // level: { type: String, required: true },

    program: { type: String, required: true, trim: true },
    recentGraduate: { type: String, default: "N/A" },
    elementarySMU: { type: String, default: "N/A" },
    juniorHighSMU: { type: String, default: "N/A" },
    seniorHighSMU: { type: String, default: "N/A" },
    // seniorHighStrand: { type: String, default: "N/A" },

    strandInSMU: { type: String, default: "N/A" },
    tertiarySMU: { type: String, default: "N/A" },
    nonGraduateSMU: { type: String, default: "N/A" },
    employmentStatus: { type: [String], default: [] },
    otherEmploymentStatus: { type: String, default: "" },

    currentWork: { type: String, default: "" },
    companyAddress: { type: String, default: "" },
    address: { type: String, default: "" },
    // yearGraduated: { type: String, default: "N/A" },

    fatherFirstName: { type: String, required: true, trim: true },
    fatherMiddleName: { type: String, trim: true, default: "" },
    fatherLastName: { type: String, required: true, trim: true },
    fatherSuffix: { type: String, trim: true, default: "" },
    motherFirstName: { type: String, required: true, trim: true },
    motherMiddleName: { type: String, trim: true, default: "" },
    motherLastName: { type: String, required: true, trim: true },
    motherSuffix: { type: String, trim: true, default: "" },
    achievements: { type: [String], default: ["", "", "", "", ""] },
    role: { type: String, default: "alumni" },
    active:{ type: Boolean, default: false },
}, { timestamps: true });

export default mongoose.model('Alumni', AlumniSchema);
