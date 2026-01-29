import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSidebar } from '../../../context/SidebarContext';
import styles from '../styles/AdminSidebar.module.css';
import logo from '../../../assets/logos/organic-store-logo5.svg';
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
  FiChevronDown,
  FiMenu,
} from 'react-icons/fi';

// Reusable NavSection Component
const NavSection = ({ title, items, isCollapsed, isActive }) => (
  <nav className={styles.nav_section}>
    {!isCollapsed && <h3 className={styles.section_title}>{title}</h3>}
    <ul className={styles.menu_list}>
      {items.map((item) => {
        const Icon = item.icon;
        const active = isActive(item.path);
        return (
          <li key={item.path}>
            <a
              href={item.path}
              className={`${styles.menu_item} ${active ? styles.active : ''}`}
              title={isCollapsed ? item.label : ''}
              style={{ gap: isCollapsed ? "0" : "12px" }}
            >
              <Icon size={20} className={styles.menu_icon} />
              {!isCollapsed && <span>{item.label}</span>}
            </a>
          </li>
        );
      })}
    </ul>
  </nav>
);

const AdminSidebar = ({ isDarkMode, onThemeToggle }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [expandedMenu, setExpandedMenu] = useState(null);
  const { isCollapsed, toggleSidebar } = useSidebar();

  const isActive = (path) => location.pathname.includes(path);

  const handleLogoClick = () => {
    navigate('/admin/app/ecommerce/dashboard');
  };

  const menuItems = [
    { label: 'Overview', icon: FiBarChart2, path: '/admin/app/ecommerce/dashboard' },
    { label: 'Analytics', icon: FiTrendingUp, path: '/admin/app/ecommerce/analytics' },
    {
      label: 'Product',
      icon: FiPackage,
      path: '/admin/app/ecommerce/products',
      submenu: [
        { label: 'Add Product', icon: FiPackage, path: '/admin/app/ecommerce/add-products' },
        { label: 'Product List', icon: FiPackage, path: '/admin/app/ecommerce/products-list' },
      ],
    },
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
    <aside className={`${styles.sidebar} ${isCollapsed ? styles.collapsed : ''}`}>
      {/* Logo */}
      <div className={styles.logo_section}>
        <div className={styles.logo} onClick={handleLogoClick} style={{ cursor: 'pointer' }}>
          <img src={logo} alt="Organic Store Logo" className={styles.logo_image} />
        </div>
        <button
          className={styles.toggle_button}
          onClick={toggleSidebar}
          title={isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
        >
          <FiMenu size={20} />
        </button>
      </div>

      {/* Main Navigation */}
      <nav className={styles.nav_section}>
        <h3 className={styles.section_title}>Main Menu</h3>
        <ul className={styles.menu_list}>
          {menuItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            const hasSubmenu = item.submenu && item.submenu.length > 0;
            const isExpanded = expandedMenu === item.label;

            return (
              <div key={item.path}>
                <li>
                  <div
                    className={`${styles.menu_item} ${active ? styles.active : ""}`}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <a
                      href={item.path}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        flex: 1,
                        textDecoration: "none",
                        color: "inherit",
                        gap: isCollapsed ? "0" : "12px",
                      }}
                      onClick={(e) => {
                        if (hasSubmenu){
                          e.preventDefault();
                          setExpandedMenu(isExpanded ? null : item.label);
                        }}}
                        title={isCollapsed ? item.label : ''}
                    >
                      <Icon size={20} className={styles.menu_icon} />
                      {!isCollapsed && <span>{item.label}</span>}
                    </a>
                    {hasSubmenu && !isCollapsed && (
                      <button
                        className={styles.dropdown_toggle}
                        onClick={(e) => {
                          e.preventDefault();
                          setExpandedMenu(isExpanded ? null : item.label);
                        }}
                        style={{
                          background: "none",
                          border: "none",
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          padding: "4px",
                          color: "inherit",
                        }}
                      >
                        <FiChevronDown
                          size={16}
                          style={{
                            transition: "transform 0.3s ease",
                            transform: isExpanded
                              ? "rotate(180deg)"
                              : "rotate(0deg)",
                          }}
                        />
                      </button>
                    )}
                  </div>
                </li>

                {/* Submenu - Only show when not collapsed */}
                {hasSubmenu && isExpanded && !isCollapsed && (
                  <ul className={styles.submenu_list}>
                    {item.submenu.map((subitem) => {
                      const SubIcon = subitem.icon;
                      const subActive = isActive(subitem.path);
                      return (
                        <li key={subitem.path}>
                          <a
                            href={subitem.path}
                            className={`${styles.submenu_item} ${subActive ? styles.active : ""}`}>
                            <SubIcon  size={16} className={styles.submenu_icon}/>
                            <span>{subitem.label}</span>
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>
            );
          })}
        </ul>
      </nav>

      {/* Transaction Section */}
      <NavSection 
        title="Transaction" 
        items={transactionItems} 
        isCollapsed={isCollapsed} 
        isActive={isActive} 
      />

      {/* General Section */}
      <NavSection 
        title="General" 
        items={generalItems} 
        isCollapsed={isCollapsed} 
        isActive={isActive} 
      />

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
