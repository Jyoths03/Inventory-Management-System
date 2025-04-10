import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token'); // Assuming you're using token for authentication

  return token ? children : <Navigate to="/" />; // Redirect to login if not authenticated
};

export default ProtectedRoute;


