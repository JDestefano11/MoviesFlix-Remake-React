import React from 'react';
import { Link } from 'react-router-dom';
import { BiMoviePlay, BiCameraMovie } from 'react-icons/bi';
import { AiFillStar } from 'react-icons/ai';
import { MdMovieFilter } from 'react-icons/md';
import '../styles/Home.css';

const Home = () => {
  return (
    <div className="home">
      <div className="hero-background">
        <div className="overlay"></div>
      </div>
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            <span className="gradient-text">Explore</span> Movie
            <br />Details & Info
          </h1>
          <p className="hero-description">
            Discover comprehensive details about your favorite movies. From cast and ratings 
            to reviews and trailers, everything you need to know about films in one place.
          </p>
          <div className="hero-cta">
            <Link to="/login" className="cta-button primary">Explore Movies</Link>
            <Link to="/signup" className="cta-button secondary">Join Now</Link>
          </div>
        </div>
        <div className="hero-features">
          <div className="feature-card">
            <div className="feature-icon">
              <BiMoviePlay />
            </div>
            <h3>Movie Details</h3>
            <p>Get complete information about any movie including cast, crew, and ratings</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <MdMovieFilter />
            </div>
            <h3>Movie Reviews</h3>
            <p>Read detailed reviews and ratings from critics and users</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <BiCameraMovie />
            </div>
            <h3>Movie Trailers</h3>
            <p>Watch trailers and clips from your favorite movies</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
