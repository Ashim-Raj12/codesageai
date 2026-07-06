import React from 'react';
import { useAuth } from '@clerk/clerk-react';
import { Navigate } from 'react-router-dom';
import { LoadingScreen } from '../layout/LoadingScreen';

interface PublicOnlyRouteProps {
  children: React.ReactNode;
}

export const PublicOnlyRoute: React.FC<PublicOnlyRouteProps> = ({ children }) => {
  const { isLoaded, isSignedIn } = useAuth();

  // Show loading screen while session loads
  if (!isLoaded) {
    return <LoadingScreen />;
  }

  // Redirect to dashboard if user is already authenticated
  if (isSignedIn) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};
