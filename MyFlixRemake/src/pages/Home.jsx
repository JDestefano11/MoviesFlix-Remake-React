import React from 'react';
import Navbar from '../components/Navbar';
import '../styles/Home.css';

const Home = () => {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <div className="home">
      <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} />
      <div className="hero-section">
        <h1>Welcome to MyFlix</h1>
        <p>Your ultimate destination for movies and entertainment</p>
      </div>
      <div className="content-section">
        {/* Content will go here */}
      </div>
    </div>
  );
};

export default Home;
