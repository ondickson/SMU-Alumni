import React from "react";
import "./login.css";
import logo from "../Assets/smulogo.png"; // Correctly import the image

const Login = () => {
  return (
    <div className="login-container">
      <div className="login-box">
        <img src={logo} alt="SMU Logo" className="logo" />
        <h2 className="title">LogIn</h2>
        <form>
          <input type="text" placeholder="Username" className="input-field" />
          <input type="password" placeholder="Password" className="input-field" />
          <button type="submit" className="login-button">Login</button>
        </form>
        <p className="signup-text">
          Don't have an account? <a href="/SignUp">Sign Up</a>
        </p>
      </div>
    </div>
  );
};

export default Login;