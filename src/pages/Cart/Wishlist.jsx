import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useWishlist } from "../../context/WishlistContext";
import { useCart } from "../../context/CartContext";
import { useToast } from "../../context/ToastContext";
import styles from "./styles/Wishlist.module.css";

const Wishlist = () => {
  const { items, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const moveToCart = (item) => {
    addToCart(item, 1);
    removeFromWishlist(item.id);
    showToast("Moved to cart", "success");
  };

  if (!items.length) {
    return (
      <div
        style={{
          minHeight: "60vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "2rem 1rem",
        }}
      >
        <h2 style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>
          Your wishlist is empty
        </h2>
        <p style={{ marginBottom: "1rem", color: "#6b7280" }}>
          Save items you love and move them to cart anytime.
        </p>
        <button
          type="button"
          onClick={() => navigate("/products")}
          style={{
            padding: "0.5rem 1.5rem",
            borderRadius: "9999px",
            border: "none",
            backgroundColor: "#679830",
            color: "#fff",
          }}
        >
          Browse products
        </button>
      </div>
    );
  }

  return (
    <div className={styles.wishlist_container}>
      <h1 className={styles.wishlist_title}>My Wishlist</h1>
      <div className={styles.wishlist_grid}>
        {items.map((item) => (
          <div key={item.id} className={styles.wishlist_item}>
            <img
              src={item.image}
              alt={item.title}
              loading="lazy"
              className={styles.wishlist_item_image}
            />
            <div className={styles.wishlist_item_name}>{item.title}</div>
            <div className={styles.wishlist_item_price}>
              {item.salePrice || item.price}
            </div>
            <div
              style={{
                display: "flex",
                gap: "0.5rem",
                marginTop: "0.75rem",
              }}
            >
              <button
                type="button"
                onClick={() => moveToCart(item)}
                className={styles.add_to_cart_button}
              >
                Move to cart
              </button>
              <button
                type="button"
                onClick={() => removeFromWishlist(item.id)}
                className={styles.remove_button}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wishlist;


