import React, { useState, useEffect, useMemo } from 'react';
import MovieCard from '../components/MovieCard';
import { FaSearch, FaTh, FaList, FaFilter, FaClock, FaFilm, FaHeart } from 'react-icons/fa';
import '../styles/Movies.css';

const MOCK_MOVIES = [
  {
    id: 1,
    title: "Inception",
    description: "A thief who steals corporate secrets through dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
    poster: "https://image.tmdb.org/t/p/original/8IB2e4r4oVhHnANbnm7O3Tj6tF8.jpg",
    category: "Sci-Fi",
    duration: "2h 28min",
    year: 2010,
    rating: 4.8,
    director: "Christopher Nolan",
    cast: "Leonardo DiCaprio, Joseph Gordon-Levitt",
    awards: "4 Academy Awards",
    trending: true
  },
  {
    id: 2,
    title: "The Dark Knight",
    description: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological tests of his ability to fight injustice.",
    poster: "https://image.tmdb.org/t/p/original/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
    category: "Action",
    duration: "2h 32min",
    year: 2008,
    rating: 4.9,
    director: "Christopher Nolan",
    cast: "Christian Bale, Heath Ledger",
    awards: "2 Academy Awards",
    trending: true
  },
  {
    id: 3,
    title: "Pulp Fiction",
    description: "The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.",
    poster: "https://image.tmdb.org/t/p/original/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg",
    category: "Crime",
    duration: "2h 34min",
    year: 1994,
    rating: 4.8,
    director: "Quentin Tarantino",
    cast: "John Travolta, Uma Thurman",
    awards: "1 Academy Award",
    trending: false
  },
  {
    id: 4,
    title: "The Shawshank Redemption",
    description: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
    poster: "https://image.tmdb.org/t/p/original/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg",
    category: "Drama",
    duration: "2h 22min",
    year: 1994,
    rating: 4.9,
    director: "Frank Darabont",
    cast: "Tim Robbins, Morgan Freeman",
    awards: "7 Academy Award Nominations",
    trending: false
  },
  {
    id: 5,
    title: "Interstellar",
    description: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
    poster: "https://image.tmdb.org/t/p/original/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
    category: "Sci-Fi",
    duration: "2h 49min",
    year: 2014,
    rating: 4.7,
    director: "Christopher Nolan",
    cast: "Matthew McConaughey, Anne Hathaway",
    awards: "1 Academy Award",
    trending: true
  },
  {
    id: 6,
    title: "The Matrix",
    description: "A computer programmer discovers that reality as he knows it is a simulation created by machines, and joins a rebellion to break free.",
    poster: "https://image.tmdb.org/t/p/original/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg",
    category: "Sci-Fi",
    duration: "2h 16min",
    year: 1999,
    rating: 4.8,
    director: "The Wachowskis",
    cast: "Keanu Reeves, Laurence Fishburne",
    awards: "4 Academy Awards",
    trending: false
  },
  {
    id: 7,
    title: "Goodfellas",
    description: "The story of Henry Hill and his life in the mob, covering his relationship with his wife Karen Hill and his mob partners Jimmy Conway and Tommy DeVito.",
    poster: "https://image.tmdb.org/t/p/original/aKuFiU82s5ISJpGZp7YkIr3kCUd.jpg",
    category: "Crime",
    duration: "2h 25min",
    year: 1990,
    rating: 4.7,
    director: "Martin Scorsese",
    cast: "Robert De Niro, Ray Liotta",
    awards: "1 Academy Award",
    trending: false
  },
  {
    id: 8,
    title: "The Lord of the Rings: The Fellowship of the Ring",
    description: "A meek Hobbit from the Shire and eight companions set out on a journey to destroy the powerful One Ring and save Middle-earth from the Dark Lord Sauron.",
    poster: "https://image.tmdb.org/t/p/original/6oom5QYQ2yQTMJIbnvbkBL9cHo6.jpg",
    category: "Fantasy",
    duration: "2h 58min",
    year: 2001,
    rating: 4.8,
    director: "Peter Jackson",
    cast: "Elijah Wood, Ian McKellen",
    awards: "4 Academy Awards",
    trending: true
  },
  {
    id: 9,
    title: "Fight Club",
    description: "An insomniac office worker and a devil-may-care soapmaker form an underground fight club that evolves into something much, much more.",
    poster: "https://image.tmdb.org/t/p/original/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg",
    category: "Drama",
    duration: "2h 19min",
    year: 1999,
    rating: 4.8,
    director: "David Fincher",
    cast: "Brad Pitt, Edward Norton",
    awards: "Academy Award Nomination",
    trending: false
  },
  {
    id: 10,
    title: "Gladiator",
    description: "A former Roman General sets out to exact vengeance against the corrupt emperor who murdered his family and sent him into slavery.",
    poster: "https://image.tmdb.org/t/p/original/ehGpN04mLJIrSnxcZBMvHeG0eDc.jpg",
    category: "Action",
    duration: "2h 35min",
    year: 2000,
    rating: 4.7,
    director: "Ridley Scott",
    cast: "Russell Crowe, Joaquin Phoenix",
    awards: "5 Academy Awards",
    trending: false
  },
  {
    id: 11,
    title: "The Silence of the Lambs",
    description: "A young F.B.I. cadet must receive the help of an incarcerated and manipulative cannibal killer to help catch another serial killer.",
    poster: "https://image.tmdb.org/t/p/original/rplLJ2hPcOQmkFhTqUte0MkEaO2.jpg",
    category: "Thriller",
    duration: "1h 58min",
    year: 1991,
    rating: 4.8,
    director: "Jonathan Demme",
    cast: "Jodie Foster, Anthony Hopkins",
    awards: "5 Academy Awards",
    trending: false
  },
  {
    id: 12,
    title: "Jurassic Park",
    description: "A pragmatic paleontologist visiting an almost complete theme park is tasked with protecting a couple of kids after a power failure causes the park's cloned dinosaurs to run loose.",
    poster: "https://image.tmdb.org/t/p/original/9i3plLl89DHMz7mahksDaAo7HIS.jpg",
    category: "Adventure",
    duration: "2h 7min",
    year: 1993,
    rating: 4.7,
    director: "Steven Spielberg",
    cast: "Sam Neill, Laura Dern",
    awards: "3 Academy Awards",
    trending: true
  },
  {
    id: 13,
    title: "The Green Mile",
    description: "The lives of guards on Death Row are affected by one of their charges: a black man accused of child murder and rape, yet who has a mysterious gift.",
    poster: "https://image.tmdb.org/t/p/original/velWPhVMQeQKcxggNEU8YmIo52R.jpg",
    category: "Drama",
    duration: "3h 9min",
    year: 1999,
    rating: 4.8,
    director: "Frank Darabont",
    cast: "Tom Hanks, Michael Clarke Duncan",
    awards: "4 Academy Award Nominations",
    trending: false
  },
  {
    id: 14,
    title: "Alien",
    description: "After a space merchant vessel receives an unknown transmission as a distress call, one of the crew is attacked by a mysterious life form and they soon realize that its life cycle has merely begun.",
    poster: "https://image.tmdb.org/t/p/original/vfrQk5IPloGg1v9Rzbh2Eg3VGyM.jpg",
    category: "Sci-Fi",
    duration: "1h 57min",
    year: 1979,
    rating: 4.7,
    director: "Ridley Scott",
    cast: "Sigourney Weaver, Tom Skerritt",
    awards: "1 Academy Award",
    trending: false
  },
  {
    id: 15,
    title: "The Godfather",
    description: "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.",
    poster: "https://image.tmdb.org/t/p/original/3bhkrj58Vtu7enYsRolD1fZdja1.jpg",
    category: "Crime",
    duration: "2h 55min",
    year: 1972,
    rating: 4.9,
    director: "Francis Ford Coppola",
    cast: "Marlon Brando, Al Pacino",
    awards: "3 Academy Awards",
    trending: true
  },
  {
    id: 16,
    title: "Avatar",
    description: "A paraplegic Marine dispatched to the moon Pandora on a unique mission becomes torn between following his orders and protecting the world he feels is his home.",
    poster: "https://image.tmdb.org/t/p/original/jRXYjXNq0Cs2TcJjLkki24MLp7u.jpg",
    category: "Sci-Fi",
    duration: "2h 42min",
    year: 2009,
    rating: 4.7,
    director: "James Cameron",
    cast: "Sam Worthington, Zoe Saldana",
    awards: "3 Academy Awards",
    trending: true
  },
  {
    id: 17,
    title: "The Lion King",
    description: "Lion prince Simba and his father are targeted by his bitter uncle, who wants to ascend the throne himself.",
    poster: "https://image.tmdb.org/t/p/original/sKCr78MXSLixwmZ8DyJLrpMsd15.jpg",
    category: "Animation",
    duration: "1h 28min",
    year: 1994,
    rating: 4.8,
    director: "Roger Allers",
    cast: "Matthew Broderick, James Earl Jones",
    awards: "2 Academy Awards",
    trending: false
  },
  {
    id: 18,
    title: "Forrest Gump",
    description: "The presidencies of Kennedy and Johnson, the Vietnam War, the Watergate scandal and other historical events unfold from the perspective of an Alabama man with an IQ of 75.",
    poster: "https://image.tmdb.org/t/p/original/h5J4W4veyxMXDMjeNxZI46TsHOb.jpg",
    category: "Drama",
    duration: "2h 22min",
    year: 1994,
    rating: 4.8,
    director: "Robert Zemeckis",
    cast: "Tom Hanks, Robin Wright",
    awards: "6 Academy Awards",
    trending: true
  },
  {
    id: 19,
    title: "Back to the Future",
    description: "Marty McFly, a 17-year-old high school student, is accidentally sent thirty years into the past in a time-traveling DeLorean invented by his close friend, the eccentric scientist Doc Brown.",
    poster: "https://image.tmdb.org/t/p/original/7lyBcpYB0Qt8gYhXYaEZUNlNQAv.jpg",
    category: "Sci-Fi",
    duration: "1h 56min",
    year: 1985,
    rating: 4.8,
    director: "Robert Zemeckis",
    cast: "Michael J. Fox, Christopher Lloyd",
    awards: "1 Academy Award",
    trending: false
  },
  {
    id: 20,
    title: "The Avengers",
    description: "Earth's mightiest heroes must come together and learn to fight as a team if they are going to stop the mischievous Loki and his alien army from enslaving humanity.",
    poster: "https://image.tmdb.org/t/p/original/RYMX2wcKCBAr24UyPD7xwmjaTn.jpg",
    category: "Action",
    duration: "2h 23min",
    year: 2012,
    rating: 4.7,
    director: "Joss Whedon",
    cast: "Robert Downey Jr., Chris Evans",
    awards: "Academy Award Nomination",
    trending: true
  },
  {
    id: 21,
    title: "Spirited Away",
    description: "During her family's move to the suburbs, a sullen 10-year-old girl wanders into a world ruled by gods, witches, and spirits, where humans are changed into beasts.",
    poster: "https://image.tmdb.org/t/p/original/39wmItIWsg5sZMyRUHLkWBcuVCM.jpg",
    category: "Animation",
    duration: "2h 5min",
    year: 2001,
    rating: 4.9,
    director: "Hayao Miyazaki",
    cast: "Daveigh Chase, Suzanne Pleshette",
    awards: "Academy Award for Best Animated Feature",
    trending: false
  },
  {
    id: 22,
    title: "The Departed",
    description: "An undercover cop and a mole in the police attempt to identify each other while infiltrating an Irish gang in South Boston.",
    poster: "https://image.tmdb.org/t/p/original/nT97ifVT2J1yMQmeq20Qblg61T.jpg",
    category: "Crime",
    duration: "2h 31min",
    year: 2006,
    rating: 4.7,
    director: "Martin Scorsese",
    cast: "Leonardo DiCaprio, Matt Damon",
    awards: "4 Academy Awards",
    trending: false
  },
  {
    id: 23,
    title: "Whiplash",
    description: "A promising young drummer enrolls at a cut-throat music conservatory where his dreams of greatness are mentored by an instructor who will stop at nothing to realize a student's potential.",
    poster: "https://image.tmdb.org/t/p/original/6uSPcdGNA2A6vJmCagXkvnutegs.jpg",
    category: "Drama",
    duration: "1h 47min",
    year: 2014,
    rating: 4.8,
    director: "Damien Chazelle",
    cast: "Miles Teller, J.K. Simmons",
    awards: "3 Academy Awards",
    trending: true
  },
  {
    id: 24,
    title: "The Grand Budapest Hotel",
    description: "A writer encounters the owner of an aging high-class hotel, who tells him of his early years serving as a lobby boy in the hotel's glorious years under an exceptional concierge.",
    poster: "https://image.tmdb.org/t/p/original/eWdyYQreja6JGCzqHWXpWHDrrPo.jpg",
    category: "Comedy",
    duration: "1h 39min",
    year: 2014,
    rating: 4.7,
    director: "Wes Anderson",
    cast: "Ralph Fiennes, Tony Revolori",
    awards: "4 Academy Awards",
    trending: false
  },
  {
    id: 25,
    title: "Mad Max: Fury Road",
    description: "In a post-apocalyptic wasteland, a woman rebels against a tyrannical ruler in search for her homeland with the aid of a group of female prisoners, a psychotic worshiper, and a drifter named Max.",
    poster: "https://image.tmdb.org/t/p/original/8tZYtuWezp8JbcsvHYO0O46tFbo.jpg",
    category: "Action",
    duration: "2h",
    year: 2015,
    rating: 4.8,
    director: "George Miller",
    cast: "Tom Hardy, Charlize Theron",
    awards: "6 Academy Awards",
    trending: true
  },
  {
    id: 26,
    title: "The Social Network",
    description: "As Harvard student Mark Zuckerberg creates the social networking site that would become known as Facebook, he is sued by the twins who claimed he stole their idea, and by the co-founder who was later squeezed out of the business.",
    poster: "https://image.tmdb.org/t/p/original/n0ybibhJtQ5icDqTp8eRytcIHJx.jpg",
    category: "Drama",
    duration: "2h",
    year: 2010,
    rating: 4.7,
    director: "David Fincher",
    cast: "Jesse Eisenberg, Andrew Garfield",
    awards: "3 Academy Awards",
    trending: false
  },
  {
    id: 27,
    title: "La La Land",
    description: "While navigating their careers in Los Angeles, a pianist and an actress fall in love while attempting to reconcile their aspirations for the future.",
    poster: "https://image.tmdb.org/t/p/original/uDO8zWDhfWwoFdKS4fzkUJt0Rf0.jpg",
    category: "Musical",
    duration: "2h 8min",
    year: 2016,
    rating: 4.8,
    director: "Damien Chazelle",
    cast: "Ryan Gosling, Emma Stone",
    awards: "6 Academy Awards",
    trending: true
  },
  {
    id: 28,
    title: "The Thing",
    description: "A research team in Antarctica is hunted by a shape-shifting alien that assumes the appearance of its victims.",
    poster: "https://image.tmdb.org/t/p/original/tzGY49kseSE9QAKk47uuDGwnSCu.jpg",
    category: "Horror",
    duration: "1h 49min",
    year: 1982,
    rating: 4.7,
    director: "John Carpenter",
    cast: "Kurt Russell, Wilford Brimley",
    awards: "Saturn Award for Best Horror Film",
    trending: false
  },
  {
    id: 29,
    title: "Blade Runner 2049",
    description: "Young Blade Runner K's discovery of a long-buried secret leads him to track down former Blade Runner Rick Deckard, who's been missing for thirty years.",
    poster: "https://image.tmdb.org/t/p/original/gajva2L0rPYkEWjzgFlBXCAVBE5.jpg",
    category: "Sci-Fi",
    duration: "2h 44min",
    year: 2017,
    rating: 4.7,
    director: "Denis Villeneuve",
    cast: "Ryan Gosling, Harrison Ford",
    awards: "2 Academy Awards",
    trending: true
  },
  {
    id: 30,
    title: "Parasite",
    description: "Greed and class discrimination threaten the newly formed symbiotic relationship between the wealthy Park family and the destitute Kim clan.",
    poster: "https://image.tmdb.org/t/p/original/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg",
    category: "Drama",
    duration: "2h 12min",
    year: 2019,
    rating: 4.9,
    director: "Bong Joon Ho",
    cast: "Song Kang-ho, Lee Sun-kyun",
    awards: "4 Academy Awards including Best Picture",
    trending: true
  },
  {
    id: 31,
    title: "The Princess Bride",
    description: "While home sick in bed, a young boy's grandfather reads him the story of a farmboy-turned-pirate who encounters numerous obstacles, enemies and allies in his quest to be reunited with his true love.",
    poster: "https://image.tmdb.org/t/p/original/dvjqlp2sAhUeFjUOfQDgqwpphHj.jpg",
    category: "Fantasy",
    duration: "1h 38min",
    year: 1987,
    rating: 4.8,
    director: "Rob Reiner",
    cast: "Cary Elwes, Robin Wright",
    awards: "Academy Award Nomination",
    trending: false
  },
  {
    id: 32,
    title: "Seven Samurai",
    description: "A poor village under attack by bandits recruits seven unemployed samurai to help them defend themselves.",
    poster: "https://image.tmdb.org/t/p/original/8OKmBV5BUFzmozIC3pPWKHy17kx.jpg",
    category: "Action",
    duration: "3h 27min",
    year: 1954,
    rating: 4.9,
    director: "Akira Kurosawa",
    cast: "Toshiro Mifune, Takashi Shimura",
    awards: "2 Academy Award Nominations",
    trending: false
  }
];

