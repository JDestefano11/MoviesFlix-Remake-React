import React from 'react';
import '../styles/Auth.css';

const Login = () => {
  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Welcome Back</h2>
        <form className="auth-form">
          <div className="form-group">
            <input type="email" placeholder="Email" required />
          </div>
          <div className="form-group">
            <input type="password" placeholder="Password" required />
          </div>
          <button type="submit" className="auth-button">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
