import React from 'react';
import { Link } from 'react-router-dom';
import styles from './styles/AdminDashboard.module.css';

const AdminDashboard = () => {
  return (
    <div className={styles.dashboard_container}>
      <aside className={styles.sidebar}>
        <div className={styles.profile}>
          <img src="profile-pic-url" alt="Profile" className={styles.profile_pic} />
          <p>admin123</p>
          <a href="#logout" className={styles.logout}>Logout</a>
        </div>
        <nav className={styles.nav}>
          <h2>E-Commerce</h2>
          <ul>
            <li><a href="#dashboard">Dashboard</a></li>
            <li><a href="#orders">Orders</a></li>
            <li><a href="#products">Products</a></li>
            <li><a href="#users">Users</a></li>
            <li><a href="#sales">Sales</a></li>
          </ul>
        </nav>
      </aside>
      <main className={styles.main_content}>
        <header className={styles.header}>
          <div className={styles.login_status}>Login Successful...</div>
          <h1>Dashboard</h1>
        </header>
        <div className={styles.info_cards}>
          <div className={`${styles.card} ${styles.orders}`}>
            <h2>3</h2>
            <p>Total Orders</p>
            <a href="#more-info" className="more-info">More info ➔</a>
          </div>
          <div className={`${styles.card} ${styles.products}`}>
            <h2>3</h2>
            <p>Total Products</p>
            <a href="#more-info" className="more-info">More info ➔</a>
          </div>
          <div className={`${styles.card} ${styles.users}`}>
            <h2>3</h2>
            <p>Total Users</p>
            <a href="#more-info" className="more-info">More info ➔</a>
          </div>
          <div className={`${styles.card} ${styles.sales_ratio}`}>
            <h2>66.67%</h2>
            <p>Sales Ratio</p>
            <a href="#more-info" className="more-info">More info ➔</a>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;