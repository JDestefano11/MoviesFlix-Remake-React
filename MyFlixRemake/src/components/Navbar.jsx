import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes, FaUser, FaPlay, FaDragon } from 'react-icons/fa';
import '../styles/Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <>
      <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
        <div className="nav-container">
          <Link to="/" className="nav-logo" onClick={closeMenu}>
            <div className="logo-wrapper">
              <FaDragon className="logo-icon main" />
              <FaPlay className="logo-icon play" />
              <span className="logo-text">DRAGON<span className="logo-highlight">FLIX</span></span>
            </div>
          </Link>

          <div className="nav-menu desktop">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/movies" className="nav-link">Movies</Link>
            <Link to="/profile" className="nav-link">
              <FaUser /> Profile
            </Link>
          </div>

          <div className="nav-controls">
            <div className="auth-buttons desktop-only">
              <Link to="/login" className="auth-button login">Login</Link>
              <Link to="/signup" className="auth-button signup">Sign Up</Link>
            </div>
            <div className="mobile-menu-button mobile-only">
              <button className="hamburger" onClick={toggleMenu} aria-label="Toggle menu">
                {isOpen ? <FaTimes /> : <FaBars />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className={`mobile-menu-overlay ${isOpen ? 'active' : ''}`} onClick={closeMenu}></div>

      <div className={`mobile-menu ${isOpen ? 'active' : ''}`}>
        <div className="mobile-menu-header">
          <Link to="/" className="nav-logo" onClick={closeMenu}>
            <div className="logo-wrapper">
              <FaDragon className="logo-icon main" />
              <FaPlay className="logo-icon play" />
              <span className="logo-text">DRAGON<span className="logo-highlight">FLIX</span></span>
            </div>
          </Link>
          <button className="close-button" onClick={closeMenu}>
            <FaTimes />
          </button>
        </div>
        <div className="mobile-nav-links">
          <Link to="/" className="mobile-nav-link" onClick={closeMenu}>Home</Link>
          <Link to="/movies" className="mobile-nav-link" onClick={closeMenu}>Movies</Link>
          <Link to="/profile" className="mobile-nav-link" onClick={closeMenu}>
            <FaUser /> Profile
          </Link>
        </div>
        <div className="mobile-auth-buttons">
          <Link to="/login" className="auth-button login" onClick={closeMenu}>Login</Link>
          <Link to="/signup" className="auth-button signup" onClick={closeMenu}>Sign Up</Link>
        </div>
      </div>
    </>
  );
};

export default Navbar;
