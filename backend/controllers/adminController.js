import Admin from '../models/Admin.js';
import bcrypt from 'bcryptjs';

export const addAdmin = async (req, res) => {
  try {
    const { name, email, password, idNumber, position } = req.body;

    if (!name || !email || !password || !idNumber || !position) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res
        .status(400)
        .json({ error: 'Admin with this email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newAdmin = new Admin({
      name,
      email,
      password: hashedPassword,
      idNumber,
      position,
      role: 'admin',
    });

    await newAdmin.save();
    res
      .status(201)
      .json({ message: 'Admin added successfully', admin: newAdmin });
  } catch (error) {
    res.status(500).json({ error: 'Server error', details: error.message });
  }
};

// Get All Admins
export const getAllAdmins = async (req, res) => {
  try {
    const admins = await Admin.find();
    res.json(admins);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Update Admin
export const updateAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedAdmin = await Admin.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updatedAdmin) {
      return res.status(404).json({ error: 'Admin not found' });
    }

    res
      .status(200)
      .json({ message: 'Admin updated successfully', admin: updatedAdmin });
  } catch (error) {
    res.status(500).json({ error: 'Server error', details: error.message });
  }
};

// Toggle Active Status
export const toggleAdminActive = async (req, res) => {
  try {
    const { id } = req.params;
    const admin = await Admin.findById(id);

    if (!admin) {
      return res.status(404).json({ error: 'Admin not found' });
    }

    admin.active = !admin.active;
    await admin.save();

    res
      .status(200)
      .json({ message: 'Admin status updated', active: admin.active });
  } catch (error) {
    res.status(500).json({ error: 'Server error', details: error.message });
  }
};

// Delete Admin
export const deleteAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedAdmin = await Admin.findByIdAndDelete(id);

    if (!deletedAdmin) {
      return res.status(404).json({ error: 'Admin not found' });
    }

    res.status(200).json({ message: 'Admin deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error', details: error.message });
  }
};
