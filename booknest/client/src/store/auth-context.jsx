import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { authService } from '@/services/auth-service';

const TOKEN_KEY = 'booknest_token';
const AuthContext = createContext(null);

function setStoredToken(token) {
  if (token) {
    localStorage.setItem(TOKEN_KEY, token);
  } else {
    localStorage.removeItem(TOKEN_KEY);
  }
}

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem(TOKEN_KEY) || '');
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [initializing, setInitializing] = useState(true);

  const clearSession = useCallback(() => {
    setStoredToken('');
    setToken('');
    setUser(null);
  }, []);

  const setSession = useCallback((nextToken, nextUser) => {
    setStoredToken(nextToken);
    setToken(nextToken);
    setUser(nextUser);
  }, []);

  useEffect(() => {
    let active = true;

    async function bootstrapAuth() {
      if (!token) {
        setInitializing(false);
        return;
      }

      try {
        const { user: currentUser } = await authService.me(token);

        if (active) {
          setUser(currentUser);
        }
      } catch {
        if (active) {
          clearSession();
        }
      } finally {
        if (active) {
          setInitializing(false);
        }
      }
    }

    bootstrapAuth();

    return () => {
      active = false;
    };
  }, [clearSession, token]);

  const login = useCallback(async credentials => {
    setLoading(true);
    try {
      const { token: nextToken, user: nextUser } = await authService.login(credentials);
      setSession(nextToken, nextUser);
      return nextUser;
    } finally {
      setLoading(false);
    }
  }, [setSession]);

  const register = useCallback(async payload => {
    setLoading(true);
    try {
      const { token: nextToken, user: nextUser } = await authService.register(payload);
      setSession(nextToken, nextUser);
      return nextUser;
    } finally {
      setLoading(false);
    }
  }, [setSession]);

  const logout = useCallback(() => {
    clearSession();
  }, [clearSession]);

  const value = useMemo(() => ({
    user,
    token,
    loading,
    initializing,
    isAuthenticated: Boolean(user),
    login,
    register,
    logout
  }), [user, token, loading, initializing, login, register, logout]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }

  return context;
}
