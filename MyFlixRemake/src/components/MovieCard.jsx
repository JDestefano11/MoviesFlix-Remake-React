import React, { useState } from 'react';
import { FaStar, FaHeart, FaPlay, FaClock, FaCalendar } from 'react-icons/fa';
import { BiMoviePlay } from 'react-icons/bi';
import '../styles/MovieCard.css';

const MovieCard = ({ movie, viewMode, isFavorite, onFavoriteClick, onMovieClick }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleImageError = () => {
    setImageError(true);
    const img = document.getElementById(`movie-img-${movie.id}`);
    if (img) {
      img.src = 'https://via.placeholder.com/500x750?text=Movie+Poster';
    }
  };

  const handleCardClick = (e) => {
    // Only trigger if not clicking on action buttons
    if (!e.target.closest('.action-button')) {
      onMovieClick(movie);
    }
  };

  return (
    <div 
      className={`movie-card ${viewMode}`}
      onClick={handleCardClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      role="button"
      tabIndex={0}
      aria-label={`View details for ${movie.title}`}
    >
      <div className="movie-poster">
        <img
          id={`movie-img-${movie.id}`}
          src={movie.poster}
          alt={movie.title}
          loading="lazy"
          onLoad={handleImageLoad}
          onError={handleImageError}
          style={{
            opacity: imageLoaded ? 1 : 0,
            transition: 'opacity 0.3s ease-in'
          }}
        />
        {!imageLoaded && !imageError && (
          <div className="image-placeholder">
            <div className="loading-spinner"></div>
          </div>
        )}
        <div className="rating-badge">
          <FaStar /> {movie.rating}
        </div>
        {movie.trending && (
          <div className="trending-badge">
            <BiMoviePlay /> Trending
          </div>
        )}
      </div>

      <div className="movie-info">
        <h3 className="movie-title">{movie.title}</h3>
        
        <div className="movie-meta">
          <span className="meta-item">
            <FaCalendar /> {movie.year}
          </span>
          <span className="meta-item">
            <FaClock /> {movie.duration}
          </span>
          <span className="genre">{movie.category}</span>
        </div>

        <p className="movie-description">{movie.description}</p>

        <div className="movie-actions">
          <button 
            className={`action-button favorite ${isFavorite ? 'active' : ''}`}
            onClick={(e) => {
              e.stopPropagation();
              onFavoriteClick();
              if (window.navigator?.vibrate) {
                window.navigator.vibrate(50);
              }
            }}
            aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          >
            <FaHeart />
            {isFavorite ? 'Favorited' : 'Favorite'}
          </button>
          <button 
            className="action-button watch"
            onClick={(e) => {
              e.stopPropagation();
              onMovieClick(movie);
            }}
            aria-label="Play movie"
          >
            <FaPlay />
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
