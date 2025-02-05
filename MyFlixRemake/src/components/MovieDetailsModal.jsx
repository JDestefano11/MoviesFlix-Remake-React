import React from 'react';
import { FaTimes, FaStar, FaHeart } from 'react-icons/fa';
import { useFavorites } from '../context/FavoritesContext';
import '../styles/MovieDetailsModal.css';

const MovieDetailsModal = ({ movie, isOpen, onClose }) => {
  const { toggleFavorite, isFavorite } = useFavorites();
  
  if (!isOpen || !movie) return null;

  const handleFavoriteClick = () => {
    toggleFavorite(movie);
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
        </div>
      </div>
    </div>
  );
};

export default MovieDetailsModal;
