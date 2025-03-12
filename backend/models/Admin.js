import mongoose from 'mongoose';

const AdminSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    password: String,
    role: { type: String, default: "admin" }
});

export default mongoose.model('Admin', AdminSchema);
