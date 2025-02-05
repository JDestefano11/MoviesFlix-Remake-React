import React from 'react';
import { FaHeart, FaShareAlt, FaStar, FaClock, FaFire } from 'react-icons/fa';
import '../styles/MovieCard.css';

const MovieCard = ({ movie, isFeatured = false, onFavorite, isFavorite }) => {
  const getAge = (year) => {
    const currentYear = new Date().getFullYear();
    return currentYear - year;
  };

  return (
    <div className={`movie-card ${isFeatured ? 'featured' : ''}`}>
      <div className="movie-poster">
        <img src={movie.poster} alt={movie.title} />
        {movie.rating >= 4.5 && (
          <div className="rating-badge">
            <FaStar />
            <span>{movie.rating}</span>
          </div>
        )}
        {isFeatured && (
          <div className="featured-badge">
            <FaFire /> Movie of the Day
          </div>
        )}
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
            <div className="meta-item">
              <FaClock />
              <span>{movie.duration}</span>
            </div>
            <div className="meta-item genre">
              {movie.category}
            </div>
            <div className="meta-item">
              {getAge(movie.year)} years ago
            </div>
          </div>

          <div className="movie-description">
            <p>{movie.description}</p>
          </div>

          {movie.awards && (
            <div className="awards-tag">
              🏆 {movie.awards}
            </div>
          )}

          {isFeatured && (
            <div className="featured-meta">
              <div className="cast">
                <strong>Cast:</strong> {movie.cast}
              </div>
              <div className="director">
                <strong>Director:</strong> {movie.director}
              </div>
            </div>
          )}
        </div>

        <div className="movie-actions">
          <button 
            className={`action-button favorite ${isFavorite ? 'active' : ''}`}
            onClick={() => onFavorite(movie.id)}
            aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          >
            <FaHeart />
            <span>{isFavorite ? 'Favorited' : 'Favorite'}</span>
          </button>
          <button 
            className="action-button share"
            aria-label="Share movie"
          >
            <FaShareAlt />
            <span>Share</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