const Movies = () => {
  const [movies, setMovies] = useState(MOCK_MOVIES);
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState(() => {
    return localStorage.getItem('viewMode') || 'grid';
  });
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('movieFavorites');
    return saved ? JSON.parse(saved) : [];
  });
  const [searchFocused, setSearchFocused] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [featuredMovie, setFeaturedMovie] = useState(null);
  const [timeRemaining, setTimeRemaining] = useState('');

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

  const handleFavorite = (movieId) => {
    setFavorites(prev => {
      const newFavorites = prev.includes(movieId)
        ? prev.filter(id => id !== movieId)
        : [...prev, movieId];
      
      // Save to localStorage immediately
      localStorage.setItem('movieFavorites', JSON.stringify(newFavorites));
      return newFavorites;
    });
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

  return (
    <div className="movies-container">
      <div className="epic-header">
        <div className="search-section">
          <div className={`search-container ${searchFocused ? 'focused' : ''}`}>
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search movies by title, description, or category..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
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
              <FaList />
            </button>
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
                onClick={() => setSelectedGenre(genre)}
              >
                {genre}
              </button>
            ))}
          </div>
          <div className="active-filters">
            {searchTerm && (
              <span className="filter-tag">
                Search: {searchTerm}
                <button onClick={() => setSearchTerm('')}>×</button>
              </span>
            )}
            {selectedGenre !== 'All' && (
              <span className="filter-tag">
                Genre: {selectedGenre}
                <button onClick={() => setSelectedGenre('All')}>×</button>
              </span>
            )}
          </div>
        </div>
      </div>

      {featuredMovie && !searchTerm && selectedGenre === 'All' && (
        <div className="featured-section">
          <div className="featured-header">
            <h2>Movie of the Day</h2>
            <div className="featured-timer">
              <FaClock /> Changes in: {timeRemaining}
            </div>
          </div>
          <MovieCard 
            movie={featuredMovie}
            isFeatured={true}
            onFavorite={handleFavorite}
            isFavorite={favorites.includes(featuredMovie.id)}
          />
        </div>
      )}

      <div className={`movies-grid ${viewMode}`}>
        {filteredMovies
          .filter(movie => movie.id !== featuredMovie?.id || searchTerm || selectedGenre !== 'All')
          .map(movie => (
            <MovieCard
              key={movie.id}
              movie={movie}
              onFavorite={handleFavorite}
              isFavorite={favorites.includes(movie.id)}
            />
          ))}
      </div>

      <div className="stats-footer">
        <div className="stat-item">
          <FaFilm />
          <div className="stat-content">
            <strong>{filteredMovies.length}</strong>
            <span>Movies</span>
          </div>
        </div>
        <div className="stat-item">
          <FaHeart />
          <div className="stat-content">
            <strong>{favorites.length}</strong>
            <span>Favorites</span>
          </div>
        </div>
        {selectedGenre !== 'All' && (
          <div className="stat-item">
            <div className="stat-content">
              <strong>{filteredMovies.length}</strong>
              <span>{selectedGenre} Movies</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Movies;
