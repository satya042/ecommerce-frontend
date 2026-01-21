import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import styles from '../styles/AdminSidebar.module.css';
import {
  FiBarChart2,
  FiTrendingUp,
  FiPackage,
  FiDollarSign,
  FiCreditCard,
  FiRotateCcw,
  FiFileText,
  FiArrowLeft,
  FiBell,
  FiMessageCircle,
  FiSettings,
  FiMoon,
  FiSun,
} from 'react-icons/fi';

const AdminSidebar = ({ isDarkMode, onThemeToggle }) => {
  const location = useLocation();

  const isActive = (path) => location.pathname.includes(path);

  const menuItems = [
    { label: 'Overview', icon: FiBarChart2, path: '/admin/app/ecommerce/dashboard' },
    { label: 'Analytics', icon: FiTrendingUp, path: '/admin/app/ecommerce/analytics' },
    { label: 'Product', icon: FiPackage, path: '/admin/app/ecommerce/add-products' },
    { label: 'Sales', icon: FiDollarSign, path: '/admin/app/ecommerce/sales' },
  ];

  const transactionItems = [
    { label: 'Payment', icon: FiCreditCard, path: '/admin/app/ecommerce/payments' },
    { label: 'Refunds', icon: FiRotateCcw, path: '/admin/app/ecommerce/refunds' },
    { label: 'Invoice', icon: FiFileText, path: '/admin/app/ecommerce/invoices' },
    { label: 'Returns', icon: FiArrowLeft, path: '/admin/app/ecommerce/returns' },
  ];

  const generalItems = [
    { label: 'Notifications', icon: FiBell, path: '/admin/app/ecommerce/notifications' },
    { label: 'Feedback', icon: FiMessageCircle, path: '/admin/app/ecommerce/feedback' },
    { label: 'Setting', icon: FiSettings, path: '/admin/app/ecommerce/settings' },
  ];

  return (
    <aside className={styles.sidebar}>
      {/* Logo */}
      <div className={styles.logo_section}>
        <div className={styles.logo}>
          <div className={styles.logo_icon}>📦</div>
          <span className={styles.logo_text}>Commerce</span>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className={styles.nav_section}>
        <h3 className={styles.section_title}>Main Menu</h3>
        <ul className={styles.menu_list}>
          {menuItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            return (
              <li key={item.path}>
                <a
                  href={item.path}
                  className={`${styles.menu_item} ${active ? styles.active : ''}`}
                >
                  <Icon size={20} className={styles.menu_icon} />
                  <span>{item.label}</span>
                </a>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Transaction Section */}
      <nav className={styles.nav_section}>
        <h3 className={styles.section_title}>Transaction</h3>
        <ul className={styles.menu_list}>
          {transactionItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            return (
              <li key={item.path}>
                <a
                  href={item.path}
                  className={`${styles.menu_item} ${active ? styles.active : ''}`}
                >
                  <Icon size={20} className={styles.menu_icon} />
                  <span>{item.label}</span>
                </a>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* General Section */}
      <nav className={styles.nav_section}>
        <h3 className={styles.section_title}>General</h3>
        <ul className={styles.menu_list}>
          {generalItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            return (
              <li key={item.path}>
                <a
                  href={item.path}
                  className={`${styles.menu_item} ${active ? styles.active : ''}`}
                >
                  <Icon size={20} className={styles.menu_icon} />
                  <span>{item.label}</span>
                </a>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Theme Toggle */}
      <div className={styles.theme_toggle_section}>
        <button
          className={styles.theme_toggle}
          onClick={onThemeToggle}
          title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        >
          {isDarkMode ? (
            <>
              <FiSun size={18} />
              <span>Light Mode</span>
            </>
          ) : (
            <>
              <FiMoon size={18} />
              <span>Dark Mode</span>
            </>
          )}
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;
