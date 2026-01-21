/**
 * API Configuration
 * Centralized configuration for all API endpoints
 * 
 * To change the base URL for all APIs in the future:
 * Simply modify the API_BASE_URL variable below
 */

// ============================================
// BASE URL CONFIGURATION
// ============================================
// Change this URL to update all API endpoints at once
export const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:8081";

// ============================================
// AUTH ENDPOINTS
// ============================================
export const AUTH_ENDPOINTS = {
  REGISTER: `${API_BASE_URL}/api/auth/register`,
  LOGIN: `${API_BASE_URL}/api/auth/login`,
  LOGOUT: `${API_BASE_URL}/api/auth/logout`,
  FORGOT_PASSWORD: `${API_BASE_URL}/api/auth/forgot-password`,
  RESET_PASSWORD: `${API_BASE_URL}/api/auth/reset-password`,
  VERIFY_EMAIL: `${API_BASE_URL}/api/auth/verify-email`,
  REFRESH_TOKEN: `${API_BASE_URL}/api/auth/refresh-token`,
};

// ============================================
// ADMIN ENDPOINTS
// ============================================
export const ADMIN_ENDPOINTS = {
  PRODUCTS: `${API_BASE_URL}/admin/app/ecommerce/products`,
  ORDERS: `${API_BASE_URL}/admin/app/ecommerce/orders`,
  USERS: `${API_BASE_URL}/admin/app/ecommerce/users`,
  DASHBOARD: `${API_BASE_URL}/admin/app/ecommerce/dashboard`,
};

// ============================================
// CLIENT ENDPOINTS
// ============================================
export const CLIENT_ENDPOINTS = {
  PRODUCTS: `${API_BASE_URL}/api/products`,
  PRODUCT_DETAILS: (id) => `${API_BASE_URL}/api/products/${id}`,
  CART: `${API_BASE_URL}/api/cart`,
  WISHLIST: `${API_BASE_URL}/api/wishlist`,
  ORDERS: `${API_BASE_URL}/api/orders`,
  ORDER_DETAILS: (id) => `${API_BASE_URL}/api/orders/${id}`,
};

// ============================================
// API REQUEST CONFIGURATION
// ============================================
export const API_CONFIG = {
  timeout: 10000, // 10 seconds
  headers: {
    "Content-Type": "application/json",
  },
};

// ============================================
// HELPER FUNCTION: Make API Requests
// ============================================
/**
 * Generic API request helper
 * @param {string} url - The endpoint URL
 * @param {string} method - HTTP method (GET, POST, PUT, DELETE)
 * @param {object} data - Request body data
 * @param {object} headers - Additional headers
 * @returns {Promise} Response data
 */
export const makeApiRequest = async (
  url,
  method = "GET",
  data = null,
  headers = {}
) => {
  try {
    const options = {
      method,
      headers: {
        ...API_CONFIG.headers,
        ...headers,
      },
    };

    // Add body for non-GET requests
    if (data && method !== "GET") {
      options.body = JSON.stringify(data);
    }

    // Add timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), API_CONFIG.timeout);

    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    // Handle non-2xx responses
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.message ||
          `API Error: ${response.status} ${response.statusText}`
      );
    }

    return await response.json();
  } catch (error) {
    console.error("API Request Error:", error);
    throw error;
  }
};

// ============================================
// AUTHENTICATION API SERVICE
// ============================================
export const authAPI = {
  /**
   * Register a new user
   * @param {object} SignupRequest - { fullName, email, password, gender, avatar, phone }
   * @returns {Promise} Response with user data and token
   */
  register: async (signupRequest) => {
    return makeApiRequest(AUTH_ENDPOINTS.REGISTER, "POST", signupRequest);
  },

  /**
   * Login user
   * @param {object} loginRequest - { email, password }
   * @returns {Promise} Response with user data and token
   */
  login: async (loginRequest) => {
    return makeApiRequest(AUTH_ENDPOINTS.LOGIN, "POST", loginRequest);
  },

  /**
   * Logout user
   * @returns {Promise} Logout confirmation
   */
  logout: async () => {
    return makeApiRequest(AUTH_ENDPOINTS.LOGOUT, "POST");
  },

  /**
   * Request password reset
   * @param {object} request - { email }
   * @returns {Promise} Reset email sent confirmation
   */
  forgotPassword: async (request) => {
    return makeApiRequest(AUTH_ENDPOINTS.FORGOT_PASSWORD, "POST", request);
  },

  /**
   * Reset password with token
   * @param {object} request - { token, newPassword, confirmPassword }
   * @returns {Promise} Password reset confirmation
   */
  resetPassword: async (request) => {
    return makeApiRequest(AUTH_ENDPOINTS.RESET_PASSWORD, "POST", request);
  },

  /**
   * Verify email
   * @param {object} request - { token }
   * @returns {Promise} Email verification confirmation
   */
  verifyEmail: async (request) => {
    return makeApiRequest(AUTH_ENDPOINTS.VERIFY_EMAIL, "POST", request);
  },
};

// ============================================
// ENVIRONMENT-SPECIFIC CONFIGURATION
// ============================================
export const isDevelopment = process.env.NODE_ENV === "development";
export const isProduction = process.env.NODE_ENV === "production";

// Log API base URL in development
if (isDevelopment) {
  console.log("API Base URL:", API_BASE_URL);
}
