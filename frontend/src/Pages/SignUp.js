import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom'; // For navigation
import './SignUp.css';
import logo from '../Assets/smulogo.png'; // Ensure you have this logo in the correct path

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'alumni',
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/auth/signup', formData);
      alert('Registration successful!');
      navigate('/login');
    } catch (error) {
      alert('Error registering');
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-box">
        <img src={logo} alt="SMU Logo" className="logo" />
        <h2 className="SignUp-title">Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            placeholder="Username"
            className="input-field"
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="input-field"
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="input-field"
            onChange={handleChange}
            required
          />
          <select name="role" className="input-field" onChange={handleChange}>
            <option value="alumni">Alumni</option>
            <option value="admin">Admin</option>
          </select>
          <button type="submit" className="signup-button">
            Register
          </button>
        </form>
        <p className="login-text">
          Already have an account? <Link to="/">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
