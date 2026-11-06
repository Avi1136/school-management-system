import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from '../pages/Auth/Login';
import Dashboard from '../pages/Dashboard/Dashboard';
import Settings from '../pages/Settings/Settings';
import Layout from '../components/layout/Layout';
import ProtectedRoute from './ProtectedRoute';

// Generic placeholder component for pages under development
const ModulePlaceholder = ({ title }) => (
  <div style={{ padding: '25px' }}>
    <h2 style={{ color: '#1a3b5d', marginBottom: '10px' }}>{title} Module</h2>
    <p style={{ color: '#666' }}>This module is loaded based on your account permissions.</p>
  </div>
);

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<Login />} />

      {/* Protected Main Dashboard */}
      <Route 
        path="/dashboard" 
        element={
          <ProtectedRoute requiredPermission="view_dashboard">
            <Layout>
              <Dashboard />
            </Layout>
          </ProtectedRoute>
        } 
      />

      {/* Account & Security Settings */}
      <Route 
        path="/settings" 
        element={
          <ProtectedRoute>
            <Layout>
              <Settings />
            </Layout>
          </ProtectedRoute>
        } 
      />

      {/* Core School Modules Guarded by Database Permissions */}
      <Route 
        path="/students" 
        element={
          <ProtectedRoute requiredPermission="view_students">
            <Layout>
              <ModulePlaceholder title="Student Directory" />
            </Layout>
          </ProtectedRoute>
        } 
      />

      <Route 
        path="/faculty" 
        element={
          <ProtectedRoute requiredPermission="view_staff">
            <Layout>
              <ModulePlaceholder title="School Staff & Faculty" />
            </Layout>
          </ProtectedRoute>
        } 
      />

      <Route 
        path="/attendance" 
        element={
          <ProtectedRoute requiredPermission="view_attendance">
            <Layout>
              <ModulePlaceholder title="Attendance Monitoring" />
            </Layout>
          </ProtectedRoute>
        } 
      />

      <Route 
        path="/fees" 
        element={
          <ProtectedRoute requiredPermission="manage_fees">
            <Layout>
              <ModulePlaceholder title="Fee Collection & Accounting" />
            </Layout>
          </ProtectedRoute>
        } 
      />

      <Route 
        path="/timetable" 
        element={
          <ProtectedRoute requiredPermission="view_timetable">
            <Layout>
              <ModulePlaceholder title="Time Table Management" />
            </Layout>
          </ProtectedRoute>
        } 
      />

      <Route 
        path="/examinations" 
        element={
          <ProtectedRoute requiredPermission="manage_exams">
            <Layout>
              <ModulePlaceholder title="Exam Management & Grading" />
            </Layout>
          </ProtectedRoute>
        } 
      />

      <Route 
        path="/admissions" 
        element={
          <ProtectedRoute requiredPermission="manage_admissions">
            <Layout>
              <ModulePlaceholder title="Admissions Portal" />
            </Layout>
          </ProtectedRoute>
        } 
      />

      <Route 
        path="/reports" 
        element={
          <ProtectedRoute requiredPermission="manage_reports">
            <Layout>
              <ModulePlaceholder title="Report Card Settings & Generation" />
            </Layout>
          </ProtectedRoute>
        } 
      />

      {/* Fallback Redirect */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};

export default AppRoutes;