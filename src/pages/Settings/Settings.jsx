import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import '../../styles/settings.css';

const Settings = () => {
  const { user } = useAuth();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handlePasswordChange = (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    if (newPassword !== confirmPassword) {
      setError('New passwords do not match.');
      return;
    }

    if (newPassword.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    // Simulate API request to update password in database
    setTimeout(() => {
      setMessage('Password successfully updated! Your account is now secure.');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    }, 500);
  };

  return (
    <div className="settings-container">
      <div className="settings-card">
        <h3>Account & Security Settings</h3>
        <p style={{ fontSize: '13px', color: '#666', marginBottom: '20px' }}>
          Logged in user: <strong>{user?.name}</strong> ({user?.id})
        </p>

        {message && <div style={{ background: '#e6fcf5', color: '#2e7d32', padding: '10px', borderRadius: '4px', fontSize: '13px', marginBottom: '15px' }}>{message}</div>}
        {error && <div style={{ background: '#ffe3e3', color: '#c92a2a', padding: '10px', borderRadius: '4px', fontSize: '13px', marginBottom: '15px' }}>{error}</div>}

        <form className="settings-form" onSubmit={handlePasswordChange}>
          <div className="form-group">
            <label>Current Password</label>
            <input 
              type="password" 
              value={currentPassword} 
              onChange={(e) => setCurrentPassword(e.target.value)} 
              required 
            />
          </div>

          <div className="form-group">
            <label>New Password</label>
            <input 
              type="password" 
              value={newPassword} 
              onChange={(e) => setNewPassword(e.target.value)} 
              required 
            />
          </div>

          <div className="form-group">
            <label>Confirm New Password</label>
            <input 
              type="password" 
              value={confirmPassword} 
              onChange={(e) => setConfirmPassword(e.target.value)} 
              required 
            />
          </div>

          <button type="submit" className="btn-save">Update Password</button>
        </form>
      </div>
    </div>
  );
};

export default Settings;