import React, { useState, useEffect, useMemo } from 'react';
import MovieCard from '../components/MovieCard';
import MovieDetailsModal from '../components/MovieDetailsModal';
import { FaSearch, FaTh, FaList, FaFilter, FaClock, FaFilm, FaHeart, FaFire } from 'react-icons/fa';
import { BsGrid, BsList } from 'react-icons/bs';
import { useFavorites } from '../context/FavoritesContext';
import '../styles/Movies.css';

const MOCK_MOVIES = [
  {
    id: 1,
    title: "Inception",
    poster: "https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg",
    rating: 8.8,
    year: "2010",
    duration: "2h 28min",
    category: "Sci-Fi/Action",
    description: "Dom Cobb is a skilled thief, the absolute best in the dangerous art of extraction, stealing valuable secrets from deep within the subconscious during the dream state.",
    director: "Christopher Nolan",
    cast: "Leonardo DiCaprio, Joseph Gordon-Levitt, Ellen Page",
    awards: "4 Academy Awards",
    trending: true,
    genres: ["Action", "Sci-Fi", "Thriller"],
    trailer: "https://www.youtube.com/embed/YoHD9XEInc0"
  },
  {
    id: 2,
    title: "The Dark Knight",
    poster: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
    rating: 9.0,
    year: "2008",
    duration: "2h 32min",
    category: "Action/Crime",
    description: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
    director: "Christopher Nolan",
    cast: "Christian Bale, Heath Ledger, Aaron Eckhart",
    awards: "2 Academy Awards",
    trending: true,
    genres: ["Action", "Crime", "Drama"],
    trailer: "https://www.youtube.com/embed/EXeTwQWrcwY"
  },
  {
    id: 3,
    title: "Interstellar",
    poster: "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
    rating: 8.6,
    year: "2014",
    duration: "2h 49min",
    category: "Sci-Fi/Adventure",
    description: "In Earth's future, a global crop blight and second Dust Bowl are slowly rendering the planet uninhabitable. Professor Brand works on plans to save mankind by transporting Earth's population to a new home.",
    director: "Christopher Nolan",
    cast: "Matthew McConaughey, Anne Hathaway, Jessica Chastain",
    awards: "Academy Award for Best Visual Effects",
    trending: false,
    genres: ["Adventure", "Drama", "Sci-Fi"],
    trailer: "https://www.youtube.com/embed/zSWdZVtXT7E"
  },
  {
    id: 4,
    title: "The Matrix",
    poster: "https://image.tmdb.org/t/p/w500/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg",
    rating: 8.7,
    year: "1999",
    duration: "2h 16min",
    category: "Sci-Fi/Action",
    description: "When a beautiful stranger leads computer hacker Neo to a forbidding underworld, he discovers the shocking truth--the life he knows is the elaborate deception of an evil cyber-intelligence.",
    director: "The Wachowskis",
    cast: "Keanu Reeves, Laurence Fishburne, Carrie-Anne Moss",
    awards: "4 Academy Awards",
    trending: false,
    genres: ["Action", "Sci-Fi"],
    trailer: "https://www.youtube.com/embed/vKQi3bBA1y8"
  },
  {
    id: 5,
    title: "Pulp Fiction",
    poster: "https://image.tmdb.org/t/p/w500/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg",
    rating: 8.9,
    year: "1994",
    duration: "2h 34min",
    category: "Crime/Drama",
    description: "The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.",
    director: "Quentin Tarantino",
    cast: "John Travolta, Samuel L. Jackson, Uma Thurman",
    awards: "Academy Award for Best Original Screenplay",
    trending: false,
    genres: ["Crime", "Drama"],
    trailer: "https://www.youtube.com/embed/s7EdQ4FqbhY"
  },
  {
    id: 6,
    title: "Avatar",
    poster: "https://image.tmdb.org/t/p/w500/kyeqWdyUXW608qlYkRqosgbbJyK.jpg",
    rating: 7.8,
    year: "2009",
    duration: "2h 42min",
    category: "Sci-Fi/Adventure",
    description: "A paraplegic Marine dispatched to the moon Pandora becomes torn between following orders and protecting an alien civilization.",
    director: "James Cameron",
    cast: "Sam Worthington, Zoe Saldana, Sigourney Weaver",
    awards: "3 Academy Awards",
    trending: true,
    genres: ["Action", "Adventure", "Fantasy", "Sci-Fi"],
    trailer: "https://www.youtube.com/embed/5PSNL1qE6VY"
  },
  {
    id: 7,
    title: "The Shawshank Redemption",
    poster: "https://image.tmdb.org/t/p/w500/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg",
    rating: 9.3,
    year: "1994",
    duration: "2h 22min",
    category: "Drama",
    description: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
    director: "Frank Darabont",
    cast: "Tim Robbins, Morgan Freeman",
    awards: "7 Academy Award Nominations",
    trending: false,
    genres: ["Drama"],
    trailer: "https://www.youtube.com/embed/6hB3S9bIaco"
  },
  {
    id: 8,
    title: "The Godfather",
    poster: "https://image.tmdb.org/t/p/w500/3bhkrj58Vtu7enYsRolD1fZdja1.jpg",
    rating: 9.2,
    year: "1972",
    duration: "2h 55min",
    category: "Crime/Drama",
    description: "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.",
    director: "Francis Ford Coppola",
    cast: "Marlon Brando, Al Pacino",
    awards: "3 Academy Awards",
    trending: false,
    genres: ["Crime", "Drama"],
    trailer: "https://www.youtube.com/embed/sY1sY6Ji0lo"
  },
  {
    id: 9,
    title: "Fight Club",
    poster: "https://image.tmdb.org/t/p/w500/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg",
    rating: 8.8,
    year: "1999",
    duration: "2h 19min",
    category: "Drama/Thriller",
    description: "An insomniac office worker and a devil-may-care soapmaker form an underground fight club that evolves into something much, much more.",
    director: "David Fincher",
    cast: "Brad Pitt, Edward Norton",
    awards: "Academy Award Nomination",
    trending: false,
    genres: ["Drama", "Thriller"],
    trailer: "https://www.youtube.com/embed/qtRKdVHc-cQ"
  },
  {
    id: 10,
    title: "Forrest Gump",
    poster: "https://image.tmdb.org/t/p/w500/saHP97rTPS5eLmrLQEcANmKrsFl.jpg",
    rating: 8.8,
    year: "1994",
    duration: "2h 22min",
    category: "Drama/Romance",
    description: "The presidencies of Kennedy and Johnson, the Vietnam War, the Watergate scandal and other historical events unfold from the perspective of an Alabama man with an IQ of 75.",
    director: "Robert Zemeckis",
    cast: "Tom Hanks, Robin Wright",
    awards: "6 Academy Awards",
    trending: false,
    genres: ["Drama", "Romance"],
    trailer: "https://www.youtube.com/embed/uPIEn0M8su0"
  },
  {
    id: 11,
    title: "Goodfellas",
    poster: "https://image.tmdb.org/t/p/w500/aKuFiU82s5ISJpGZp7YkIr3kCUd.jpg",
    rating: 8.7,
    year: "1990",
    duration: "2h 26min",
    category: "Crime/Drama",
    description: "The story of Henry Hill and his life in the mob, covering his relationship with his wife Karen Hill and his mob partners Jimmy Conway and Tommy DeVito.",
    director: "Martin Scorsese",
    cast: "Robert De Niro, Ray Liotta",
    awards: "Academy Award for Best Supporting Actor",
    trending: false,
    genres: ["Crime", "Drama"],
    trailer: "https://www.youtube.com/embed/qDp3RqjJn9s"
  },
  {
    id: 12,
    title: "The Silence of the Lambs",
    poster: "https://image.tmdb.org/t/p/w500/rplLJ2hPcOQmkFhTqUte0MkEaO2.jpg",
    rating: 8.6,
    year: "1991",
    duration: "1h 58min",
    category: "Crime/Thriller",
    description: "A young F.B.I. cadet must receive the help of an incarcerated and manipulative cannibal killer to help catch another serial killer.",
    director: "Jonathan Demme",
    cast: "Jodie Foster, Anthony Hopkins",
    awards: "5 Academy Awards",
    trending: false,
    genres: ["Crime", "Thriller"],
    trailer: "https://www.youtube.com/embed/W6Mm8Sbe__o"
  },
  {
    id: 13,
    title: "Gladiator",
    poster: "https://image.tmdb.org/t/p/w500/ehGpN04mLJIrSnxcZBMvHeG0eDc.jpg",
    rating: 8.5,
    year: "2000",
    duration: "2h 35min",
    category: "Action/Drama",
    description: "A former Roman General sets out to exact vengeance against the corrupt emperor who murdered his family and sent him into slavery.",
    director: "Ridley Scott",
    cast: "Russell Crowe, Joaquin Phoenix",
    awards: "5 Academy Awards",
    trending: true,
    genres: ["Action", "Drama"],
    trailer: "https://www.youtube.com/embed/owK1qxDselE"
  },
  {
    id: 14,
    title: "The Lord of the Rings: The Fellowship of the Ring",
    poster: "https://image.tmdb.org/t/p/w500/6oom5QYQ2yQTMJIbnvbkBL9cHo6.jpg",
    rating: 8.8,
    year: "2001",
    duration: "2h 58min",
    category: "Fantasy/Adventure",
    description: "A meek Hobbit from the Shire and eight companions set out on a journey to destroy the powerful One Ring and save Middle-earth from the Dark Lord Sauron.",
    director: "Peter Jackson",
    cast: "Elijah Wood, Ian McKellen",
    awards: "4 Academy Awards",
    trending: true,
    genres: ["Adventure", "Fantasy"],
    trailer: "https://www.youtube.com/embed/V75dMMIWJ2s"
  },
  {
    id: 15,
    title: "Jurassic Park",
    poster: "https://image.tmdb.org/t/p/w500/oU7Oq2kFAAlGqbU4VoAE36g4hoI.jpg",
    rating: 8.1,
    year: "1993",
    duration: "2h 7min",
    category: "Sci-Fi/Adventure",
    description: "A pragmatic paleontologist visiting an almost complete theme park is tasked with protecting a couple of kids after a power failure causes the park's cloned dinosaurs to run loose.",
    director: "Steven Spielberg",
    cast: "Sam Neill, Laura Dern",
    awards: "3 Academy Awards",
    trending: false,
    genres: ["Adventure", "Sci-Fi"],
    trailer: "https://www.youtube.com/embed/lc0UehYemQA"
  }
];

