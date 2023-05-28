import React, { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import checkAuthentication from './Authenticator';

export const ProtectedRoute = ({ children, isAllowed, element: Component, onLogout, ...rest }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const authenticate = async () => {
      const result = await checkAuthentication();
      setIsAuthenticated(result);
      setIsLoading(false);
    };

    authenticate();
  }, []);

  if (isLoading) {
    return <h1>Cargando...</h1>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  if (!isAllowed) {
    return <Navigate to="/" replace />;
  }

  return children ? children : <Outlet />;
};
