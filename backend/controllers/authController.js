import Alumni from '../models/Alumni.js';
import Admin from '../models/Admin.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET =
  process.env.JWT_SECRET ||
  'eAYMJgr7KZt4KHm9tk3kGHIfCHV0CGwFMRuyTy1wtRtdzMtdiTwvi32CM3AcZOym';

// Login
export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    // Find user in Alumni table
    let user =
      (await Alumni.findOne({ email })) || (await Admin.findOne({ email }));

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (user.role === 'admin' && user.active === false) {
      return res
        .status(403)
        .json({ error: 'Account is inactive. Contact support.' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ idNo: user.idNo, role: user.role }, JWT_SECRET, {
      expiresIn: '1h',
    });
    res.json({ token, role: user.role });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Admin Login
export const loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await Admin.findOne({ email });

    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }

    if (!admin.active) {
      return res
        .status(403)
        .json({ message: 'Account is inactive. Contact support.' });
    }

    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ idNo: admin.idNo, role: 'admin' }, JWT_SECRET, {
      expiresIn: '1h',
    });

    res.json({
      token,
      admin: { idNo: admin.idNo, name: admin.name, email: admin.email },
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get User Profile
export const getAlumniProfile = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    const { idNo } = decoded;

    const alumni = await Alumni.findOne({ idNo });

    if (!alumni) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json(alumni);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const getProfile = async (req, res) => {
  try {
    const { idNo } = req.user;
    const alumni = await Alumni.findOne({ idNo });

    if (!alumni) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(alumni);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Signup
// Register Alumni
export const registerAlumni = async (req, res) => {
  try {
    const {
      // Step 1: Account Information
      email,
      password,
      confirmPassword,

      // Step 2: Personal Information
      idNo,
      firstName,
      middleName,
      lastName,
      suffix,
      birthday,
      fatherFirstName,
      fatherMiddleName,
      fatherLastName,
      fatherSuffix,
      motherFirstName,
      motherMiddleName,
      motherLastName,
      motherSuffix,

      // Step 3: Educational Information
      school,
      program,
      recentGraduate,
      elementarySMU,
      juniorHighSMU,
      seniorHighSMU,
      strandInSMU,
      tertiarySMU,
      nonGraduateSMU,
      topAchievements,

      // Step 4: Employment and Contact Information
      employmentStatus,
      EmploymentStatus,
      currentWork,
      companyAddress,
      address,
      facebookAccount,
      contactNumber,
    } = req.body;

    // Extract file paths from uploaded files
    const photo = req.files?.photo ? req.files.photo[0].path : null;
    const curriculumVitae = req.files?.curriculumVitae ? req.files.curriculumVitae[0].path : null;

    // Check if ID number is already registered
    const existingAlumni = await Alumni.findOne({ idNo });
    if (existingAlumni)
      return res.status(400).json({ message: "ID number already registered." });

    // Check if email is already registered
    const existingEmail = await Alumni.findOne({ email });
    if (existingEmail)
      return res.status(400).json({ message: "Email already registered." });

    // Validate password match
    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match." });
    }

    // Hash the password before saving
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new alumni entry with full details
    const newAlumni = new Alumni({
      // Step 1: Account Information
      email,
      password: hashedPassword,

      // Step 2: Personal Information
      idNo,
      firstName,
      middleName,
      lastName,
      suffix,
      birthday,
      fatherFirstName,
      fatherMiddleName,
      fatherLastName,
      fatherSuffix,
      motherFirstName,
      motherMiddleName,
      motherLastName,
      motherSuffix,

      // Step 3: Educational Information
      school,
      program,
      recentGraduate,
      elementarySMU,
      juniorHighSMU,
      seniorHighSMU,
      strandInSMU,
      tertiarySMU,
      nonGraduateSMU,
      topAchievements,

      // Step 4: Employment and Contact Information
      employmentStatus,
      EmploymentStatus,
      currentWork,
      companyAddress,
      address,
      facebookAccount,
      contactNumber,

      // Uploaded Files
      photo,
      curriculumVitae,
    });

    // Save to database
    await newAlumni.save();
    console.log("Uploaded Files:", req.files);

    res.status(201).json({
      message: "Registration successful. Awaiting admin approval.",
    });

  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};

