import Alumni from '../models/Alumni.js';
import Admin from '../models/Admin.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

// Signup
export const signup = async (req, res) => {
    const { idNo, name, email, password, program, yearGraduated } = req.body;
    try {
        // Check if the email or ID number already exists
        const existingUser = await Alumni.findOne({ $or: [{ email }, { idNo }] });
        if (existingUser) {
            return res.status(400).json({ error: "Email or ID number already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new Alumni user
        const user = new Alumni({
            idNo,
            name,
            email,
            password: hashedPassword,
            program,
            yearGraduated,
            role: "alumni"
        });

        // Save user to database
        await user.save();
        res.status(201).json({ message: "User registered successfully!" });
    } catch (error) {
        res.status(400).json({ error: "Server error" });
    }
};

// Login
export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        // Find user in Alumni table
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
