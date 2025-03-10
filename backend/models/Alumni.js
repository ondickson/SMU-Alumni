const mongoose = require('mongoose');

const AlumniSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    password: String,
    role: { type: String, default: "alumni" }
});

module.exports = mongoose.model('Alumni', AlumniSchema);
