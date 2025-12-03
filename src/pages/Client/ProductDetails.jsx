import React from 'react'
import styles from './styles/ProductDetails.module.css';
import { Link} from 'react-router-dom';
import product_image from '../../assets/products/sanitizer-400x400.jpg';
import ProductCard from '../../components/ProductCard';
import { bestSellingproducts } from '../../configs/ecommerce';


const ProductDetils = () => {
  return (
    <div className={styles.home_container}>
    <div className={styles.home_section}>
      <img
        src={product_image}
        alt="Organic products"
        className={styles.home_image}
      />
      <div className={styles.home_content}>
        <h1 className={styles.home_title}>Hand Sanitizer</h1>
        <p className={styles.home_description}>
        Neque porro quisquam est, qui dolore ipsum quia dolor sit amet, consectetur adipisci velit, sed quia non incidunt lores ta porro ame. numquam eius modi tempora incidunt lores ta porro ame.
        </p>
        <h1 className={styles.home_price}>£15.00</h1>
        <Link to="/shop" className={styles.home_button}>
          Add to cart
        </Link>
      </div>
    </div>
    <div className={styles.best_selling_products}>
    <h2>Related products</h2>
    <div className={styles.products}>
      {bestSellingproducts.map((product) => (
        <ProductCard key={product.title} {...product} />
      ))}
    </div>
  </div>
</div>
  )
}

export default ProductDetils