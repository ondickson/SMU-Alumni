import mongoose from "mongoose";

const AdminSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    idNumber: { type: String, required: true, unique: true },
    position: { type: String, required: true },
    role: { type: String, default: "admin" },
    active: { type: Boolean, default: true }
});

export default mongoose.model("Admin", AdminSchema);
