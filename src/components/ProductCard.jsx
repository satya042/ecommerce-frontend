import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./styles/ProductCard.module.css";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { useToast } from "../context/ToastContext";
import { FiHeart } from "react-icons/fi";
import { AiOutlineStar } from "react-icons/ai";

const ProductCard = ({
  id,
  image,
  title,
  category,
  price,
  salePrice,
  rating,
}) => {
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const { addToCart } = useCart();
  const { addToWishlist } = useWishlist();
  const { showToast } = useToast();

  // Convert string prices to numbers (handle both "£25.00" and 25 formats)
  const priceNum = typeof price === 'string' ? parseFloat(price.replace(/[^\d.]/g, '')) : parseFloat(price);
  const salePriceNum = salePrice ? (typeof salePrice === 'string' ? parseFloat(salePrice.replace(/[^\d.]/g, '')) : parseFloat(salePrice)) : null;

  const discountPercentage = salePriceNum && priceNum ? Math.round(((priceNum - salePriceNum) / priceNum) * 100) : 0;

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
      quantity
    );
    showToast("Added to cart", "success");
    setQuantity(1);
  };

  const handleAddToWishlist = () => {
    addToWishlist({ id, image, title, category, price, salePrice });
    setIsWishlisted(!isWishlisted);
    showToast(isWishlisted ? "Removed from wishlist" : "Added to wishlist", "success");
  };

  const handleIncrement = () => setQuantity(quantity + 1);
  const handleDecrement = () => quantity > 1 && setQuantity(quantity - 1);

  return (
    <div className={styles.product_card}>
      {/* Image Section */}
      <div className={styles.image_container}>
        {/* Discount Badge */}
        {discountPercentage > 0 && (
          <div className={styles.discount_badge}>{discountPercentage}%</div>
        )}

        {/* Wishlist Button */}
        <button
          className={`${styles.wishlist_btn} ${isWishlisted ? styles.wishlisted : ''}`}
          onClick={handleAddToWishlist}
          title={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
        >
          <FiHeart size={20} />
        </button>

        {/* Product Image */}
        <Link to={`/products/${id}`}>
          <img src={image} alt={title} loading="lazy" />
        </Link>
      </div>

      {/* Product Details */}
      <div className={styles.product_details}>
        <h3 className={styles.product_name}>
          <Link to={`/products/${id}`}>{title}</Link>
        </h3>

        <div className={styles.product_meta}>
          <span className={styles.unit_text}>1 UNIT</span>
          <div className={styles.rating_container}>
            <AiOutlineStar className={styles.star_icon} />
            <span className={styles.rating_value}>{(rating || 0).toFixed(1)}</span>
          </div>
        </div>

        {/* Price */}
        <p className={styles.price}>
          {salePrice ? (
            <span className={styles.sale_price}>${salePrice}</span>
          ) : (
            <span className={styles.sale_price}>${price}</span>
          )}
        </p>

        {/* Actions Section */}
        <div className={styles.actions_section}>
          {/* Quantity Selector */}
          <div className={styles.quantity_selector}>
            <button className={styles.qty_btn} onClick={handleDecrement}>−</button>
            <span className={styles.qty_value}>{quantity}</span>
            <button className={styles.qty_btn} onClick={handleIncrement}>+</button>
          </div>

          {/* Add to Cart */}
          <button className={styles.add_to_cart_btn} onClick={handleAddToCart}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;