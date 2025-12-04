import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

const STORAGE_KEY = "ecom_auth";

const loadAuth = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : { user: null, token: null };
  } catch {
    return { user: null, token: null };
  }
};

const saveAuth = (data) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    // ignore
  }
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const stored = loadAuth();
    setUser(stored.user);
    setToken(stored.token);
  }, []);

  useEffect(() => {
    saveAuth({ user, token });
  }, [user, token]);

  const login = async ({ email, password, remember }) => {
    // Mock login implementation; replace with real API call later
    if (!email || !password) {
      throw new Error("Email and password are required");
    }
    const fakeToken = "mock-jwt-token";
    const fakeUser = { id: 1, name: "John Doe", email };
    setUser(fakeUser);
    setToken(fakeToken);
    if (!remember) {
      // For simplicity we still persist; in real app you might use sessionStorage
    }
    return { user: fakeUser, token: fakeToken };
  };

  const register = async ({ name, email, password }) => {
    // Mock register implementation
    if (!name || !email || !password) {
      throw new Error("All fields are required");
    }
    return login({ email, password, remember: true });
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    saveAuth({ user: null, token: null });
  };

  const value = {
    user,
    token,
    isAuthenticated: !!token,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return ctx;
};


