import React, { useState, useEffect, useMemo } from 'react';
import MovieCard from '../components/MovieCard';
import MovieDetailsModal from '../components/MovieDetailsModal';
import { FaSearch, FaFilm, FaHeart, FaFire } from 'react-icons/fa';
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
  const [selectedMovie, setSelectedMovie] = useState(null);

  const handleMovieClick = (movie) => {
    setSelectedMovie(movie);
  };

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

  // Get unique genres
  const genres = useMemo(() => {
    const allGenres = movies.map(movie => movie.category);
    return ['All', ...new Set(allGenres)];
  }, [movies]);

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

  const handleSearchSubmit = (e) => {
    if (e.key === 'Enter' || e.type === 'click') {
      setSearchFocused(false);
    }
  };

  const StatsFooter = () => {
    const trendingCount = useMemo(() => 
      movies.filter(m => m.trending).length,
      [movies]
    );

    const currentGenreCount = filteredMovies.length;
    const totalMovies = movies.length;
    const favoritesCount = favorites.length;

    return (
      <div className="stats-footer">
        <div className="stats-content">
          <div className="stats-group">
            <div className="stat-item">
              <FaFilm />
              <div className="stat-info">
                <span className="stat-label">Movies</span>
                <span className="stat-value">
                  {currentGenreCount}
                  {selectedGenre !== 'All' && (
                    <span className="stat-total">/{totalMovies}</span>
                  )}
                </span>
              </div>
            </div>
            <div className="stat-item">
              <FaHeart />
              <div className="stat-info">
                <span className="stat-label">Favorites</span>
                <span className="stat-value">{favoritesCount}</span>
              </div>
            </div>
            <div className="stat-item">
              <FaFire />
              <div className="stat-info">
                <span className="stat-label">Trending</span>
                <span className="stat-value">{trendingCount}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="movies-container">
      <div className="movies-header">
        <div className="search-section">
          <div className="search-container">
            <div className="search-wrapper">
              <input
                type="text"
                placeholder="Search movies..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={handleSearchSubmit}
                onFocus={() => setSearchFocused(true)}
                className={searchFocused ? 'focused' : ''}
              />
              <button className="search-button" onClick={handleSearchSubmit}>
                <FaSearch />
              </button>
            </div>
            <ViewControls />
          </div>
        </div>
        <div className="genre-pills">
          {genres.map(genre => (
            <button
              key={genre}
              className={`genre-pill ${selectedGenre === genre ? 'active' : ''}`}
              onClick={() => setSelectedGenre(genre)}
            >
              {genre}
            </button>
          ))}
        </div>
      </div>

      <div className={`movies-grid ${viewMode}`}>
        {filteredMovies.map(movie => (
          <MovieCard
            key={movie.id}
            movie={movie}
            viewMode={viewMode}
            isFavorite={isFavorite(movie.id)}
            onFavoriteClick={() => toggleFavorite(movie)}
            onMovieClick={handleMovieClick}
          />
        ))}
      </div>

      <StatsFooter />

      <MovieDetailsModal
        movie={selectedMovie}
        isOpen={!!selectedMovie}
        onClose={() => setSelectedMovie(null)}
        isFavorite={isFavorite(selectedMovie?.id)}
        onFavoriteClick={() => selectedMovie && toggleFavorite(selectedMovie)}
        allMovies={movies}
      />
    </div>
  );
};

export default Movies;
