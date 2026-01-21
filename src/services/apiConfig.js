/**
 * API Configuration for Backend Integration
 * Base URL: http://localhost:8080/admin/app/ecommerce
 * 
 * This file maps frontend URLs to backend API endpoints
 */

const BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:8080/admin/app/ecommerce";

export const API_ENDPOINTS = {
  // Product Management
  PRODUCTS: {
    GET_ALL: `${BASE_URL}/products`, // GET - Fetch all products
    GET_ONE: (id) => `${BASE_URL}/products/${id}`, // GET - Fetch single product
    CREATE: `${BASE_URL}/add-products`, // POST - Add new product
    UPDATE: (id) => `${BASE_URL}/products/${id}`, // PUT - Update product
    DELETE: (id) => `${BASE_URL}/products/${id}`, // DELETE - Delete product
    SEARCH: `${BASE_URL}/products/search`, // GET - Search products
  },

  // User Management
  USERS: {
    GET_ALL: `${BASE_URL}/users`, // GET - Fetch all users
    GET_ONE: (id) => `${BASE_URL}/users/${id}`, // GET - Fetch single user
    UPDATE: (id) => `${BASE_URL}/users/${id}`, // PUT - Update user
    DELETE: (id) => `${BASE_URL}/users/${id}`, // DELETE - Delete user
  },

  // Order Management
  ORDERS: {
    GET_ALL: `${BASE_URL}/orders`, // GET - Fetch all orders
    GET_ONE: (id) => `${BASE_URL}/orders/${id}`, // GET - Fetch single order
    UPDATE_STATUS: (id) => `${BASE_URL}/orders/${id}/status`, // PUT - Update order status
  },

  // Dashboard Stats
  DASHBOARD: {
    STATS: `${BASE_URL}/dashboard/stats`, // GET - Dashboard statistics
  },
};

/**
 * API Request Helper with error handling
 * Usage: apiRequest(API_ENDPOINTS.PRODUCTS.GET_ALL)
 */
export const apiRequest = async (
  url,
  options = { method: "GET", headers: {} }
) => {
  try {
    const defaultHeaders = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
    };

    const response = await fetch(url, {
      ...options,
      headers: { ...defaultHeaders, ...options.headers },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("API Request Error:", error);
    throw error;
  }
};

/**
 * Specific API Methods for common operations
 */
export const api = {
  // Products
  getAllProducts: () =>
    apiRequest(API_ENDPOINTS.PRODUCTS.GET_ALL),
  
  getProduct: (id) =>
    apiRequest(API_ENDPOINTS.PRODUCTS.GET_ONE(id)),
  
  createProduct: (data) =>
    apiRequest(API_ENDPOINTS.PRODUCTS.CREATE, {
      method: "POST",
      body: JSON.stringify(data),
    }),
  
  updateProduct: (id, data) =>
    apiRequest(API_ENDPOINTS.PRODUCTS.UPDATE(id), {
      method: "PUT",
      body: JSON.stringify(data),
    }),
  
  deleteProduct: (id) =>
    apiRequest(API_ENDPOINTS.PRODUCTS.DELETE(id), {
      method: "DELETE",
    }),

  searchProducts: (query) =>
    apiRequest(`${API_ENDPOINTS.PRODUCTS.SEARCH}?q=${query}`),

  // Users
  getAllUsers: () =>
    apiRequest(API_ENDPOINTS.USERS.GET_ALL),
  
  getUser: (id) =>
    apiRequest(API_ENDPOINTS.USERS.GET_ONE(id)),
  
  updateUser: (id, data) =>
    apiRequest(API_ENDPOINTS.USERS.UPDATE(id), {
      method: "PUT",
      body: JSON.stringify(data),
    }),
  
  deleteUser: (id) =>
    apiRequest(API_ENDPOINTS.USERS.DELETE(id), {
      method: "DELETE",
    }),

  // Orders
  getAllOrders: () =>
    apiRequest(API_ENDPOINTS.ORDERS.GET_ALL),
  
  getOrder: (id) =>
    apiRequest(API_ENDPOINTS.ORDERS.GET_ONE(id)),
  
  updateOrderStatus: (id, status) =>
    apiRequest(API_ENDPOINTS.ORDERS.UPDATE_STATUS(id), {
      method: "PUT",
      body: JSON.stringify({ status }),
    }),

  // Dashboard
  getDashboardStats: () =>
    apiRequest(API_ENDPOINTS.DASHBOARD.STATS),
};

export default api;
