import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiEdit2, FiSave, FiTrash2, FiHeart, FiAlertCircle, FiUser } from 'react-icons/fi';
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
    confirmPassword: '',
    email: localStorage.getItem('email') || 'user@example.com',
    joinDate: localStorage.getItem('joinDate') || new Date().toISOString().split('T')[0]
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
    
    try {
      if (userData.newPassword && userData.newPassword !== userData.confirmPassword) {
        throw new Error('New passwords do not match');
      }

      // Simulated API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      localStorage.setItem('username', userData.username);
      localStorage.setItem('email', userData.email);
      
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
      // Simulated API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      localStorage.clear();
      navigate('/login');
    } catch (err) {
      setError('Failed to delete account. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => setSuccessMessage(''), 3000);
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  return (
    <div className="profile-container">
      <div className="profile-content">
        <div className="profile-header">
          <div className="profile-avatar">
            <FiUser className="avatar-icon" />
          </div>
          <div className="profile-info">
            <h1>{userData.username}</h1>
            <p className="join-date">Member since {new Date(userData.joinDate).toLocaleDateString()}</p>
            <p className="stats">
              <span><FiHeart /> {favorites.length} Favorites</span>
            </p>
          </div>
          <button 
            className={`edit-button ${isEditing ? 'active' : ''}`}
            onClick={() => setIsEditing(!isEditing)}
          >
            {isEditing ? <FiSave /> : <FiEdit2 />}
            {isEditing ? 'Save Profile' : 'Edit Profile'}
          </button>
        </div>

        {successMessage && (
          <div className="success-message">
            {successMessage}
          </div>
        )}

        {error && (
          <div className="error-message">
            <FiAlertCircle /> {error}
          </div>
        )}

        {isEditing ? (
          <form onSubmit={handleUpdateProfile} className="profile-form">
            <div className="form-group">
              <label>Username</label>
              <input
                type="text"
                name="username"
                value={userData.username}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={userData.email}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Current Password</label>
              <input
                type="password"
                name="currentPassword"
                value={userData.currentPassword}
                onChange={handleInputChange}
                placeholder="Enter current password to make changes"
              />
            </div>
            <div className="form-group">
              <label>New Password</label>
              <input
                type="password"
                name="newPassword"
                value={userData.newPassword}
                onChange={handleInputChange}
                placeholder="Leave blank to keep current password"
              />
            </div>
            <div className="form-group">
              <label>Confirm New Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={userData.confirmPassword}
                onChange={handleInputChange}
                placeholder="Confirm new password"
              />
            </div>
            <div className="form-actions">
              <button type="submit" className="save-button" disabled={loading}>
                {loading ? 'Saving...' : 'Save Changes'}
              </button>
              <button 
                type="button" 
                className="delete-button"
                onClick={() => setShowDeleteConfirm(true)}
              >
                <FiTrash2 /> Delete Account
              </button>
            </div>
          </form>
        ) : (
          <div className="profile-details">
            <div className="detail-item">
              <label>Username</label>
              <p>{userData.username}</p>
            </div>
            <div className="detail-item">
              <label>Email</label>
              <p>{userData.email}</p>
            </div>
          </div>
        )}

        <div className="favorites-section">
          <h2>My Favorites</h2>
          {favorites.length > 0 ? (
            <div className="favorites-grid">
              {favorites.map(movie => (
                <div key={movie.id} className="favorite-item">
                  <img src={movie.poster} alt={movie.title} />
                  <div className="favorite-overlay">
                    <h3>{movie.title}</h3>
                    <button onClick={() => toggleFavorite(movie)}>
                      <FiHeart className="filled" /> Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="no-favorites">
              <FiHeart />
              <h3>No favorites yet</h3>
              <p>Start exploring movies and add them to your favorites!</p>
            </div>
          )}
        </div>
      </div>

      {showDeleteConfirm && (
        <div className="modal-overlay">
          <div className="delete-confirm-modal">
            <h2>Delete Account</h2>
            <p>Are you sure you want to delete your account? This action cannot be undone.</p>
            <div className="modal-actions">
              <button 
                className="cancel-button"
                onClick={() => setShowDeleteConfirm(false)}
              >
                Cancel
              </button>
              <button 
                className="confirm-delete-button"
                onClick={handleDeleteAccount}
                disabled={loading}
              >
                {loading ? 'Deleting...' : 'Yes, Delete My Account'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
