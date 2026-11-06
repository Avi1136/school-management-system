import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children, requiredPermission }) => {
  const { user, hasPermission } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Safely evaluate permission
  if (requiredPermission && typeof hasPermission === 'function' && !hasPermission(requiredPermission)) {
    return (
      <div style={{ padding: '40px', textAlign: 'center' }}>
        <h2 style={{ color: '#e53935' }}>Access Denied</h2>
        <p style={{ color: '#666', marginTop: '10px' }}>
          Your user ID ({user.id}) does not have permission to access this module.
        </p>
      </div>
    );
  }

  return children;
};

export default ProtectedRoute;