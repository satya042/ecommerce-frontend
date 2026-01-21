import React, { useState, useEffect } from 'react';
import { useTheme } from '../../context/ThemeContext';
import AdminSidebar from './components/AdminSidebar';
import AdminHeader from './components/AdminHeader';
import AddProductPage from './components/AddProductPage';
import styles from './styles/AdminDashboard.module.css';

const AdminDashboard = () => {
  const { mode: isDarkMode, toggleTheme } = useTheme();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Apply theme to document
  useEffect(() => {
    if (isDarkMode === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
  }, [isDarkMode]);

  const handleThemeToggle = () => {
    toggleTheme();
  };

  return (
    <div className={styles.admin_layout}>
      {/* Sidebar */}
      <AdminSidebar isDarkMode={isDarkMode === 'dark'} onThemeToggle={handleThemeToggle} />

      {/* Main Content */}
      <div className={styles.main_wrapper}>
        {/* Header */}
        <AdminHeader title="Add New Product" />

        {/* Content Area */}
        <div className={styles.content_area}>
          <AddProductPage />
        </div>
      </div>

      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className={styles.sidebar_overlay}
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default AdminDashboard;