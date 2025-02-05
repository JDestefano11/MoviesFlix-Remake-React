import React, { useState, useEffect } from 'react';
import { FaTimes, FaStar, FaHeart } from 'react-icons/fa';
import { useFavorites } from '../context/FavoritesContext';
import '../styles/MovieDetailsModal.css';

const MovieDetailsModal = ({ movie, isOpen, onClose, allMovies }) => {
  const { toggleFavorite, isFavorite } = useFavorites();
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

  const handleFavoriteClick = () => {
    toggleFavorite(movie);
  };

  const handleSimilarMovieClick = (similarMovie) => {
    // Close current modal and open new one with similar movie
    onClose();
    // Small delay to ensure smooth transition
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
        <button className="close-button" onClick={onClose}>
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
              className={`favorite-btn ${isFavorite(movie.id) ? 'active' : ''}`}
              onClick={handleFavoriteClick}
            >
              <FaHeart />
              {isFavorite(movie.id) ? 'Remove from Favorites' : 'Add to Favorites'}
            </button>
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
                    className="similar-movie"
                    onClick={() => handleSimilarMovieClick(similarMovie)}
                  >
                    <img 
                      src={similarMovie.poster} 
                      alt={similarMovie.title} 
                    />
                    <p>{similarMovie.title}</p>
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
