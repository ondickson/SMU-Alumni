import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './SignUp.css';

const SignUp = () => {
  const [formData, setFormData] = useState({
    idNo: '',
    name: '',
    email: '',
    password: '',
    program: '',
    yearGraduated: '',
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

      <img src="/smulogo.png" alt="SMU Logo" width="100" />
        <h2 className="SignUp-title">Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="idNo"
            placeholder="ID Number"
            className="input-field"
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="name"
            placeholder="Full Name"
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
          <input
            type="text"
            name="program"
            placeholder="Program"
            className="input-field"
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="yearGraduated"
            placeholder="Year Graduated"
            className="input-field"
            onChange={handleChange}
            required
          />
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
