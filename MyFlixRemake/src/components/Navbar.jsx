import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = ({ isLoggedIn, onLogout }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  // Close mobile menu when route changes
  useEffect(() => {
    return () => setIsMobileMenuOpen(false);
  }, [navigate]);

  // Prevent scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLogout = () => {
    onLogout();
    setIsMobileMenuOpen(false);
    navigate('/');
  };

  const handleLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/" onClick={handleLinkClick}>
          <h1>MyFlix</h1>
        </Link>
      </div>

      <div className={`navbar-links ${isMobileMenuOpen ? 'active' : ''}`}>
        <div className="nav-items">
          <Link to="/" className="nav-link" onClick={handleLinkClick}>
            Home
          </Link>
          {isLoggedIn && (
            <>
              <Link to="/movies" className="nav-link" onClick={handleLinkClick}>
                Movies
              </Link>
              <Link to="/profile" className="nav-link" onClick={handleLinkClick}>
                Profile
              </Link>
            </>
          )}
        </div>

        <div className="auth-buttons">
          {!isLoggedIn ? (
            <>
              <Link to="/login" className="btn btn-login" onClick={handleLinkClick}>
                Login
              </Link>
              <Link to="/signup" className="btn btn-signup" onClick={handleLinkClick}>
                Sign Up
              </Link>
            </>
          ) : (
            <button className="btn btn-signup" onClick={handleLogout}>
              Logout
            </button>
          )}
        </div>
      </div>

      <button 
        className={`mobile-menu-button ${isMobileMenuOpen ? 'active' : ''}`}
        onClick={toggleMobileMenu}
        aria-label="Toggle navigation menu"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
    </nav>
  );
};

export default Navbar;
