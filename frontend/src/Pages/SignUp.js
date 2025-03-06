import React from "react";
import { Link } from "react-router-dom"; // For navigation
import "./SignUp.css"; 
import logo from "../Assets/smulogo.png"; // Ensure you have this logo in the correct path

const SignUp = () => {
  return (
    <div className="signup-container">
      <div className="signup-box">
        <img src={logo} alt="SMU Logo" className="logo" />
        <h2 className="title">Sign Up</h2>
        <form>
          <input type="text" name="username" placeholder="Username" className="input-field" required />
          <input type="email" name="email" placeholder="Email" className="input-field" required />
          <input type="password" name="password" placeholder="Password" className="input-field" required />
          <button type="submit" className="signup-button">Register</button>
        </form>
        <p className="login-text">
          Already have an account? <Link to="/">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
