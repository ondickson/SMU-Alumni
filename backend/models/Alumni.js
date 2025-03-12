import mongoose from 'mongoose';

const AlumniSchema = new mongoose.Schema({
    idNo: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    program: { type: String, required: true },
    yearGraduated: { type: String, required: true },
    role: { type: String, default: "alumni" }
});

export default mongoose.model('Alumni', AlumniSchema);
