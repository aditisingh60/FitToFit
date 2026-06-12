import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
  // This is a placeholder for actual auth logic
  const isAuthenticated = !!localStorage.getItem('token'); 

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
