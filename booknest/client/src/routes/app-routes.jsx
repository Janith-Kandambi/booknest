import { Route, Routes } from 'react-router-dom';
import { AddBookPage } from '@/pages/add-book-page';
import { BookDetailsPage } from '@/pages/book-details-page';
import { DashboardPage } from '@/pages/dashboard-page';
import { EditBookPage } from '@/pages/edit-book-page';
import { LandingPage } from '@/pages/landing-page';
import { LibraryPage } from '@/pages/library-page';
import { LoginPage } from '@/pages/login-page';
import { RegisterPage } from '@/pages/register-page';
import { ProtectedRoute } from './protected-route';

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route
        path="/dashboard"
        element={(
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        )}
      />
      <Route
        path="/library"
        element={(
          <ProtectedRoute>
            <LibraryPage />
          </ProtectedRoute>
        )}
      />
      <Route
        path="/books/new"
        element={(
          <ProtectedRoute>
            <AddBookPage />
          </ProtectedRoute>
        )}
      />
      <Route
        path="/books/:id"
        element={(
          <ProtectedRoute>
            <BookDetailsPage />
          </ProtectedRoute>
        )}
      />
      <Route
        path="/books/:id/edit"
        element={(
          <ProtectedRoute>
            <EditBookPage />
          </ProtectedRoute>
        )}
      />
    </Routes>
  );
}
