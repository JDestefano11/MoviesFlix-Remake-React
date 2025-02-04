import React from 'react';
import '../styles/Auth.css';

const Signup = () => {
  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Create Account</h2>
        <form className="auth-form">
          <div className="form-group">
            <input type="text" placeholder="Username" required />
          </div>
          <div className="form-group">
            <input type="email" placeholder="Email" required />
          </div>
          <div className="form-group">
            <input type="password" placeholder="Password" required />
          </div>
          <div className="form-group">
            <input type="password" placeholder="Confirm Password" required />
          </div>
          <button type="submit" className="auth-button">Sign Up</button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
