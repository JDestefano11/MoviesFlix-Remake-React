import React, { useState } from 'react';
import { FaStar, FaHeart, FaShare, FaTrophy, FaFire } from 'react-icons/fa';
import MovieDetailsModal from './MovieDetailsModal';
import { useFavorites } from '../context/FavoritesContext';
import '../styles/MovieCard.css';

const MovieCard = ({ movie, isFeatured = false }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const { toggleFavorite, isFavorite } = useFavorites();

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

  const handleShare = (e) => {
    e.stopPropagation();
    // In a real app, implement social sharing functionality
    alert(`Sharing ${movie.title}!`);
  };

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    toggleFavorite(movie);
    // Add a small vibration if the device supports it
    if (window.navigator && window.navigator.vibrate) {
      window.navigator.vibrate(50);
    }
  };

  const handleCardClick = () => {
    setShowDetails(true);
  };

  return (
    <>
      <div className={`movie-card ${isFeatured ? 'featured' : ''}`} onClick={handleCardClick}>
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
              className={`action-button favorite ${isFavorite(movie.id) ? 'active' : ''}`}
              onClick={handleFavoriteClick}
              aria-label={isFavorite(movie.id) ? 'Remove from favorites' : 'Add to favorites'}
            >
              <FaHeart />
              {isFavorite(movie.id) ? 'Favorited' : 'Favorite'}
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

      <MovieDetailsModal
        movie={movie}
        isOpen={showDetails}
        onClose={() => setShowDetails(false)}
        isFavorite={isFavorite(movie.id)}
        onFavorite={toggleFavorite}
      />
    </>
  );
};

export default MovieCard;
