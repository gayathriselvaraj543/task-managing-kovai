import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../../app/store/authStore';

function ProtectedRoute({ children }) {
  const user = useAuthStore((state) => state.user);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;
