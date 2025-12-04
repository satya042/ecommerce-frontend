import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import styles from "./styles/Cart.module.css";

const Cart = () => {
  const { items, totals, updateQuantity, removeFromCart } = useCart();
  const navigate = useNavigate();

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
          Your cart is empty
        </h2>
        <p style={{ marginBottom: "1rem", color: "#6b7280" }}>
          Start adding some organic goodness to your basket.
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
          Continue shopping
        </button>
      </div>
    );
  }

  return (
    <div className={styles.cart_container}>
      <h1 className={styles.cart_title}>Shopping Cart</h1>
      <div className={styles.cart_content}>
        <div className={styles.cart_items}>
          {items.map((item) => (
            <div key={item.id} className={styles.cart_item}>
              <img
                src={item.image}
                alt={item.title}
                loading="lazy"
                className={styles.cart_item_image}
              />
              <div className={styles.cart_item_details}>
                <div className={styles.cart_item_name}>{item.title}</div>
                <div className={styles.cart_item_price}>
                  £{(item.priceNumber || 0) * item.quantity}
                </div>
                <div className={styles.cart_item_quantity}>
                  <button
                    className={styles.quantity_button}
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    className={styles.quantity_button}
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  >
                    +
                  </button>
                </div>
              </div>
              <button
                className={styles.remove_button}
                onClick={() => removeFromCart(item.id)}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
        <div className={styles.cart_summary}>
          <div className={styles.summary_title}>Order Summary</div>
          <div className={styles.summary_row}>
            <span>Subtotal</span>
            <span>£{totals.subtotal.toFixed(2)}</span>
          </div>
          <div className={styles.summary_row}>
            <span>Tax (5%)</span>
            <span>£{totals.tax.toFixed(2)}</span>
          </div>
          <div className={styles.summary_row}>
            <span>Shipping</span>
            <span>{totals.shipping ? `£${totals.shipping.toFixed(2)}` : "Free"}</span>
          </div>
          <div className={styles.summary_total}>
            <div className={styles.summary_row}>
              <span>Total</span>
              <span>£{totals.total.toFixed(2)}</span>
            </div>
          </div>
          <button
            type="button"
            onClick={() => navigate("/checkout")}
            className={styles.checkout_button}
          >
            Proceed to checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;


