import React, { useState, useEffect } from 'react';
import { MovieCard } from '../components/MovieCard';
import '../styles/Movies.css';

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // For development, using sample data
    const sampleMovies = [
      {
        _id: '1',
        Title: 'Inception',
        ImagePath: 'https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg',
        Description: 'A thief who steals corporate secrets through dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.',
        Genre: {
          Name: 'Sci-Fi',
          Description: 'Science Fiction'
        },
        Director: {
          Name: 'Christopher Nolan',
          Bio: 'British-American film director'
        }
      },
      {
        _id: '2',
        Title: 'The Dark Knight',
        ImagePath: 'https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg',
        Description: 'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.',
        Genre: {
          Name: 'Action',
          Description: 'Action movies'
        },
        Director: {
          Name: 'Christopher Nolan',
          Bio: 'British-American film director'
        }
      },
      {
        _id: '3',
        Title: 'Interstellar',
        ImagePath: 'https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg',
        Description: 'A team of explorers travel through a wormhole in space in an attempt to ensure humanity\'s survival.',
        Genre: {
          Name: 'Sci-Fi',
          Description: 'Science Fiction'
        },
        Director: {
          Name: 'Christopher Nolan',
          Bio: 'British-American film director'
        }
      },
      // Add more sample movies as needed
    ];

    // Simulate API call
    setTimeout(() => {
      setMovies(sampleMovies);
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return (
      <div className="movies-container loading">
        <div className="loader"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="movies-container error">
        <h2>Error loading movies</h2>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="movies-container">
      <h1>Discover Movies</h1>
      <div className="movies-grid">
        {movies.map((movie) => (
          <div key={movie._id} className="movie-grid-item">
            <MovieCard movie={movie} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Movies;
