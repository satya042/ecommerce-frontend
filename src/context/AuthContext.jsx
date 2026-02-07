import React, { createContext, useContext, useEffect, useState, useRef } from "react";
import {
  extractUserFromToken,
  isTokenExpired,
  getRefreshTime,
} from "../utils/jwtUtils";

const AuthContext = createContext(null);

const STORAGE_KEY = "ecom_auth";
const TOKEN_REFRESH_ENDPOINT = "/api/auth/refresh";

// Extract role from JWT token or user object
const extractRole = (token, user) => {
  // First try to get role from user object
  if (user?.role) {
    return user.role.toLowerCase();
  }

  // Try to extract from token
  const extractedUser = extractUserFromToken(token);
  if (extractedUser?.role) {
    return extractedUser.role.toLowerCase();
  }

  return null;
};

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
  const refreshTimerRef = useRef(null);
  const isRefreshingRef = useRef(false);

  // Initialize auth from storage
  useEffect(() => {
    const stored = loadAuth();
    if (stored.token) {
      // Extract user data from token
      const extractedUser = extractUserFromToken(stored.token);
      setToken(stored.token);
      setUser(extractedUser || stored.user);
    }
  }, []);

  // Save auth state whenever it changes
  useEffect(() => {
    saveAuth({ user, token });
  }, [user, token]);

  // Refresh token before expiration
  useEffect(() => {
    const scheduleRefresh = () => {
      // Clear existing timer
      if (refreshTimerRef.current) {
        clearTimeout(refreshTimerRef.current);
      }

      if (!token) return;

      // Check if token is expired
      if (isTokenExpired(token)) {
        console.log("Token expired, attempting refresh...");
        refreshAccessToken();
        return;
      }

      // Schedule refresh before expiration (5 minutes before)
      const refreshTime = getRefreshTime(token, 5 * 60 * 1000);

      if (refreshTime > 0) {
        console.log(`Token refresh scheduled in ${refreshTime / 1000} seconds`);
        refreshTimerRef.current = setTimeout(() => {
          refreshAccessToken();
        }, refreshTime);
      }
    };

    scheduleRefresh();

    // Cleanup timer on unmount
    return () => {
      if (refreshTimerRef.current) {
        clearTimeout(refreshTimerRef.current);
      }
    };
  }, [token]);

  /**
   * Refresh access token using refresh endpoint
   */
  const refreshAccessToken = async () => {
    // Prevent multiple simultaneous refresh requests
    if (isRefreshingRef.current) {
      return;
    }

    isRefreshingRef.current = true;

    try {
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL || "http://localhost:9001"}${TOKEN_REFRESH_ENDPOINT}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
        credentials: "include", // Include cookies (for refresh token)
      });

      if (!response.ok) {
        throw new Error("Token refresh failed");
      }

      const data = await response.json();

      if (data.accessToken || data.token) {
        const newToken = data.accessToken || data.token;
        const newRefreshToken = data.refreshToken;

        // Update tokens
        setToken(newToken);

        // Extract user data from new token
        const extractedUser = extractUserFromToken(newToken);
        if (extractedUser) {
          setUser(extractedUser);
        }

        // Store refresh token in cookie (handled by backend via Set-Cookie header)
        if (newRefreshToken) {
          // If backend sends refresh token in response, store it
          localStorage.setItem("refreshToken", newRefreshToken);
        }

        console.log("Token refreshed successfully");
      }
    } catch (error) {
      console.error("Error refreshing token:", error);
      // If refresh fails, logout user
      logout();
    } finally {
      isRefreshingRef.current = false;
    }
  };

  const login = async ({ email, password, remember }) => {
    // Mock login implementation; replace with real API call later
    if (!email || !password) {
      throw new Error("Email and password are required");
    }
    const fakeToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6IkpvaG4gRG9lIiwiZnVsbE5hbWUiOiJKb2huIERvZSIsImVtYWlsIjoiam9obkBleGFtcGxlLmNvbSIsInVzZXJuYW1lIjoiam9obiIsInJvbGUiOiJ1c2VyIn0.TJVA95OrM7E2cBab30RMHrHDcEfxjoYZgeFONFh7HgQ";
    const extractedUser = extractUserFromToken(fakeToken) || {
      id: 1,
      fullName: "John Doe",
      email,
      role: "user",
    };

    setUser(extractedUser);
    setToken(fakeToken);

    if (!remember) {
      // For simplicity we still persist; in real app you might use sessionStorage
    }
    return { user: extractedUser, token: fakeToken };
  };

  const register = async ({ name, email, password }) => {
    // Mock register implementation
    if (!name || !email || !password) {
      throw new Error("All fields are required");
    }
    const fakeToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6IkpvaG4gRG9lIiwiZnVsbE5hbWUiOiJKb2huIERvZSIsImVtYWlsIjoiam9obkBleGFtcGxlLmNvbSIsInVzZXJuYW1lIjoiam9obiIsInJvbGUiOiJ1c2VyIn0.TJVA95OrM7E2cBab30RMHrHDcEfxjoYZgeFONFh7HgQ";
    const extractedUser = extractUserFromToken(fakeToken) || {
      id: 1,
      fullName: name,
      email,
      role: "user",
    };

    setUser(extractedUser);
    setToken(fakeToken);

    return { user: extractedUser, token: fakeToken };
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    saveAuth({ user: null, token: null });

    // Clear refresh timer
    if (refreshTimerRef.current) {
      clearTimeout(refreshTimerRef.current);
    }
  };

  // Get user role
  const getUserRole = () => {
    return extractRole(token, user);
  };

  // Check if user is admin
  const isAdmin = () => {
    const role = getUserRole();
    return role === "admin";
  };

  const value = {
    user,
    token,
    isAuthenticated: !!token,
    login,
    register,
    logout,
    getUserRole,
    isAdmin,
    refreshAccessToken,
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


