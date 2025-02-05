import React, { useState, useEffect, useRef } from 'react';
import { FaSearch, FaFire, FaStar, FaClock, FaThList, FaTh } from 'react-icons/fa';
import MovieCard from '../components/MovieCard';
import '../styles/Movies.css';

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('popularity');
  const [viewMode, setViewMode] = useState('grid');
  const [favorites, setFavorites] = useState([]);
  const [featuredMovie, setFeaturedMovie] = useState(null);
  const [searchFocused, setSearchFocused] = useState(false);
  const searchTimeout = useRef(null);

  const sampleMovies = [
    {
      id: 1,
      title: "Inception",
      category: "sci-fi",
      rating: 4.8,
      year: 2010,
      duration: "2h 28m",
      poster: "https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg",
      backdrop: "https://image.tmdb.org/t/p/original/s3TBrRGB1iav7gFOCNx3H31MoES.jpg",
      description: "A thief who steals corporate secrets through dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
      popularity: 98,
      trending: true,
      awards: "4 Academy Awards",
      cast: "Leonardo DiCaprio, Joseph Gordon-Levitt, Ellen Page",
      director: "Christopher Nolan"
    },
    {
      id: 2,
      title: "The Dark Knight",
      category: "action",
      rating: 4.9,
      year: 2008,
      duration: "2h 32m",
      poster: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
      backdrop: "https://image.tmdb.org/t/p/original/hkBaDkMWbLaf8B1lsWsKX7Ew3Xq.jpg",
      description: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
      popularity: 99,
      trending: true,
      awards: "2 Academy Awards",
      cast: "Christian Bale, Heath Ledger, Aaron Eckhart",
      director: "Christopher Nolan"
    },
    {
      id: 3,
      title: "Interstellar",
      category: "sci-fi",
      rating: 4.7,
      year: 2014,
      duration: "2h 49m",
      poster: "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
      backdrop: "https://image.tmdb.org/t/p/original/rAiYTfKGqDCRIIqo664sY9XZIvQ.jpg",
      description: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
      popularity: 95,
      trending: false,
      awards: "1 Academy Award",
      cast: "Matthew McConaughey, Anne Hathaway, Jessica Chastain",
      director: "Christopher Nolan"
    },
  ];

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        await new Promise(resolve => setTimeout(resolve, 1000));
        setMovies(sampleMovies);
        // Set a random movie as featured movie of the day
        setFeaturedMovie(sampleMovies[Math.floor(Math.random() * sampleMovies.length)]);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch movies');
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  useEffect(() => {
    if (searchTimeout.current) {
      clearTimeout(searchTimeout.current);
    }

    searchTimeout.current = setTimeout(() => {
      const results = sampleMovies.filter(movie => 
        movie.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        movie.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        movie.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setMovies(results);
    }, 300);

    return () => {
      if (searchTimeout.current) {
        clearTimeout(searchTimeout.current);
      }
    };
  }, [searchQuery]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleFavorite = (movieId) => {
    setFavorites(prev => 
      prev.includes(movieId)
        ? prev.filter(id => id !== movieId)
        : [...prev, movieId]
    );
  };

  const filteredMovies = movies
    .filter(movie => {
      const matchesSearch = movie.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          movie.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          movie.category.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || movie.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return b.rating - a.rating;
        case 'year':
          return b.year - a.year;
        case 'popularity':
        default:
          return b.popularity - a.popularity;
      }
    });

  const getSearchHighlight = (text, searchTerm) => {
    if (!searchTerm) return text;
    const regex = new RegExp(`(${searchTerm})`, 'gi');
    return text.replace(regex, '<mark>$1</mark>');
  };

  if (loading) {
    return (
      <div className="movies-container loading">
        <div className="cyber-loader">
          <div className="cyber-loader-circle"></div>
          <div className="cyber-loader-line"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="movies-container error">
        <h2>Error</h2>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="movies-container">
      <div className="epic-header">
        <div className="search-section">
          <div className={`search-container ${searchFocused ? 'focused' : ''}`}>
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search movies by title, description, or category..."
              value={searchQuery}
              onChange={handleSearch}
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
              className="search-input"
            />
          </div>
          <div className="view-controls">
            <button 
              className={`view-button ${viewMode === 'grid' ? 'active' : ''}`}
              onClick={() => setViewMode('grid')}
            >
              <FaTh />
            </button>
            <button 
              className={`view-button ${viewMode === 'list' ? 'active' : ''}`}
              onClick={() => setViewMode('list')}
            >
              <FaThList />
            </button>
          </div>
        </div>
        
        <div className="filter-tags">
          <button className="filter-button">
            <FaFire /> Filter
          </button>
          <div className="active-filters">
            {searchQuery && (
              <span className="filter-tag">
                Search: {searchQuery}
                <button onClick={() => setSearchQuery('')}>×</button>
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="featured-section">
        {!searchQuery && <MovieCard 
          movie={featuredMovie} 
          isFeatured={true}
          onFavorite={handleFavorite}
          isFavorite={favorites.includes(featuredMovie.id)}
        />}
      </div>

      <div className={`movies-grid ${viewMode}`}>
        {filteredMovies
          .filter(movie => movie.id !== featuredMovie?.id)
          .map(movie => (
            <div 
              key={movie.id} 
              className={`movie-grid-item ${
                searchQuery && 
                movie.title.toLowerCase().includes(searchQuery.toLowerCase()) 
                  ? 'search-match' 
                  : ''
              }`}
            >
              <MovieCard
                movie={{
                  ...movie,
                  title: searchQuery 
                    ? <span dangerouslySetInnerHTML={{ 
                        __html: getSearchHighlight(movie.title, searchQuery) 
                      }} />
                    : movie.title,
                  description: searchQuery
                    ? <span dangerouslySetInnerHTML={{ 
                        __html: getSearchHighlight(movie.description, searchQuery) 
                      }} />
                    : movie.description
                }}
                onFavorite={handleFavorite}
                isFavorite={favorites.includes(movie.id)}
              />
            </div>
          ))}
      </div>

      <div className="stats-footer">
        <div className="stat-item">
          <FaFire className="stat-icon" />
          {filteredMovies.length} Movies
        </div>
        <div className="stat-item">
          <FaStar className="stat-icon" />
          {filteredMovies.length > 0 
            ? (filteredMovies.reduce((acc, movie) => acc + movie.rating, 0) / filteredMovies.length).toFixed(1) 
            : '0.0'} Avg Rating
        </div>
        <div className="stat-item">
          <FaClock className="stat-icon" />
          {favorites.length} Favorites
        </div>
      </div>
    </div>
  );
};

export default Movies;
