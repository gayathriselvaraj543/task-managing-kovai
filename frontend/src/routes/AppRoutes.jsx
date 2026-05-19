import { Route, Routes } from 'react-router-dom';
import AuthenticationLayout from '../components/layout/AuthenticationLayout';
import AppLayout from '../components/layout/AppLayout';
import LoginPage from '../pages/LoginPage';
import DashboardPage from '../pages/DashboardPage';
import NotFoundPage from '../pages/NotFoundPage';
import ProtectedRoute from '../components/routes/ProtectedRoute';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<AuthenticationLayout><LoginPage /></AuthenticationLayout>} />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <AppLayout>
              <DashboardPage />
            </AppLayout>
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default AppRoutes;
