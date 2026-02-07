/**
 * JWT Token Utility
 * Handles JWT token extraction, parsing, and analysis
 */

/**
 * Decode JWT token and extract payload
 * @param {string} token - JWT token
 * @returns {Object|null} - Decoded payload or null if invalid
 */
export const decodeToken = (token) => {
  try {
    if (!token || typeof token !== "string") {
      return null;
    }

    // JWT format: header.payload.signature
    const parts = token.split(".");
    if (parts.length !== 3) {
      console.warn("Invalid JWT format");
      return null;
    }

    // Decode payload (second part)
    const payload = parts[1];
    // Add padding if needed
    const padded = payload + "=".repeat((4 - (payload.length % 4)) % 4);
    const decoded = JSON.parse(atob(padded));

    return decoded;
  } catch (error) {
    console.error("Failed to decode JWT:", error);
    return null;
  }
};

/**
 * Extract user information from JWT token
 * @param {string} token - JWT token
 * @returns {Object|null} - User object with username, id, fullName, role
 */
export const extractUserFromToken = (token) => {
  const payload = decodeToken(token);

  if (!payload) {
    return null;
  }

  return {
    username: payload.username || payload.email || payload.sub || null,
    id: payload.id || payload.sub || null,
    fullName: payload.fullName || payload.name || null,
    email: payload.email || null,
    role: payload.role || null,
    // Include other relevant fields
    ...payload,
  };
};

/**
 * Check if token is expired
 * @param {string} token - JWT token
 * @returns {boolean} - True if expired, false otherwise
 */
export const isTokenExpired = (token) => {
  const payload = decodeToken(token);

  if (!payload || !payload.exp) {
    return true;
  }

  // exp is in seconds, Date.now() is in milliseconds
  const currentTime = Math.floor(Date.now() / 1000);
  return payload.exp < currentTime;
};

/**
 * Get time until token expiration
 * @param {string} token - JWT token
 * @returns {number} - Milliseconds until expiration, -1 if invalid
 */
export const getTokenExpirationTime = (token) => {
  const payload = decodeToken(token);

  if (!payload || !payload.exp) {
    return -1;
  }

  const currentTime = Math.floor(Date.now() / 1000);
  const timeUntilExpiration = (payload.exp - currentTime) * 1000; // Convert to milliseconds

  return Math.max(0, timeUntilExpiration);
};

/**
 * Get refresh time (refresh before expiration)
 * By default, refresh when 5 minutes are left
 * @param {string} token - JWT token
 * @param {number} bufferTime - Buffer time in milliseconds (default: 5 minutes)
 * @returns {number} - Time to wait before refreshing
 */
export const getRefreshTime = (token, bufferTime = 5 * 60 * 1000) => {
  const timeUntilExpiration = getTokenExpirationTime(token);

  if (timeUntilExpiration === -1) {
    return -1;
  }

  // Refresh when this much time is left
  return Math.max(0, timeUntilExpiration - bufferTime);
};

export default {
  decodeToken,
  extractUserFromToken,
  isTokenExpired,
  getTokenExpirationTime,
  getRefreshTime,
};
