import React from 'react';
import { Link } from 'react-router-dom';
import { FaPlay, FaSearch, FaStar, FaFilm, FaRegClock } from 'react-icons/fa';
import { BiCameraMovie } from 'react-icons/bi';
import Navbar from '../components/Navbar';
import '../styles/Home.css';

const Home = () => {
  const heroImage = "https://image.tmdb.org/t/p/original/628Dep6AxEtDxjZoGP78TsOxYbK.jpg";
  
  const trendingMovies = [
    {
      title: "Spider-Man: Across the Spider-Verse",
      genre: "Animation, Action",
      rating: 4.9,
      image: "https://image.tmdb.org/t/p/w500/8Vt6mWEReuy4Of61Lnj5Xj704m8.jpg"
    },
    {
      title: "Oppenheimer",
      genre: "Biography, Drama",
      rating: 4.8,
      image: "https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg"
    },
    {
      title: "Guardians of the Galaxy Vol. 3",
      genre: "Action, Adventure",
      rating: 4.7,
      image: "https://image.tmdb.org/t/p/w500/r2J02Z2OpNTctfOSN1Ydgii51I3.jpg"
    }
  ];

  return (
    <div className="home">
      <Navbar />
      
      {/* Hero Section */}
      <section className="hero">
        <div 
          className="hero-background" 
          style={{ 
            backgroundImage: `url(${heroImage})`,
          }}
        />
        <div className="hero-overlay" />
        <div className="hero-content">
          <h1>Unlimited Movies & TV Shows</h1>
          <p>Stream your favorite content anytime, anywhere. Join today.</p>
          <div className="hero-cta">
            <Link to="/signup" className="cta-button primary">
              <FaPlay /> Start Watching
            </Link>
            <Link to="/movies" className="cta-button secondary">
              <FaSearch /> Browse Movies
            </Link>
          </div>
          <div className="hero-features">
            <div className="hero-feature">
              <FaFilm />
              <span>HD Quality</span>
            </div>
            <div className="hero-feature">
              <BiCameraMovie />
              <span>New Movies</span>
            </div>
            <div className="hero-feature">
              <FaRegClock />
              <span>24/7 Access</span>
            </div>
          </div>
        </div>
      </section>

      {/* Trending Section */}
      <section className="trending">
        <div className="section-header">
          <div className="header-content">
            <h2>Trending Now</h2>
            <p>Most watched movies this week</p>
          </div>
          <Link to="/movies" className="view-all">View All</Link>
        </div>
        <div className="movie-grid">
          {trendingMovies.map((movie, index) => (
            <div key={index} className="movie-card">
              <div className="movie-image" style={{ backgroundImage: `url(${movie.image})` }}>
                <div className="movie-overlay">
                  <button className="play-button">
                    <FaPlay />
                  </button>
                </div>
                <div className="movie-rating">
                  <FaStar />
                  <span>{movie.rating}</span>
                </div>
              </div>
              <div className="movie-info">
                <h3>{movie.title}</h3>
                <p>{movie.genre}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
