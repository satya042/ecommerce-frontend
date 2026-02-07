import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { HiUser } from "react-icons/hi";
import { useAuth } from "../../../context/AuthContext";
import styles from "./ProfileDropdown.module.css";

const ProfileDropdown = ({ isAuthenticated }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleLogout = () => {
    logout();
    setIsOpen(false);
    navigate("/");
  };

  const handleNavigate = (path) => {
    navigate(path);
    setIsOpen(false);
  };

  // Extract display name from user object
  const getDisplayName = () => {
    if (!user) return "User";
    // Try different possible field names for user name
    return user.fullName || user.name || user.username || user.email || "User";
  };

  if (!isAuthenticated) {
    return (
      <button
        type="button"
        className={styles.icon_button}
        onClick={() => navigate("/login")}
        aria-label="Account"
      >
        <HiUser className={styles.user_icon} />
      </button>
    );
  }

  return (
    <div className={styles.dropdown_container} ref={dropdownRef}>
      <button
        type="button"
        className={styles.icon_button}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Account menu"
        aria-expanded={isOpen}
      >
        <HiUser className={styles.user_icon} />
      </button>

      {isOpen && (
        <div className={styles.dropdown_menu}>
          {/* User Name Header */}
          <div className={styles.menu_header}>
            <span className={styles.user_name}>
              {getDisplayName()}
            </span>
            {user?.email && (
              <span className={styles.user_email}>
                {user.email}
              </span>
            )}
          </div>

          {/* Menu Items */}
          <button
            className={styles.menu_item}
            onClick={() => handleNavigate("/profile")}
          >
            <span>My Profile</span>
          </button>

          <button
            className={styles.menu_item}
            onClick={() => handleNavigate("/orders")}
          >
            <span>Orders</span>
          </button>

          <button
            className={styles.menu_item}
            onClick={() => handleNavigate("/wishlist")}
          >
            <span>Wishlist</span>
          </button>

          <button
            className={styles.menu_item}
            onClick={() => handleNavigate("/contact")}
          >
            <span>Contact Us</span>
          </button>

          <button
            className={styles.menu_item}
            onClick={() => handleNavigate("/coupons")}
          >
            <span>Coupons</span>
          </button>

          <button
            className={styles.menu_item}
            onClick={() => handleNavigate("/saved-cards")}
          >
            <span>Saved Cards</span>
          </button>

          <button
            className={styles.menu_item}
            onClick={() => handleNavigate("/saved-addresses")}
          >
            <span>Saved Addresses</span>
          </button>

          {/* Divider */}
          <div className={styles.menu_divider}></div>

          {/* Logout Button */}
          <button
            className={`${styles.menu_item} ${styles.logout_item}`}
            onClick={handleLogout}
          >
            <span>Logout</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;
