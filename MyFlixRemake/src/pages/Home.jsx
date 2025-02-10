import React from 'react';
import { Link } from 'react-router-dom';
import { FaPlay, FaSearch, FaStar, FaFilm, FaRegClock, FaTv, FaGlobe, FaMobile, FaLaptop, FaTablet, FaEnvelope, FaArrowRight, FaCheckCircle, FaFighterJet, FaTheaterMasks, FaLaugh, FaRocket, FaBell } from 'react-icons/fa';
import { BiCameraMovie, BiMoviePlay } from 'react-icons/bi';
import { GiPistolGun, GiTheaterCurtains, GiAlienBug } from 'react-icons/gi';
import { MdLocalMovies } from 'react-icons/md';
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
      {/* Insane Background */}
      <div className="animated-bg">
        {/* Glowing spheres */}
        <div className="gradient-sphere sphere-1"></div>
        <div className="gradient-sphere sphere-2"></div>
        <div className="gradient-sphere sphere-3"></div>
      </div>
      
      {/* Animated gradient overlay */}
      <div className="gradient-overlay"></div>
      
      {/* Noise texture */}
      <div className="noise-overlay"></div>
      
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
        <div className="trending-header">
          <div className="header-content">
            <div className="section-badge">Trending Now</div>
            <h2>Popular Movie Trailers</h2>
            <p>Stay up to date with the most anticipated releases</p>
          </div>
        </div>
        <div className="movie-grid">
          {trendingMovies.map((movie, index) => (
            <div className="movie-card" key={index}>
              <div className="movie-image">
                <img src={movie.image} alt={movie.title} />
                <div className="movie-overlay">
                  <button className="play-button">
                    <FaPlay />
                  </button>
                  <div className="movie-info">
                    <h3>{movie.title}</h3>
                    <p>{movie.genre}</p>
                  </div>
                </div>
                <div className="movie-rating">
                  <FaStar />
                  {movie.rating}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="features-header">
          <div className="section-badge">Features</div>
          <h2>Why Choose MoviesFlix</h2>
          <p>Your ultimate destination for movie trailers and information</p>
        </div>
        <div className="features-grid">
          <div className="feature-box">
            <div className="feature-icon-wrapper">
              <FaPlay className="feature-icon" />
            </div>
            <h3>HD Trailers</h3>
            <p>Experience crystal-clear movie trailers in high definition quality</p>
          </div>
          <div className="feature-box">
            <div className="feature-icon-wrapper">
              <BiMoviePlay className="feature-icon" />
            </div>
            <h3>Movie Details</h3>
            <p>Comprehensive information about cast, crew, and ratings</p>
          </div>
          <div className="feature-box">
            <div className="feature-icon-wrapper">
              <FaRegClock className="feature-icon" />
            </div>
            <h3>Latest Updates</h3>
            <p>Real-time updates on upcoming releases and new trailers</p>
          </div>
          <div className="feature-box">
            <div className="feature-icon-wrapper">
              <FaGlobe className="feature-icon" />
            </div>
            <h3>Global Movies</h3>
            <p>Access trailers from international and local cinema</p>
          </div>
        </div>
      </section>

      {/* Top Genres Section */}
      <section className="genres">
        <div className="genres-header">
          <span className="section-badge">Explore Movies By Genre</span>
          <h2>Top Movie Genres</h2>
          <p>Discover the best movies across different genres</p>
        </div>
        <div className="genres-grid">
          <Link to="/movies/action" className="genre-card">
            <GiPistolGun className="genre-icon" />
            <h3>Action</h3>
            <p>Thrilling action-packed adventures</p>
          </Link>
          <Link to="/movies/drama" className="genre-card">
            <GiTheaterCurtains className="genre-icon" />
            <h3>Drama</h3>
            <p>Emotional and compelling stories</p>
          </Link>
          <Link to="/movies/comedy" className="genre-card">
            <FaLaugh className="genre-icon" />
            <h3>Comedy</h3>
            <p>Fun and entertaining comedies</p>
          </Link>
          <Link to="/movies/sci-fi" className="genre-card">
            <GiAlienBug className="genre-icon" />
            <h3>Sci-Fi</h3>
            <p>Mind-bending science fiction</p>
          </Link>
        </div>
      </section>

      {/* Device Compatibility */}
      <section className="devices">
        <div className="devices-header">
          <div className="section-badge">Watch Everywhere</div>
          <h2>Available on Your Favorite Devices</h2>
          <p>Stream trailers seamlessly across all your devices</p>
        </div>
        <div className="devices-grid">
          <div className="device-card">
            <FaLaptop className="device-icon" />
            <h3>Computer</h3>
            <p>Windows & Mac</p>
          </div>
          <div className="device-card">
            <FaMobile className="device-icon" />
            <h3>Mobile</h3>
            <p>iOS & Android</p>
          </div>
          <div className="device-card">
            <FaTv className="device-icon" />
            <h3>Smart TV</h3>
            <p>Apple TV & Android TV</p>
          </div>
          <div className="device-card">
            <FaTablet className="device-icon" />
            <h3>Tablet</h3>
            <p>iPad & Android Tablets</p>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="newsletter">
        <div className="newsletter-content">
          <div className="newsletter-header">
            <div className="badge-wrapper">
              <span className="section-badge">Stay Updated <FaBell className="badge-icon" /></span>
            </div>
            <h2>Never Miss New Releases</h2>
            <p>Get notified about new movies, exclusive trailers, and special events directly in your inbox.</p>
          </div>
          <div className="newsletter-right">
            <form className="newsletter-form">
              <div className="input-wrapper">
                <input type="email" placeholder="Enter your email address" required />
                <FaEnvelope className="input-icon" />
              </div>
              <button type="submit" className="btn-primary">
                Subscribe Now <FaArrowRight className="btn-icon" />
              </button>
            </form>
            <div className="newsletter-features">
              <div className="feature">
                <FaCheckCircle className="feature-icon" />
                <span>Weekly Updates</span>
              </div>
              <div className="feature">
                <FaCheckCircle className="feature-icon" />
                <span>Exclusive Content</span>
              </div>
              <div className="feature">
                <FaCheckCircle className="feature-icon" />
                <span>Cancel Anytime</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq">
        <div className="faq-header">
          <div className="section-badge">Help Center</div>
          <h2>Frequently Asked Questions</h2>
          <p>Find quick answers to common questions</p>
        </div>
        <div className="faq-grid">
          <div className="faq-item">
            <h3>Is MoviesFlix free to use?</h3>
            <p>Yes, MoviesFlix is completely free! Watch unlimited movie trailers without any subscription.</p>
          </div>
          <div className="faq-item">
            <h3>How often are new trailers added?</h3>
            <p>We update our collection daily with the latest movie trailers and announcements.</p>
          </div>
          <div className="faq-item">
            <h3>Can I watch full movies here?</h3>
            <p>MoviesFlix is focused on providing high-quality trailers and movie information. For full movies, please visit official streaming platforms.</p>
          </div>
          <div className="faq-item">
            <h3>Are the trailers available in HD?</h3>
            <p>Yes, all our trailers are available in HD quality for the best viewing experience.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
