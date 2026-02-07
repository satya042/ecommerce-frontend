import "./App.css";
import React, { Suspense, lazy } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./features/client/Home";
import Products from "./features/client/Products";
import Navbar from "./shared/components/Navbar/Navbar";
import Footer from "./shared/components/Footer/Footer";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import { WishlistProvider } from "./context/WishlistContext";
import { ThemeProvider, useTheme } from "./context/ThemeContext";
import { ToastProvider } from "./context/ToastContext";
import { ReviewsProvider } from "./context/ReviewsContext";
import Login from "./features/auth/Login";
import Register from "./features/auth/Register";
import ForgotPassword from "./features/auth/ForgotPassword";
import Cart from "./pages/Cart";
import Wishlist from "./pages/Wishlist";
import ContactUs from "./pages/ContactUs";
import Coupons from "./pages/Coupons";
import SavedCards from "./pages/SavedCards";
import SavedAddresses from "./pages/SavedAddresses";

import AdminDashboard from "./features/admin/components/AdminDashboard";
const ProductDetails = lazy(() => import("./features/client/ProductDetails"));
const Checkout = lazy(() => import("./pages/Checkout"));
const Profile = lazy(() => import("./pages/Profile"));
const Orders = lazy(() => import("./pages/Orders"));
const OrderDetails = lazy(() => import("./pages/OrderDetails"));
const NotFound = lazy(() => import("./shared/NotFound"));

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

            <Route path="/contact" element={<ContactUs />} />
            <Route path="/coupons" element={<Coupons />} />
            <Route path="/saved-cards" element={<SavedCards />} />
            <Route path="/saved-addresses" element={<SavedAddresses />} />

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
