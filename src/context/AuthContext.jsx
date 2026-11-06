import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('userData');
    return saved && saved !== 'undefined' ? JSON.parse(saved) : null;
  });

  const [schoolData, setSchoolData] = useState(() => {
    const saved = localStorage.getItem('schoolData');
    return saved && saved !== 'undefined' ? JSON.parse(saved) : {
      schoolCode: 'EMET101',
      name: 'EMET Mohanpur Public School',
      logo: '/src/assets/images/school-logo.png',
      academicYear: '2026-2027',
    };
  });

  const login = (userData, tenantData) => {
    setUser(userData);
    localStorage.setItem('userData', JSON.stringify(userData));
    
    if (tenantData) {
      setSchoolData(tenantData);
      localStorage.setItem('schoolData', JSON.stringify(tenantData));
    }
  };

  const logout = () => {
    setUser(null);
    // Best practice: remove specific keys instead of wiping all localStorage
    localStorage.removeItem('userData');
    localStorage.removeItem('schoolData');
  };

  const hasPermission = (permissionKey) => {
    if (!permissionKey) return true;
    if (!user || !user.permissions) return false;
    return user.permissions.includes(permissionKey);
  };

  return (
    <AuthContext.Provider value={{ user, schoolData, login, logout, hasPermission }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};