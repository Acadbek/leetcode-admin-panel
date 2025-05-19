import { useUser } from '@/context/UserContext';
import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

const ProtectedRoute = () => {
  const location = useLocation();
  const { isAuthenticated, isLoadingAuth } = useUser();

  if (isLoadingAuth) {
    return <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-background p-6 md:p-10">
      <h1 className="text-3xl font-bold">Company Logo</h1>
      <p className="text-lg">Loading...</p>
    </div>;
  }
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;