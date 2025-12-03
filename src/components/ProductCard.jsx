import React from 'react';
import styles from "./styles/styles.module.css"

const ProductCard = ({ image, title, category, price, rating, salePrice }) => {
  return (
    <div className={styles.product_card}>
    <img src={image} alt={title} />
    <span className={styles.category_p}>{category}</span>
    <h3>{title}</h3>
    <div className={styles.rating}>
      {Array(5).fill(null).map((_, i) => (
        <span key={i} className={styles.star}>★</span>))}
    </div>
    <p className={styles.price}>
      {salePrice ? (
        <>
          <span className={styles.original_price}>{price}</span>
          <span className={styles.sale_price}>{salePrice}</span>
        </>
      ) : (
        price
      )}
    </p>
  </div>
  )
}

export default ProductCard