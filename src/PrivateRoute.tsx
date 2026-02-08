import React from 'react';
import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from './account/AuthContext'

const PrivateRoute: React.FC = () => {
  const auth = useAuth();
  const isAuthenticated =  auth.accessToken != null;
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />; 
  }
  return <Outlet />; 
};

export default PrivateRoute;