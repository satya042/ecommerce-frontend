import React, { useState, useEffect } from "react";
import styles from "./styles/ManageOrders.module.css";

const ManageOrders = ({ isCollapsed = false }) => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Fetch orders from API
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      // API call will go here
      // For now, just set empty orders
      setOrders([]);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  return (
    <div className={`${styles.container} ${isCollapsed ? styles.collapsed : ''}`}>
      <h1>Manage Orders</h1>
      <p>Orders management coming soon...</p>
    </div>
  );
};

export default ManageOrders;
