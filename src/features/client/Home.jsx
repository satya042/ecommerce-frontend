import React from "react";
import styles from "./styles/Home.module.css";
import ProductCard from "./ProductCard";
import FeatureCard from "./FeatureCard";
import HeroCarousel from "./components/HeroCarousel";
import { heroSlides } from "./config/heroSlidesConfig";
import { bestSellingproducts, features } from "../../configs/ecommerce";
import homeLeaf from "../../assets/logos/logo-leaf-new.png";

const Home = () => {
  return (
    <div className={styles.block_container}>
      {/* Hero Carousel */}
      <HeroCarousel slides={heroSlides} autoPlay={true} autoPlayInterval={6000} />

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
