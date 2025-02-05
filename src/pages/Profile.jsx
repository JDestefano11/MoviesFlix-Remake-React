import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MovieCard from '../components/MovieCard';
import { useFavorites } from '../context/FavoritesContext';
import '../styles/Profile.css';

const Profile = () => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const { favorites, toggleFavorite, isFavorite } = useFavorites();
  const [userData, setUserData] = useState({
    username: localStorage.getItem('username') || 'User',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccessMessage('');

    try {
      if (userData.newPassword && userData.newPassword.length < 6) {
        throw new Error('New password must be at least 6 characters long');
      }

      if (userData.newPassword && userData.newPassword !== userData.confirmPassword) {
        throw new Error('New passwords do not match');
      }

      await new Promise(resolve => setTimeout(resolve, 1000));
      localStorage.setItem('username', userData.username);

      if (userData.newPassword) {
        localStorage.setItem('password', userData.newPassword);
      }

      setSuccessMessage('Profile updated successfully!');
      setIsEditing(false);
      
      setUserData(prev => ({
        ...prev,
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      }));

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      localStorage.clear();
      navigate('/signup');
    } catch (err) {
      setError('Failed to delete account. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const username = localStorage.getItem('username');
    if (!username) {
      navigate('/signup');
    }
  }, [navigate]);

  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="profile-avatar" title={userData.username}>
          {userData.username.charAt(0).toUpperCase()}
        </div>
        <div className="profile-info">
          <h1>Welcome, {userData.username}</h1>
          {!isEditing && (
            <button 
              className="edit-profile-btn"
              onClick={() => setIsEditing(true)}
              disabled={loading}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '8px' }}>
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
              </svg>
              Edit Profile
            </button>
          )}
        </div>
      </div>

      {error && (
        <div className="error-message">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12" y2="16" />
          </svg>
          {error}
        </div>
      )}

      {successMessage && (
        <div className="success-message">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
            <polyline points="22 4 12 14.01 9 11.01" />
          </svg>
          {successMessage}
        </div>
      )}

      {isEditing ? (
        <div className="profile-edit-section">
          <h2>Edit Your Profile</h2>
          <form onSubmit={handleUpdateProfile}>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                id="username"
                type="text"
                name="username"
                value={userData.username}
                onChange={handleInputChange}
                disabled={loading}
                placeholder="Enter your username"
              />
            </div>

            <div className="form-group">
              <label htmlFor="currentPassword">Current Password</label>
              <input
                id="currentPassword"
                type="password"
                name="currentPassword"
                value={userData.currentPassword}
                onChange={handleInputChange}
                disabled={loading}
                placeholder="Enter current password"
              />
            </div>

            <div className="form-group">
              <label htmlFor="newPassword">New Password</label>
              <input
                id="newPassword"
                type="password"
                name="newPassword"
                value={userData.newPassword}
                onChange={handleInputChange}
                disabled={loading}
                placeholder="Enter new password"
              />
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm New Password</label>
              <input
                id="confirmPassword"
                type="password"
                name="confirmPassword"
                value={userData.confirmPassword}
                onChange={handleInputChange}
                disabled={loading}
                placeholder="Confirm new password"
              />
            </div>

            <div className="profile-actions">
              <button 
                type="submit" 
                className="save-btn"
                disabled={loading}
              >
                {loading ? 'Saving...' : 'Save Changes'}
              </button>
              <button 
                type="button"
                className="cancel-btn"
                onClick={() => {
                  setIsEditing(false);
                  setError('');
                  setUserData(prev => ({
                    ...prev,
                    currentPassword: '',
                    newPassword: '',
                    confirmPassword: ''
                  }));
                }}
                disabled={loading}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      ) : (
        <>
          <div className="favorites-section">
            <h2>My Favorite Movies</h2>
            {favorites.length === 0 ? (
              <div className="no-favorites">
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
                <p>You haven't added any favorites yet.</p>
                <button onClick={() => navigate('/movies')} className="browse-movies-btn">
                  Browse Movies
                </button>
              </div>
            ) : (
              <div className="favorites-grid">
                {favorites.map(movie => (
                  <MovieCard
                    key={movie.id}
                    movie={movie}
                    onFavorite={() => toggleFavorite(movie)}
                    isFavorite={isFavorite(movie.id)}
                  />
                ))}
              </div>
            )}
          </div>

          <div className="danger-zone">
            <h3>Danger Zone</h3>
            {!showDeleteConfirm ? (
              <button 
                className="delete-account-btn"
                onClick={() => setShowDeleteConfirm(true)}
                disabled={loading}
              >
                Delete Account
              </button>
            ) : (
              <div className="delete-confirm">
                <p>Are you sure you want to delete your account? This action cannot be undone.</p>
                <div className="delete-actions">
                  <button 
                    className="confirm-delete-btn"
                    onClick={handleDeleteAccount}
                    disabled={loading}
                  >
                    {loading ? 'Deleting...' : 'Yes, Delete My Account'}
                  </button>
                  <button 
                    className="cancel-delete-btn"
                    onClick={() => setShowDeleteConfirm(false)}
                    disabled={loading}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Profile;
