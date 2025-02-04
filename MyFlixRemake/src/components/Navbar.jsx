import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = ({ isLoggedIn, onLogout }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLogout = () => {
    onLogout();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className={`navbar-links ${isMobileMenuOpen ? 'active' : ''}`}>
        <div className="nav-items">
          <Link to="/" className="nav-link">Home</Link>
          {isLoggedIn && (
            <>
              <Link to="/movies" className="nav-link">Movies</Link>
              <Link to="/profile" className="nav-link">Profile</Link>
            </>
          )}
        </div>
      </div>

      <div className="navbar-brand">
        <h1>MyFlix</h1>
        <button 
          className={`mobile-menu-button ${isMobileMenuOpen ? 'active' : ''}`}
          onClick={toggleMobileMenu}
          aria-label="Toggle navigation menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      <div className="auth-buttons">
        {!isLoggedIn ? (
          <>
            <Link to="/login" className="btn btn-login">Login</Link>
            <Link to="/signup" className="btn btn-signup">Sign Up</Link>
          </>
        ) : (
          <button className="btn btn-logout" onClick={handleLogout}>
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
