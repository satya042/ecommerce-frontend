import React from "react";
import { Link } from "react-router-dom";
import styles from "./styles/ProductCard.module.css";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { useToast } from "../context/ToastContext";

const ProductCard = ({
  id,
  image,
  title,
  category,
  price,
  salePrice,
  rating,
}) => {
  const { addToCart } = useCart();
  const { addToWishlist } = useWishlist();
  const { showToast } = useToast();

  const handleAddToCart = () => {
    addToCart(
      {
        id,
        image,
        title,
        category,
        price,
        salePrice,
      },
      1
    );
    showToast("Added to cart", "success");
  };

  const handleAddToWishlist = () => {
    addToWishlist({ id, image, title, category, price, salePrice });
    showToast("Added to wishlist", "success");
  };

  return (
    <div className={styles.product_card}>
      <Link to={`/products/${id}`}>
        <img src={image} alt={title} loading="lazy" />
      </Link>
      <span className={styles.category_p}>{category}</span>
      <h3>
        <Link to={`/products/${id}`}>{title}</Link>
      </h3>
      <div className={styles.rating}>
        {Array(5)
          .fill(null)
          .map((_, i) => (
            <span key={i} className={styles.star}>
              {i < (rating || 0) ? "★" : "☆"}
            </span>
          ))}
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
      <div className={styles.product_actions}>
        <button type="button" onClick={handleAddToCart}>
          Add to cart
        </button>
        <button type="button" onClick={handleAddToWishlist}>
          ♥
        </button>
      </div>
    </div>
  );
};

export default ProductCard;