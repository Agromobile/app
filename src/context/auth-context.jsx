import { createContext, useEffect, useState, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Proptypes from 'prop-types';

// Create authentication context
const AuthContext = createContext();

// Helps in checking if the session exists and has not expired
const sessionExistsAndNotExpired = () => {
  const expirationTime = localStorage.getItem('expirationTime');
  return expirationTime && new Date().getTime() < parseInt(expirationTime, 10);
};

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // check on initial render if session is expired
    if (sessionExistsAndNotExpired()) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);

      // If current path name is not in allowed locations
      if (!['/', '/signup', '/login'].includes(location.pathname)) {
        navigate('/login', { state: { previousLocation: '/' } });
      }
    }
  }, [navigate, location]);

  const createLoginSession = () => {
    const expirationTime = new Date().getTime() + 1000 * 3600; // 1 hour ahead - as intended.
    localStorage.setItem('expirationTime', expirationTime.toString());
  };

  // const closeLoginSession = () => {
  //   if (localStorage.getItem('expirationTime')) {
  //     localStorage.removeItem('expirationTime');
  //   }
  // };

  return (
    <AuthContext.Provider value={{ isAuthenticated, createLoginSession }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: Proptypes.node.isRequired,
};

// custom hook for working with authentication state.
export const useAuth = () => useContext(AuthContext);
