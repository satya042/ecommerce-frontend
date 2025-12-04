import "./App.css";
import React, { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Client/Home";
import Products from "./pages/Client/Products";
const ProductDetails = lazy(() => import("./pages/Client/ProductDetails"));
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
const Checkout = lazy(() => import("./pages/Checkout/Checkout"));
const Profile = lazy(() => import("./pages/Profile/Profile"));
const Orders = lazy(() => import("./pages/Profile/Orders"));
const OrderDetails = lazy(() => import("./pages/Profile/OrderDetails"));
const NotFound = lazy(() => import("./pages/NotFound"));
import AdminDashboard from "./pages/Admin/AdminDashboard";
import ManageOrders from "./pages/Admin/ManageOrders";
import ManageProducts from "./pages/Admin/ManageProducts";
import ManageUsers from "./pages/Admin/ManageUsers";

const ThemeToggle = () => {
  const { mode, toggleTheme } = useTheme();
  return (
    <button className="theme-toggle" onClick={toggleTheme}>
      {mode === "light" ? "Dark" : "Light"} mode
    </button>
  );
};

function AppInner() {
  return (
    <div className="app">
      <Navbar />
      <main className="app-main">
        <Suspense fallback={<div style={{ padding: "2rem" }}>Loading...</div>}>
          {/* Client routes temporarily commented to preview admin UI */}
          
          <Routes>
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

            <Route path="*" element={<NotFound />} />
          </Routes>
          
          {/* <Routes>
            <Route path="/" element={<AdminDashboard />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/products" element={<ManageProducts />} />
            <Route path="/admin/orders" element={<ManageOrders />} />
            <Route path="/admin/users" element={<ManageUsers />} />
            <Route path="*" element={<AdminDashboard />} />
          </Routes> */}
        </Suspense>
      </main>
      <Footer />
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
