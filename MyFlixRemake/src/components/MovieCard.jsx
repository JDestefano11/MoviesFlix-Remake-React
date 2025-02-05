import React from 'react';
import '../styles/MovieCard.css';

export const MovieCard = ({ movie }) => {
  return (
    <div className="movie-card">
      <div className="movie-poster">
        <img src={movie.ImagePath} alt={`${movie.Title} poster`} />
        <div className="movie-overlay">
          <button className="favorite-button">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
            </svg>
          </button>
        </div>
      </div>
      <div className="movie-info">
        <h3>{movie.Title}</h3>
        <p className="movie-genre">{movie.Genre.Name}</p>
        <p className="movie-director">Director: {movie.Director.Name}</p>
      </div>
    </div>
  );
};
