import React from "react";
import { Link } from "react-router-dom";
import styles from "./styles/Navbar.module.css";
import logo from "../assets/logos/organic-store-logo5.svg";
import { HiOutlineShoppingCart , HiUser} from "react-icons/hi";


const Navbar = () => {
  return (
      <div className={styles.nav_container}>
      <header className={styles.nav_header}>
        <nav aria-label="Top" className={styles.custom_nav}>
          <div className={styles.nav_items}>
            <div className={styles.nav_left}>
              <div className={styles.navbar__logo}>
                <img src={logo} alt="Company Logo"></img>
              </div>
              <div className={styles.nav_links}>
                <Link to="/">Everything</Link>
                <Link to="/">Groceries</Link>
                <Link to="/">Juice</Link>
              </div>
            </div>

            <div className={styles.nav_links}>
              <Link to="/">About</Link>
              <Link to="/">Contact</Link>
              <span className={styles.cart}>
                <span className={styles.cart_count}>1</span>
                {/* <img src="path/to/cart-icon.png" alt="Cart Icon" /> */}
              </span>
              <span className={styles.price}>£35.00</span>
              <HiOutlineShoppingCart/>
              <HiUser/>
              {/* <img src="path/to/user-icon.png" alt="User Icon" /> */}
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
};

export default Navbar;
