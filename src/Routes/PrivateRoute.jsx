import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import userAuth from '../Hooks/userAuth';

const PrivateRoute = ({ children }) => {
  const { user, loading } = userAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default PrivateRoute;
