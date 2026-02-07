import axios from "axios";
import { isTokenExpired } from "../utils/jwtUtils";

// ============================================
// BASE URL CONFIGURATION
// ============================================
export const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || "http://localhost:9001";

// ============================================
// AXIOS INSTANCE
// ============================================
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // Include cookies in requests
});

// Flag to prevent multiple refresh requests
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  isRefreshing = false;
  failedQueue = [];
};

// Request Interceptor: Attach JWT automatically
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("authToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response Interceptor: Handle token refresh
apiClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return apiClient(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      return new Promise((resolve, reject) => {
        refreshAccessToken()
          .then((newToken) => {
            localStorage.setItem("authToken", newToken);
            originalRequest.headers.Authorization = `Bearer ${newToken}`;
            processQueue(null, newToken);
            resolve(apiClient(originalRequest));
          })
          .catch((err) => {
            processQueue(err, null);
            // Clear auth on refresh failure
            localStorage.removeItem("authToken");
            localStorage.removeItem("ecom_auth");
            window.location.href = "/login";
            reject(err);
          });
      });
    }

    const message =
      error?.response?.data?.message ||
      error?.message ||
      "Something went wrong";
    return Promise.reject(message);
  }
);

/**
 * Refresh access token using refresh endpoint
 */
const refreshAccessToken = async () => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/api/auth/refresh`,
      {},
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const newToken = response.data?.accessToken || response.data?.token;

    if (!newToken) {
      throw new Error("No access token in refresh response");
    }

    return newToken;
  } catch (error) {
    console.error("Error refreshing token:", error);
    throw error;
  }
};

export default apiClient;

// ============================================
// ENDPOINTS CONSTANTS
// ============================================
export const AUTH_ENDPOINTS = {
  REGISTER: "/api/auth/register",
  LOGIN: "/api/auth/login",
  LOGOUT: "/api/auth/logout",
  REFRESH: "/api/auth/refresh",
};

export const CLIENT_ENDPOINTS = {
  PRODUCTS: "/api/products",
  CART: "/api/cart",
  ORDERS: "/api/orders",
  USER_PROFILE: "/api/user/profile",
};

export const ADMIN_ENDPOINTS = {
  PRODUCTS: "/admin/app/ecommerce/products",
  USERS: "/admin/app/ecommerce/users",
  ORDERS: "/admin/app/ecommerce/orders",
};

// ============================================
// HELPER FUNCTION: Make API Requests
// ============================================
export const makeApiRequest = async (method, url, data = null, config = {}) => {
  const response = await apiClient({
    method,
    url,
    data,
    ...config,
  });
  return response;
};

// ============================================
// MODULAR API OBJECTS
// ============================================

export const authAPI = {
  register: (data) => makeApiRequest("POST", AUTH_ENDPOINTS.REGISTER, data),
  login: (data) => makeApiRequest("POST", AUTH_ENDPOINTS.LOGIN, data),
  logout: () => makeApiRequest("POST", AUTH_ENDPOINTS.LOGOUT),
  refresh: () => makeApiRequest("POST", AUTH_ENDPOINTS.REFRESH),
};

export const productAPI = {
  getProducts: () => makeApiRequest("GET", CLIENT_ENDPOINTS.PRODUCTS),
  getProduct: (id) =>
    makeApiRequest("GET", `${CLIENT_ENDPOINTS.PRODUCTS}/${id}`),
};

export const cartAPI = {
  getCart: () => makeApiRequest("GET", CLIENT_ENDPOINTS.CART),
  addToCart: (data) => makeApiRequest("POST", CLIENT_ENDPOINTS.CART, data),
};

export const orderAPI = {
  createOrder: (data) => makeApiRequest("POST", CLIENT_ENDPOINTS.ORDERS, data),
  getOrders: () => makeApiRequest("GET", CLIENT_ENDPOINTS.ORDERS),
  getOrder: (id) =>
    makeApiRequest("GET", `${CLIENT_ENDPOINTS.ORDERS}/${id}`),
};

export const userAPI = {
  getProfile: () => makeApiRequest("GET", CLIENT_ENDPOINTS.USER_PROFILE),
  updateProfile: (data) =>
    makeApiRequest("PUT", CLIENT_ENDPOINTS.USER_PROFILE, data),
};

export const adminAPI = {
  getProducts: () => makeApiRequest("GET", ADMIN_ENDPOINTS.PRODUCTS),
  createProduct: (data) =>
    makeApiRequest("POST", ADMIN_ENDPOINTS.PRODUCTS, data),
  updateProduct: (id, data) =>
    makeApiRequest("PUT", `${ADMIN_ENDPOINTS.PRODUCTS}/${id}`, data),
  deleteProduct: (id) =>
    makeApiRequest("DELETE", `${ADMIN_ENDPOINTS.PRODUCTS}/${id}`),

  getUsers: () => makeApiRequest("GET", ADMIN_ENDPOINTS.USERS),
  getUser: (id) => makeApiRequest("GET", `${ADMIN_ENDPOINTS.USERS}/${id}`),
  updateUser: (id, data) =>
    makeApiRequest("PUT", `${ADMIN_ENDPOINTS.USERS}/${id}`, data),
  deleteUser: (id) =>
    makeApiRequest("DELETE", `${ADMIN_ENDPOINTS.USERS}/${id}`),

  getOrders: () => makeApiRequest("GET", ADMIN_ENDPOINTS.ORDERS),
  getOrder: (id) =>
    makeApiRequest("GET", `${ADMIN_ENDPOINTS.ORDERS}/${id}`),
  updateOrder: (id, data) =>
    makeApiRequest("PUT", `${ADMIN_ENDPOINTS.ORDERS}/${id}`, data),
};