const Movies = () => {
  const [movies, setMovies] = useState(MOCK_MOVIES);
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState(() => {
    return localStorage.getItem('viewMode') || 'grid';
  });
  const { favorites, toggleFavorite, isFavorite } = useFavorites();
  const [searchFocused, setSearchFocused] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [featuredMovie, setFeaturedMovie] = useState(null);
  const [timeRemaining, setTimeRemaining] = useState('');
  const [selectedMovie, setSelectedMovie] = useState(null);

  const ViewControls = () => {
    return (
      <div className="view-controls">
        <button
          className={`view-button ${viewMode === 'grid' ? 'active' : ''}`}
          onClick={() => setViewMode('grid')}
          aria-label="Grid View"
        >
          <BsGrid />
        </button>
        <button
          className={`view-button ${viewMode === 'list' ? 'active' : ''}`}
          onClick={() => setViewMode('list')}
          aria-label="List View"
        >
          <BsList />
        </button>
      </div>
    );
  };

  // Initialize featured movie on mount
  useEffect(() => {
    initializeFeaturedMovie();
  }, []);

  const initializeFeaturedMovie = () => {
    const now = new Date().getTime();
    const savedFeaturedMovie = localStorage.getItem('featuredMovie');
    const savedTimestamp = localStorage.getItem('featuredMovieTimestamp');

    if (savedFeaturedMovie && savedTimestamp) {
      const timestamp = parseInt(savedTimestamp);
      if (now - timestamp < 24 * 60 * 60 * 1000) {
        const savedMovie = JSON.parse(savedFeaturedMovie);
        // Get fresh movie data from MOCK_MOVIES
        const currentMovie = MOCK_MOVIES.find(m => m.id === savedMovie.id);
        if (currentMovie) {
          setFeaturedMovie(currentMovie);
        } else {
          setNewFeaturedMovie();
        }
      } else {
        setNewFeaturedMovie();
      }
    } else {
      setNewFeaturedMovie();
    }
  };

  // Update timer every minute
  useEffect(() => {
    const updateTimer = () => {
      const now = new Date().getTime();
      const savedTimestamp = localStorage.getItem('featuredMovieTimestamp');
      
      if (savedTimestamp) {
        const timestamp = parseInt(savedTimestamp);
        const timeLeft = 24 * 60 * 60 * 1000 - (now - timestamp);
        
        if (timeLeft <= 0) {
          initializeFeaturedMovie();
        } else {
          const hours = Math.floor(timeLeft / (60 * 60 * 1000));
          const minutes = Math.floor((timeLeft % (60 * 60 * 1000)) / (60 * 1000));
          setTimeRemaining(`${hours}h ${minutes}m`);
        }
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 60000);
    return () => clearInterval(interval);
  }, []);

  // Save view mode to localStorage
  useEffect(() => {
    localStorage.setItem('viewMode', viewMode);
  }, [viewMode]);

  const setNewFeaturedMovie = () => {
    const trendingMovies = MOCK_MOVIES.filter(movie => movie.trending);
    const randomMovie = trendingMovies[Math.floor(Math.random() * trendingMovies.length)];
    setFeaturedMovie(randomMovie);
    localStorage.setItem('featuredMovie', JSON.stringify(randomMovie));
    localStorage.setItem('featuredMovieTimestamp', new Date().getTime().toString());
  };

  // Get unique genres
  const GENRES = useMemo(() => 
    [...new Set(MOCK_MOVIES.map(movie => movie.category))].sort(),
    []
  );

  const filteredMovies = useMemo(() => 
    movies.filter(movie => {
      const searchMatch = movie.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         movie.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         movie.category.toLowerCase().includes(searchTerm.toLowerCase());
      const genreMatch = selectedGenre === 'All' || movie.category === selectedGenre;
      return searchMatch && genreMatch;
    }),
    [movies, searchTerm, selectedGenre]
  );

  // Add event listener for opening movie modals
  useEffect(() => {
    const handleOpenMovieModal = (event) => {
      setSelectedMovie(event.detail.movie);
    };

    window.addEventListener('openMovieModal', handleOpenMovieModal);
    return () => window.removeEventListener('openMovieModal', handleOpenMovieModal);
  }, []);

  return (
    <div className="movies-container">
      <div className="search-section">
        <div className="search-controls">
          <div className="search-bar">
            <FaSearch className="search-icon" />
            <input
              type="text"
              className="search-input"
              placeholder="Search movies by title, description, or category..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
            />
          </div>
          <ViewControls />
        </div>
      </div>

      <div className="filter-section">
        <div className="genre-filters">
          <button
            className={`genre-button ${selectedGenre === 'All' ? 'active' : ''}`}
            onClick={() => setSelectedGenre('All')}
          >
            <FaFilm /> All Genres
          </button>
          {GENRES.map(genre => (
            <button
              key={genre}
              className={`genre-button ${selectedGenre === genre ? 'active' : ''}`}
              onClick={(e) => {
                // If clicking the X button (right side of active button), reset to All
                if (selectedGenre === genre && 
                    e.clientX > e.target.getBoundingClientRect().right - 40) {
                  setSelectedGenre('All');
                } else {
                  setSelectedGenre(genre);
                }
              }}
            >
              {genre}
            </button>
          ))}
        </div>
        <div className="active-filters">
          {searchTerm && (
            <div className="filter-tag">
              <span className="filter-tag-text">
                Search: {searchTerm}
              </span>
              <button className="filter-tag-close" onClick={() => setSearchTerm('')}>
                <svg viewBox="0 0 20 20" fill="currentColor" className="close-icon">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>

      {featuredMovie && !searchTerm && selectedGenre === 'All' && (
        <div className="featured-movie-section">
          <div className="featured-header">
            <h2>Movie of the Day</h2>
            <div className="featured-timer">
              <FaClock /> Changes in: {timeRemaining}
            </div>
          </div>
          <MovieCard movie={featuredMovie} isFeatured={true} allMovies={movies} />
        </div>
      )}

      <div className={`movies-grid ${viewMode}`}>
        {filteredMovies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} allMovies={movies} />
        ))}
      </div>

      {selectedMovie && (
        <MovieDetailsModal
          movie={selectedMovie}
          isOpen={!!selectedMovie}
          onClose={() => setSelectedMovie(null)}
          allMovies={movies}
        />
      )}

      <div className="stats-footer">
        <div className="stats-content">
          <div className="stats-group">
            <div className="stat-item">
              <FaFilm />
              <span>Total Movies: <span className="stat-value">{movies.length}</span></span>
            </div>
            <div className="stat-item">
              <FaHeart />
              <span>Favorites: <span className="stat-value">{favorites.length}</span></span>
            </div>
          </div>
          <div className="stats-group">
            <div className="stat-item">
              <FaFire />
              <span>Trending: <span className="stat-value">{movies.filter(m => m.trending).length}</span></span>
            </div>
            <div className="stat-item">
              <FaClock />
              <span>Featured Refresh: <span className="stat-value">{timeRemaining}</span></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Movies;
