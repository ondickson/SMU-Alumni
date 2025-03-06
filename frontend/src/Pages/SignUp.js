import React from "react";
import "./SignUp.css"; // Make sure your styles.css is linked

const SignUp = () => {
  return (
    <div className="signup-container">
      <h2>Sign Up</h2>
      <form>
        <input type="text" name="username" placeholder="Username" required />
        <input type="email" name="email" placeholder="Email" required />
        <input type="password" name="password" placeholder="Password" required />
        <button type="submit">Register</button>
      </form>
      <p className="login-link">
        Already have an account? <a href="#">Login</a>
      </p>
    </div>
  );
};

export default SignUp;
