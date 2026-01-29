import React from "react";
import { Link } from "react-router-dom";
import styles from "../styles/HeroSlideOne.module.css";
import homeImage from "../../../assets/logos/organic-products-hero.png";
import homeLeaf from "../../../assets/logos/logo-leaf-new.png";
import { HiShoppingCart } from "react-icons/hi";

const HeroSlideOne = () => {
  return (
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
  );
};

export default HeroSlideOne;
