import React from 'react';
import { Link } from 'react-router-dom';
import { BiMoviePlay, BiCameraMovie } from 'react-icons/bi';
import { MdMovieFilter } from 'react-icons/md';
import '../styles/Home.css';
import heroBackground from '../assets/images/theater-seats.jpg';

const Home = () => {
  return (
    <div className="home">
      <div className="hero-background" style={{ backgroundImage: `url(${heroBackground})` }}>
        <div className="overlay"></div>
      </div>
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            Your Ultimate
            <br />
            <span className="gradient-text">Movie Experience</span>
          </h1>
          <p className="hero-description">
            Discover and explore your favorite movies in stunning detail. From the latest 
            blockbusters to timeless classics, your cinematic journey starts here.
          </p>
          <div className="hero-cta">
            <Link to="/login" className="cta-button primary">Start Watching</Link>
            <Link to="/signup" className="cta-button secondary">Join Now</Link>
          </div>
        </div>
        <div className="hero-features">
          <div className="feature-card">
            <div className="feature-icon">
              <BiMoviePlay />
            </div>
            <h3>Extensive Library</h3>
            <p>Access thousands of movies across all genres and eras</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <MdMovieFilter />
            </div>
            <h3>Smart Search</h3>
            <p>Find exactly what you want to watch with powerful filters</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <BiCameraMovie />
            </div>
            <h3>HD Quality</h3>
            <p>Enjoy your movies in crystal clear high definition</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
