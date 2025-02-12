import React, { useState, useEffect } from 'react';
import { FaTimes, FaStar, FaHeart } from 'react-icons/fa';
import '../styles/MovieDetailsModal.css';

const MovieDetailsModal = ({ movie, isOpen, onClose, isFavorite, onFavoriteClick, allMovies }) => {
  const [similarMovies, setSimilarMovies] = useState([]);

  useEffect(() => {
    if (movie && isOpen && allMovies) {
      // Get similar movies based on shared genres
      const similar = allMovies
        .filter(m => 
          m.id !== movie.id && // Don't include the current movie
          m.genres.some(genre => movie.genres.includes(genre)) // Must share at least one genre
        )
        .slice(0, 4); // Limit to 4 similar movies
      setSimilarMovies(similar);
    }
  }, [movie, isOpen, allMovies]);

  if (!isOpen || !movie) return null;

  const handleSimilarMovieClick = (similarMovie) => {
    onClose();
    // Re-open with new movie after a short delay
    setTimeout(() => {
      const modalEvent = new CustomEvent('openMovieModal', { 
        detail: { movie: similarMovie }
      });
      window.dispatchEvent(modalEvent);
    }, 100);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="close-button" onClick={onClose} aria-label="Close modal">
          <FaTimes />
        </button>

        <div className="modal-header">
          <img 
            src={movie.poster} 
            alt={movie.title} 
            className="modal-poster"
          />
          <div className="modal-header-content">
            <h2>{movie.title}</h2>
            <div className="modal-meta">
              <span className="rating">
                <FaStar /> {movie.rating}/10
              </span>
              <span>{movie.year}</span>
              <span>{movie.duration}</span>
              <span>{movie.category}</span>
            </div>
            <button 
              className={`favorite-btn ${isFavorite ? 'active' : ''}`}
              onClick={(e) => {
                e.stopPropagation();
                onFavoriteClick();
              }}
            >
              <FaHeart />
              {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
            </button>
            {movie.trailer && (
              <div className="modal-trailer">
                <iframe
                  width="100%"
                  height="315"
                  src={movie.trailer}
                  title={`${movie.title} Trailer`}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            )}
          </div>
        </div>

        <div className="modal-body">
          <p className="synopsis">{movie.description}</p>
          <div className="movie-details">
            {movie.director && (
              <div className="detail-item">
                <strong>Director:</strong> {movie.director}
              </div>
            )}
            {movie.cast && (
              <div className="detail-item">
                <strong>Cast:</strong> {movie.cast}
              </div>
            )}
            {movie.awards && (
              <div className="detail-item">
                <strong>Awards:</strong> {movie.awards}
              </div>
            )}
          </div>

          {similarMovies.length > 0 && (
            <div className="similar-movies">
              <h3>Similar Movies</h3>
              <div className="similar-movies-grid">
                {similarMovies.map(similarMovie => (
                  <div
                    key={similarMovie.id}
                    className="similar-movie-card"
                    onClick={() => handleSimilarMovieClick(similarMovie)}
                  >
                    <img src={similarMovie.poster} alt={similarMovie.title} />
                    <div className="similar-movie-info">
                      <h4>{similarMovie.title}</h4>
                      <span className="rating">
                        <FaStar /> {similarMovie.rating}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieDetailsModal;
