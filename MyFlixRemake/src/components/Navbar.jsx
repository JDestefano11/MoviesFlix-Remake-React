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

      <div className="nav-center desktop-only">
        <Link to="/" className="nav-center-link" onClick={handleLinkClick}>
          Home
        </Link>
        {isLoggedIn && (
          <>
            <Link to="/movies" className="nav-center-link" onClick={handleLinkClick}>
              Movies
            </Link>
            <Link to="/profile" className="nav-center-link" onClick={handleLinkClick}>
              Profile
            </Link>
          </>
        )}
      </div>

      <div className="auth-buttons desktop-only">
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

      <div className={`mobile-menu ${isMobileMenuOpen ? 'active' : ''}`}>
        <div className="mobile-nav-links">
          <Link to="/" className="nav-center-link" onClick={handleLinkClick}>
            Home
          </Link>
          {isLoggedIn && (
            <>
              <Link to="/movies" className="nav-center-link" onClick={handleLinkClick}>
                Movies
              </Link>
              <Link to="/profile" className="nav-center-link" onClick={handleLinkClick}>
                Profile
              </Link>
            </>
          )}
        </div>

        <div className="mobile-auth-buttons">
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
