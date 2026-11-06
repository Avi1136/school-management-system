import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const { schoolData, user, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const navigate = useNavigate();

  const handleLogoutConfirm = () => {
    logout();
    navigate('/login');
  };

  return (
    <>
      <header style={{
        height: '70px',
        backgroundColor: '#ffffff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 32px',
        borderBottom: '1px solid #e8e2d8',
        position: 'sticky',
        top: 0,
        zIndex: 90
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <img 
            src={schoolData.logo} 
            alt="School Logo" 
            style={{ height: '38px', objectFit: 'contain' }} 
            onError={(e) => { e.target.style.display = 'none'; }}
          />
          <div>
            <h2 style={{ color: '#201c18', fontSize: '18px', fontWeight: 700, margin: 0, letterSpacing: '-0.3px' }}>
              {schoolData.name}
            </h2>
            <span style={{ fontSize: '12px', color: '#786f66', fontWeight: 500 }}>
              Campus Code: {schoolData.schoolCode}
            </span>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
          {/* Notification Icon */}
          <div style={{
            position: 'relative',
            background: '#f2ece1',
            width: '42px',
            height: '42px',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#201c18',
            cursor: 'pointer',
            fontSize: '16px'
          }}>
            🔔
            <span style={{
              position: 'absolute',
              top: '9px',
              right: '9px',
              width: '8px',
              height: '8px',
              backgroundColor: '#c85a32',
              borderRadius: '50%'
            }}></span>
          </div>

          {/* User Profile Trigger */}
          <div style={{ position: 'relative' }}>
            <div 
              onClick={() => setDropdownOpen(!dropdownOpen)}
              style={{
                height: '42px',
                padding: '0 14px',
                borderRadius: '12px',
                backgroundColor: '#f2ece1',
                color: '#201c18',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                cursor: 'pointer',
                fontWeight: 600,
                fontSize: '13px',
                border: '1px solid #e8e2d8'
              }}
            >
              <span style={{
                width: '26px',
                height: '26px',
                borderRadius: '50%',
                background: '#c85a32',
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '11px',
                fontWeight: 700
              }}>
                {user?.name ? user.name.charAt(0) : 'A'}
              </span>
              <span>{user?.name || 'Account'}</span>
              <span style={{ fontSize: '10px', color: '#786f66' }}>▼</span>
            </div>

            {dropdownOpen && (
              <div style={{
                position: 'absolute',
                right: 0,
                top: '52px',
                background: '#ffffff',
                boxShadow: '0 12px 30px rgba(32, 28, 24, 0.08)',
                borderRadius: '14px',
                width: '240px',
                overflow: 'hidden',
                border: '1px solid #e8e2d8'
              }}>
                <div style={{ padding: '16px', borderBottom: '1px solid #f2ece1', background: '#faf8f5' }}>
                  <div style={{ fontSize: '14px', fontWeight: 700, color: '#201c18' }}>{user?.name || 'User'}</div>
                  <div style={{ fontSize: '12px', color: '#786f66', marginTop: '2px' }}>Role: {user?.role}</div>
                </div>
                <button 
                  onClick={() => {
                    setDropdownOpen(false);
                    setShowLogoutModal(true);
                  }}
                  style={{
                    width: '100%',
                    padding: '14px 16px',
                    background: 'none',
                    border: 'none',
                    textAlign: 'left',
                    cursor: 'pointer',
                    color: '#c85a32',
                    fontSize: '13px',
                    fontWeight: 600,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px'
                  }}
                >
                  🚪 Sign Out
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Warm Logout Dialog */}
      {showLogoutModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          backgroundColor: 'rgba(32, 28, 24, 0.4)',
          backdropFilter: 'blur(6px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
        }}>
          <div style={{
            background: '#ffffff',
            padding: '32px',
            borderRadius: '20px',
            width: '400px',
            boxShadow: '0 20px 40px rgba(0,0,0,0.12)',
            textAlign: 'center',
            border: '1px solid #e8e2d8'
          }}>
            <h3 style={{ color: '#201c18', marginBottom: '10px', fontSize: '20px', fontWeight: 700 }}>Ready to leave?</h3>
            <p style={{ color: '#786f66', fontSize: '14px', marginBottom: '28px', lineHeight: '1.5' }}>
              Are you sure you want to log out? You will need to re-authenticate to access administrative records.
            </p>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button 
                onClick={() => setShowLogoutModal(false)}
                style={{
                  padding: '12px 20px',
                  background: '#f2ece1',
                  color: '#201c18',
                  border: 'none',
                  borderRadius: '10px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  fontSize: '13px',
                  flex: 1
                }}
              >
                Stay Logged In
              </button>
              <button 
                onClick={handleLogoutConfirm}
                style={{
                  padding: '12px 20px',
                  background: '#c85a32',
                  color: 'white',
                  border: 'none',
                  borderRadius: '10px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  fontSize: '13px',
                  flex: 1
                }}
              >
                Confirm Sign Out
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;