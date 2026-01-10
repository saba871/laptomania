import { Navigate } from 'react-router';
import { useAuth } from './auth.context';

const Protect = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to={'/login'} />;
};

export default Protect;
