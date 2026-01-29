import React from "react";
import { Link } from "react-router-dom";
import styles from "../styles/HeroSlideTwo.module.css";
import productImage from "../../../assets/logos/product-thumb-1.png";

const HeroSlideTwo = () => {
  return (
    <div className={styles.slide_section}>
      <div className={styles.slide_container}>
        {/* Left Content Section */}
        <div className={styles.slide_content}>
          <div className={styles.label}>100% Natural</div>
          
          <h1 className={styles.main_heading}>
            Fresh Smoothie<br />
            & Summer Juice
          </h1>
          
          <p className={styles.description}>
            Refresh yourself with our freshly made organic smoothies and premium summer juices. 
            Pure ingredients, pure taste, pure health. Experience the perfect blend of nature's 
            finest fruits in every sip.
          </p>
          
          <Link to="/products" className={styles.cta_button}>
            SHOP NOW
          </Link>
        </div>

        {/* Right Image Section */}
        <div className={styles.image_section}>
          <div className={styles.image_wrapper}>
            <img 
              src={productImage} 
              alt="Fresh smoothie bottle" 
              className={styles.product_image} 
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSlideTwo;
