import React from "react";
import { useParams, Link } from "react-router-dom";
import styles from "./styles/OrderDetails.module.css";

const OrderDetails = () => {
  const { id } = useParams();

  return (
    <div className={styles.order_details_container}>
      <Link to="/orders" className={styles.back_link}>
        ← Back to orders
      </Link>
      <h1 className={styles.order_title}>Order {id}</h1>
      <p className={styles.order_description}>
        This is a mock order detail page. Connect to your backend API to show real items,
        tracking, and review options.
      </p>
      <div className={styles.order_section}>
        <h2 className={styles.section_title}>Tracking</h2>
        <div className={styles.section_content}>
          <p>Status: <span className={styles.status_badge}>Delivered</span></p>
          <p>Estimated delivery: already delivered</p>
        </div>
      </div>
      <div className={styles.order_section}>
        <h2 className={styles.section_title}>Items</h2>
        <p className={styles.section_content}>
          Add real order items here when integrating your backend.
        </p>
      </div>
    </div>
  );
};

export default OrderDetails;


