// components/ProtectedRoute.js
import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../Context/userContext';

const ProtectedRoute = ({ children }) => {
  const { authData } = useContext(AuthContext);

  // Check if the user is authenticated and has the 'admin' role
  const isAuthenticated = authData.token;

  return isAuthenticated ? children : <Navigate to="/admin/login" />;
};

export default ProtectedRoute;
