import React from "react";
import { Link } from "react-router-dom";
import styles from "./styles/Orders.module.css";

const Orders = () => {
  const orders = [
    { id: 1, date: "2024-01-15", total: 50.0, status: "delivered" },
    { id: 2, date: "2024-01-10", total: 75.0, status: "pending" },
    { id: 3, date: "2024-01-05", total: 100.0, status: "cancelled" },
  ];

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "pending":
        return styles.status_pending;
      case "delivered":
        return styles.status_delivered;
      case "cancelled":
        return styles.status_cancelled;
      default:
        return "";
    }
  };

  if (orders.length === 0) {
    return (
      <div className={styles.orders_container}>
        <h1 className={styles.orders_title}>My Orders</h1>
        <div className={styles.empty_orders}>
          <p>You haven't placed any orders yet</p>
          <Link to="/products">Start Shopping</Link>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.orders_container}>
      <h1 className={styles.orders_title}>My Orders</h1>
      <table className={styles.orders_table}>
        <thead className={styles.table_header}>
          <tr>
            <th className={styles.table_header_cell}>Order ID</th>
            <th className={styles.table_header_cell}>Date</th>
            <th className={styles.table_header_cell}>Total</th>
            <th className={styles.table_header_cell}>Status</th>
            <th className={styles.table_header_cell}>Action</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id} className={styles.table_row}>
              <td className={styles.table_cell}>
                <Link to={`/order/${order.id}`} className={styles.order_id}>
                  #{order.id}
                </Link>
              </td>
              <td className={styles.table_cell}>{order.date}</td>
              <td className={styles.table_cell}>${order.total.toFixed(2)}</td>
              <td className={styles.table_cell}>
                <span
                  className={`${styles.status_badge} ${getStatusBadgeClass(
                    order.status
                  )}`}
                >
                  {order.status.charAt(0).toUpperCase() +
                    order.status.slice(1)}
                </span>
              </td>
              <td className={styles.table_cell}>
                <Link to={`/order/${order.id}`} className={styles.view_button}>
                  View
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Orders;


