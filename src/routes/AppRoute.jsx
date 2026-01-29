import { Routes, Route } from "react-router-dom";
import Home from "../features/client/Home";
import Products from "../features/client/Products";
import ProductDetails from "../features/client/ProductDetails";
import Navbar from "../shared/components/Navbar/Navbar";
import Footer from "../shared/components/Footer/Footer";

const AppRoutes = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetails />} />
      </Routes>
      <Footer />
    </>
  );
};

export default AppRoutes;