import React, { useState } from 'react';
import { FaStar, FaHeart, FaShare, FaTrophy, FaFire } from 'react-icons/fa';
import '../styles/MovieCard.css';

const MovieCard = ({ movie, isFeatured = false, onFavorite, isFavorite }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleImageError = () => {
    setImageError(true);
    // Fallback to a default image if the original fails
    const img = document.getElementById(`movie-img-${movie.id}`);
    if (img) {
      img.src = 'https://via.placeholder.com/500x750?text=Movie+Poster';
    }
  };

  const handleShare = () => {
    // In a real app, implement social sharing functionality
    alert(`Sharing ${movie.title}!`);
  };

  const handleFavoriteClick = () => {
    onFavorite(movie.id);
    // Add a small vibration if the device supports it
    if (window.navigator && window.navigator.vibrate) {
      window.navigator.vibrate(50);
    }
  };

  return (
    <div className={`movie-card ${isFeatured ? 'featured' : ''}`}>
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
        {movie.trending && !isFeatured && (
          <div className="trending-badge">
            <FaFire /> Trending
          </div>
        )}
      </div>

      <div className="movie-info">
        <div className="movie-content">
          <h3 className="movie-title">{movie.title}</h3>
          
          <div className="movie-meta">
            <span className="meta-item">{movie.year}</span>
            <span className="meta-item">{movie.duration}</span>
            <span className="genre">{movie.category}</span>
          </div>

          <p className="movie-description">{movie.description}</p>

          {isFeatured && (
            <>
              <div className="movie-meta">
                <span className="meta-item">Director: {movie.director}</span>
                <span className="meta-item">Cast: {movie.cast}</span>
              </div>
              {movie.awards && (
                <div className="awards-tag">
                  <FaTrophy /> {movie.awards}
                </div>
              )}
            </>
          )}
        </div>

        <div className="movie-actions">
          <button
            className={`action-button favorite ${isFavorite ? 'active' : ''}`}
            onClick={handleFavoriteClick}
            aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          >
            <FaHeart />
            {isFavorite ? 'Favorited' : 'Favorite'}
          </button>
          <button 
            className="action-button share" 
            onClick={handleShare}
            aria-label="Share movie"
          >
            <FaShare />
            Share
          </button>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
