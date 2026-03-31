import { Navigate } from 'react-router-dom';
import { useAuth } from '@/store/auth-context';

export function ProtectedRoute({ children }) {
  const { isAuthenticated, initializing } = useAuth();

  if (initializing) {
    return <div className="p-6 text-center text-sm text-muted-foreground">Checking session...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
