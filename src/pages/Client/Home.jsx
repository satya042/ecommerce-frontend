import React from "react";
import { Link } from "react-router-dom";
import styles from "./styles/Home.module.css";
import homeImage from "../../assets/logos/organic-products-hero.png";
import homeLeaf from "../../assets/logos/logo-leaf-new.png";
import logo from "../../assets/logos/organic-store-logo5.svg";
import ProductCard from "../../components/ProductCard";
import FeatureCard from "../../components/FeatureCard";
import { bestSellingproducts,features } from "../../configs/ecommerce";
import { HiShoppingCart} from "react-icons/hi";


const Home = () => {
  return (
    <div className={styles.block_container}>
      {/* Hero Section */}
      <div className={styles.block_section}>
        <img src={homeImage} alt="Organic products" className={styles.homeImage} />
        <div className={styles.block_content}>
          <img src={homeLeaf} alt="Organic products" className={styles.homeLeaf} />
          <h1 className={styles.block_title}>Welcome to Our Organic Store</h1>
          <p className={styles.block_description}>
            Discover the finest organic fruits, vegetables, and groceries.
          </p>
          <Link to="/products" className={styles.homeButton}>
           <HiShoppingCart className={styles.button_icon} /> 
           <span className={styles.button_text}>SHOP NOW</span>
          </Link>
        </div>
      </div>

      {/* Features Section */}
      <div className={styles.app}>
        <div className={styles.features}>
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </div>

      {/* Best Selling Products */}
      <div className={styles.bestSellingProducts}>
        <div className={styles.bestSellingProductsTitle}>Best Selling Products
          <img src={homeLeaf} alt="Organic products"/>
        </div>
        <div className={styles.products}>
          {bestSellingproducts.map((product) => (
            <ProductCard key={product.title} {...product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
