import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Products from "./pages/Client/Products";
import Home from "./pages/Client/Home";
import Footer from "./components/Footer";
import ProductDetails from "./pages/Client/ProductDetails";
import Navbar from "./components/Navbar";
import AdminDashboard from "./pages/Admin/AdminDashboard";

function App() {
  return (
    <div className="app">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetails />} />
      </Routes>
      <Footer />
      {/* <AdminDashboard/> */}
    </div>
  );
}

export default App;
