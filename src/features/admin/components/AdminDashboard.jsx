import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useTheme } from '../../../context/ThemeContext';
import { SidebarProvider, useSidebar } from '../../../context/SidebarContext';
import AdminSidebar from './AdminSidebar';
import AdminHeader from './AdminHeader';
import AddProductPage from '../manage-products/AddProductPage';
import ManageProducts from '../manage-products/ManageProducts';
import ManageOrders from '../ManageOrders';
import ManageUsers from '../ManageUsers';
import styles from '../styles/AdminDashboard.module.css';

const AdminDashboardInner = () => {
  const { mode: isDarkMode, toggleTheme } = useTheme();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();
  const { isCollapsed, toggleSidebar } = useSidebar();

  // Apply theme to document
  useEffect(() => {
    if (isDarkMode === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
  }, [isDarkMode]);

  // Collapse sidebar when route changes (except on dashboard)
  // useEffect(() => {
  //   const isDashboard = location.pathname === '/admin/app/ecommerce' || location.pathname === '/admin/app/ecommerce/dashboard';
  //   if (!isDashboard && !isCollapsed) {
  //     toggleSidebar();
  //   }
  // }, [location.pathname]);

  const handleThemeToggle = () => {
    toggleTheme();
  };

  // Determine which component to render based on the current path
  const renderContent = () => {
    const path = location.pathname;

    if (path.includes('/add-products')) {
      return (
        <>
          <AdminHeader title="Add New Product" onToggleSidebar={toggleSidebar} />
          <AddProductPage isCollapsed={isCollapsed} />
        </>
      );
    } else if (path.includes('/products')) {
      return (
        <>
          <AdminHeader title="Manage Products" onToggleSidebar={toggleSidebar} />
          <ManageProducts isCollapsed={isCollapsed} />
        </>
      );
    } else if (path.includes('/orders')) {
      return (
        <>
          <AdminHeader title="Manage Orders" onToggleSidebar={toggleSidebar} />
          <ManageOrders isCollapsed={isCollapsed} />
        </>
      );
    } else if (path.includes('/users')) {
      return (
        <>
          <AdminHeader title="Manage Users" onToggleSidebar={toggleSidebar} />
          <ManageUsers isCollapsed={isCollapsed} />
        </>
      );
    } else {
      // Default to dashboard or products
      return (
        <>
          <AdminHeader title="Add New Product" onToggleSidebar={toggleSidebar} />
          <AddProductPage isCollapsed={isCollapsed} />
        </>
      );
    }
  };

  return (
    <div className={styles.admin_layout}>
      {/* Sidebar */}
      <AdminSidebar isDarkMode={isDarkMode === 'dark'} onThemeToggle={handleThemeToggle} />

      {/* Main Content */}
      <div className={`${styles.main_wrapper} ${isCollapsed ? styles.collapsed : ''}`}>
        {/* Content Area */}
        <div className={styles.content_area}>
          {renderContent()}
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

const AdminDashboard = () => {
  return (
    <SidebarProvider>
      <AdminDashboardInner />
    </SidebarProvider>
  );
};

export default AdminDashboard;