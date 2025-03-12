import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './login.css';
import logo from '../Assets/smulogo.png';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password,
      });
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('role', res.data.role);

      if (res.data.role === 'admin') {
        navigate('/AdminDashboard');
      } else {
        navigate('/AlumniDashboard');
      }
    } catch (error) {
      alert('Invalid Credentials');
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <img src={logo} alt="SMU Logo" className="logo" />
        <h2 className="login-title">Login</h2>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Username"
            className="input-field"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="input-field"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="login-button">
            Login
          </button>
        </form>
        <p className="signup-text">
          Don't have an account?{' '}
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLSf0b-itu7sXlfqfPPLimyrJ7S-P2SwuEqA9AowFbbb4V-I4-g/formResponse"
            target="_blank"
            rel="noopener noreferrer"
          >
            Register
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
