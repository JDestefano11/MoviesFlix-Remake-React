import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaDragon,  FaEye, FaEyeSlash, FaPlay, FaSearch } from 'react-icons/fa';
import { BiMoviePlay } from 'react-icons/bi';
import { MdLocalMovies, MdMovie } from 'react-icons/md';
import '../styles/Login.css';

const Login = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simulating API call
    setTimeout(() => {
      if (email === 'demo@example.com' && password === 'password') {
        setIsLoggedIn(true);
        navigate('/movies');
      } else {
        setError('Invalid credentials. Please try again.');
      }
      setIsLoading(false);
    }, 1500);
  };

  const handleDemoLogin = (e) => {
    e.preventDefault();
    setEmail('demo@example.com');
    setPassword('password');
  };

  return (
    <div className="login-page">
      <div className="animated-background">
        <div className="gradient-sphere sphere-1"></div>
        <div className="gradient-sphere sphere-2"></div>
        <div className="gradient-sphere sphere-3"></div>
      </div>
      
      <div className="login-container">
        <div className="login-content">
          <div className="brand-section">
            <Link to="/" className="brand-logo">
              <FaDragon className="logo-icon main" />
              <FaPlay className="logo-icon play" />
              <span className="brand-text">DRAGON<span className="brand-highlight">FLIX</span></span>
            </Link>
            <h1 className="welcome-text">Welcome Back</h1>
            <p className="subtitle">Continue your entertainment journey</p>
          </div>

          <form onSubmit={handleSubmit} className="login-form">
            {error && <div className="error-message">{error}</div>}
            
            <div className="form-group">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-input"
                required
              />
            </div>

            <div className="form-group">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-input"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="password-toggle"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            <div className="form-footer">
              <label className="remember-me">
                <input type="checkbox" />
                <span>Remember me</span>
              </label>
              <Link to="/forgot-password" className="forgot-password">
                Forgot Password?
              </Link>
            </div>

            <button type="submit" className="login-button" disabled={isLoading}>
              {isLoading ? (
                <div className="loading-spinner"></div>
              ) : (
                'Sign In'
              )}
            </button>

            <div className="divider">
              <span>or</span>
            </div>

            <button type="button" className="demo-button" onClick={handleDemoLogin}>
              Try Demo Account
            </button>
          </form>

          <div className="signup-prompt">
            <span>Don't have an account?</span>
            <Link to="/signup" className="signup-link">
              Sign up now
            </Link>
          </div>
        </div>

        <div className="login-feature">
          <div className="animated-bg">
            <div className="bg-shape shape1"></div>
            <div className="bg-shape shape2"></div>
            <div className="bg-shape shape3"></div>
          </div>
          <div className="feature-content">
            <div className="feature-header">
              <h2>Welcome to DragonFlix</h2>
              <p>Your Ultimate Movie Discovery Platform</p>
            </div>
            
            <div className="feature-showcase">
              <div className="showcase-item">
                <div className="showcase-visual">
                  <div className="preview-screen">
                    <div className="preview-content">
                      <div className="preview-play">
                        <FaPlay className="play-icon" />
                      </div>
                      <div className="preview-info">
                        <div className="preview-badge">HD</div>
                        <h3>Watch Trailers</h3>
                        <p>In High Quality</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="feature-highlights">
                <div className="highlight-item">
                  <div className="highlight-icon">
                    <BiMoviePlay />
                  </div>
                  <div className="highlight-text">
                    <h4>Latest Trailers</h4>
                    <p>Stay up to date with new releases</p>
                  </div>
                </div>
                
                <div className="highlight-item">
                  <div className="highlight-icon">
                    <MdLocalMovies />
                  </div>
                  <div className="highlight-text">
                    <h4>Movie Details</h4>
                    <p>Cast, ratings, and reviews</p>
                  </div>
                </div>
                
                <div className="highlight-item">
                  <div className="highlight-icon">
                    <FaSearch />
                  </div>
                  <div className="highlight-text">
                    <h4>Easy Search</h4>
                    <p>Find any movie instantly</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
