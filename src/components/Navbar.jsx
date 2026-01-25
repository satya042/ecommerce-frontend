import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./styles/Navbar.module.css";
import logo from "../assets/logos/organic-store-logo5.svg";
import { HiOutlineShoppingCart , HiUser } from "react-icons/hi";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { itemCount } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  return (
      <div className={styles.nav_container}>
      <header className={styles.nav_header}>
        <nav aria-label="Top" className={styles.custom_nav}>
          <div className={styles.nav_items}>
            <div className={styles.nav_left}>
              <Link to="/" className={styles.navbar__logo}>
                <img src={logo} alt="Company Logo"></img>
              </Link>
              <div className={styles.nav_links}>
                <Link to="/">Everything</Link>
                <Link to="/">Groceries</Link>
                <Link to="/">Juice</Link>
              </div>
            </div>

            <div className={styles.nav_links}>
              <Link to="/">About</Link>
              <Link to="/">Contact</Link>

              <span className={styles.price}>£35.00</span>
              
              {/* Cart button with badge */}
              <button
                type="button"
                className={styles.cart_button}
                onClick={() => navigate("/cart")}
                aria-label="View cart"
              >
                <HiOutlineShoppingCart className={styles.cart_icon} />
                {itemCount > 0 && (
                  <span className={styles.cart_badge}>
                    {itemCount > 99 ? "99+" : itemCount}
                  </span>
                )}
              </button>


              <button
                type="button"
                className={styles.icon_button}
                onClick={() => navigate(isAuthenticated ? "/profile" : "/login")}
                aria-label="Account"
              >
                <HiUser className={styles.user_icon} />
              </button>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
};

export default Navbar;
