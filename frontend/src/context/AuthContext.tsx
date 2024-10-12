import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthenticationControllerApi, Configuration } from '../api';
import { configWithOutToken } from '../config/config';

interface AuthContextProps {
  isAuthenticated: boolean;
  login: (token: string, roles: string[]) => void;
  logout: () => void;
}
const initializeConfig = () => {
  const authToken = localStorage.getItem('authToken') || '';
  const basePath = import.meta.env.VITE_API_BASE_URL || '/api';
  return new Configuration({
    basePath: basePath.replace(/\/+$/, ''),
    accessToken: authToken,
  });
};
let config = initializeConfig();

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    const token = localStorage.getItem('authToken');
    const roles = localStorage.getItem('roles');
    return token && roles ? true : false;
  });

  const login = (token: string, roles: string[]) => {
    localStorage.setItem('authToken', token);
    localStorage.setItem('roles', JSON.stringify(roles));
    config = initializeConfig();
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('roles');
    setIsAuthenticated(false);
  };

  useEffect(() => {
    const checkTokenValidity = async () => {
      try {
        if (location.pathname === '/login') {
          return;
        }
        const api = new AuthenticationControllerApi(configWithOutToken);
        const token = localStorage.getItem('authToken') || '';
        const response = await api.isTokenValidRaw({ token });

        if (!response) {
          logout();
        }
      } catch (error) {
        console.error('Error checking token validity:', error);
        logout();
      }
    };

    const intervalId = setInterval(checkTokenValidity, 15 * 60 * 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      <AuthHandler>{children}</AuthHandler>
    </AuthContext.Provider>
  );
};

const AuthHandler: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [hasRedirected, setHasRedirected] = useState<boolean>(false);

  useEffect(() => {
    if (isAuthenticated && !hasRedirected && location.pathname === '/') {
      navigate('/projects');
      setHasRedirected(true);
    }
  }, [isAuthenticated, navigate, hasRedirected, location.pathname]);

  return <>{children}</>;
};

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export { config };
