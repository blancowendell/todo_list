import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    isAuthenticated: false,
    user: null,
    loading: true
  });
  
  const navigate = useNavigate();

  useEffect(() => {
    const verifyToken = () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setAuthState({ isAuthenticated: false, user: null, loading: false });
        return;
      }

      try {
        const decoded = jwtDecode(token);
        const isValid = decoded?.exp * 1000 > Date.now();
        
        setAuthState({
          isAuthenticated: isValid,
          user: isValid ? decoded : null,
          loading: false
        });

        if (!isValid) logout();
      } catch (error) {
        logout();
      }
    };

    verifyToken();
  }, []);

  const login = (token) => {
    localStorage.setItem('token', token);
    const decoded = jwtDecode(token);
    setAuthState({
      isAuthenticated: true,
      user: decoded,
      loading: false
    });
    navigate('/');
  };

  const logout = () => {
    localStorage.removeItem('token');
    setAuthState({
      isAuthenticated: false,
      user: null,
      loading: false
    });
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ ...authState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);