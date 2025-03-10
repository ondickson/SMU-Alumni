const Alumni = require('../models/Alumni');
const Admin = require('../models/Admin');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

// Signup
exports.signup = async (req, res) => {
    const { name, email, password, role } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        let user;
        
        if (role === "admin") {
            user = new Admin({ name, email, password: hashedPassword, role });
        } else {
            user = new Alumni({ name, email, password: hashedPassword, role: "alumni" });
        }
        
        await user.save();
        res.status(201).json({ message: "User registered successfully!" });
    } catch (error) {
        res.status(400).json({ error: "Email already exists or invalid data" });
    }
};

// Login
exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        let user = await Alumni.findOne({ email }) || await Admin.findOne({ email });
        
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: "Invalid credentials" });
        }

        const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: '1h' });
        res.json({ token, role: user.role });
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
};
