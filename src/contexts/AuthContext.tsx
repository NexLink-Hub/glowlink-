/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  email: string;
  role: string;
  firstName?: string;
  lastName?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing token on app start
    const token = localStorage.getItem('authToken');
    if (token) {
      try {
        // Decode token (mock decoding)
        const payload = JSON.parse(atob(token.split('.')[1]));
        if (payload.exp * 1000 > Date.now()) {
          setUser(payload.user);
        } else {
          localStorage.removeItem('authToken');
        }
      } catch (error) {
        localStorage.removeItem('authToken');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Mock login - in real app, call API
    if (email && password) {
      const mockUser: User = {
        id: '1',
        email,
        role: 'artist',
        firstName: 'Test',
        lastName: 'User',
      };

      // Create mock JWT
      const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
      const payload = btoa(JSON.stringify({
        user: mockUser,
        exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60), // 24 hours
        iat: Math.floor(Date.now() / 1000),
      }));
      const signature = btoa('mock-signature'); // Mock signature
      const token = `${header}.${payload}.${signature}`;

      localStorage.setItem('authToken', token);
      setUser(mockUser);
      return true;
    }
    return false;
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    setUser(null);
  };

  const value: AuthContextType = {
    user,
    login,
    logout,
    isAuthenticated: !!user,
    isLoading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
