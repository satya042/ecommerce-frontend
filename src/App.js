import "./App.css";
import React, { Suspense, lazy } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Client/Home";
import Products from "./pages/Client/Products";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import { WishlistProvider } from "./context/WishlistContext";
import { ThemeProvider, useTheme } from "./context/ThemeContext";
import { ToastProvider } from "./context/ToastContext";
import { ReviewsProvider } from "./context/ReviewsContext";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import Cart from "./pages/Cart/Cart";
import Wishlist from "./pages/Cart/Wishlist";

import AdminDashboard from "./pages/Admin/AdminDashboard";
const ProductDetails = lazy(() => import("./pages/Client/ProductDetails"));
const Checkout = lazy(() => import("./pages/Checkout/Checkout"));
const Profile = lazy(() => import("./pages/Profile/Profile"));
const Orders = lazy(() => import("./pages/Profile/Orders"));
const OrderDetails = lazy(() => import("./pages/Profile/OrderDetails"));
const NotFound = lazy(() => import("./pages/NotFound"));

const ThemeToggle = () => {
  const { mode, toggleTheme } = useTheme();
  return (
    <button className="theme-toggle" onClick={toggleTheme}>
      {mode === "light" ? "Dark" : "Light"} mode
    </button>
  );
};

function AppInner() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin/app/ecommerce");

  return (
    <div className="app">
      {!isAdminRoute && <Navbar />}
      <main className="app-main">
        <Suspense fallback={<div style={{ padding: "2rem" }}>Loading...</div>}>
          <Routes>
            {/* Client Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:id" element={<ProductDetails />} />

            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />

            <Route path="/cart" element={<Cart />} />
            <Route path="/wishlist" element={<Wishlist />} />

            <Route path="/checkout" element={<Checkout />} />

            <Route path="/profile/*" element={<Profile />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/orders/:id" element={<OrderDetails />} />

            {/* Admin Routes - Backend API base: http://localhost:8080/admin/app/ecommerce */}
            <Route path="/admin/app/ecommerce" element={<AdminDashboard />} />
            <Route path="/admin/app/ecommerce/dashboard" element={<AdminDashboard />} />
            {/* <Route path="/admin/app/ecommerce/add-products" element={<AddProductPage />} />
            <Route path="/admin/app/ecommerce/products-list" element={<ManageProducts />} />
            <Route path="/admin/app/ecommerce/manage-products" element={<ManageProducts />} />
            <Route path="/admin/app/ecommerce/manage-orders" element={<ManageOrders />} />
            <Route path="/admin/app/ecommerce/manage-users" element={<ManageUsers />} /> */}
            <Route path="/admin/app/ecommerce/add-products" element={<AdminDashboard />} />
            <Route path="/admin/app/ecommerce/products-list" element={<AdminDashboard />} />
            <Route path="/admin/app/ecommerce/manage-products" element={<AdminDashboard />} />
            <Route path="/admin/app/ecommerce/manage-orders" element={<AdminDashboard />} />
            <Route path="/admin/app/ecommerce/manage-users" element={<AdminDashboard />} />

            {/* Fallback */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
      {!isAdminRoute && <Footer />}
      {/* <ThemeToggle /> */}
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <AuthProvider>
          <CartProvider>
            <WishlistProvider>
              <ReviewsProvider>
                <AppInner />
              </ReviewsProvider>
            </WishlistProvider>
          </CartProvider>
        </AuthProvider>
      </ToastProvider>
    </ThemeProvider>
  );
}

export default App;
