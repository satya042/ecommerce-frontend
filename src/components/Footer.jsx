import React from 'react';
import styles from "./styles/Footer.module.css";
import logo from "../assets/logos/organic-store-white-logo.png";
import { FaFacebookF, FaTwitter, FaGoogle, FaInstagram, FaLinkedin, FaGithub } from "react-icons/fa";
import { MdHome, MdEmail, MdPhone, MdPrint } from "react-icons/md";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <section className={styles.footer_content}>
        <div className={styles.footer_container}>
          <div className={styles.footer_row}>
            <div className={styles.footer_col}>
              <img src={logo} alt="Organic Store Logo" className={styles.footer_logo} />
              <p className={styles.footer_description}>
                Here you can use rows and columns to organize your footer content. Lorem ipsum dolor sit
                amet, consectetur adipisicing elit.
              </p>
            </div>

            <div className={styles.footer_col}>
              <h6 className={styles.footer_title}>Website</h6>
              <ul className={styles.footer_list}>
                <li><a href="#!" className={styles.footer_link}>About</a></li>
                <li><a href="#!" className={styles.footer_link}>Everything</a></li>
                <li><a href="#!" className={styles.footer_link}>Groceries</a></li>
                <li><a href="#!" className={styles.footer_link}>Juice</a></li>
              </ul>
            </div>

            <div className={styles.footer_col}>
              <h6 className={styles.footer_title}>Quick Links</h6>
              <ul className={styles.footer_list}>
                <li><a href="#!" className={styles.footer_link}>Know More About Us</a></li>
                <li><a href="#!" className={styles.footer_link}>Visit Store</a></li>
                <li><a href="#!" className={styles.footer_link}>Lets's Connect</a></li>
                <li><a href="#!" className={styles.footer_link}>Locate Stores</a></li>
              </ul>
            </div>

            <div className={styles.footer_col}>
              <h6 className={styles.footer_title}>Site Links</h6>
              <ul className={styles.footer_list}>
                <li><a href="#!" className={styles.footer_link}>Privacy Policy</a></li>
                <li><a href="#!" className={styles.footer_link}>Shipping Details</a></li>
                <li><a href="#!" className={styles.footer_link}>Offers Coupons</a></li>
                <li><a href="#!" className={styles.footer_link}>Terms & Condition</a></li>
              </ul>
            </div>

            <div className={styles.footer_col}>
              <h6 className={styles.footer_title}>Contact</h6>
              <ul className={styles.footer_list}>
                <li><MdHome className={styles.contact_icon} /> New York, NY 10012, US</li>
                <li><MdEmail className={styles.contact_icon} /> info@example.com</li>
                <li><MdPhone className={styles.contact_icon} /> + 01 234 567 88</li>
                <li><MdPrint className={styles.contact_icon} /> + 01 234 567 89</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <div className={styles.footer_bottom}>
        <p className={styles.copyright}>© 2021 Copyright: <a href="https://organicstore.com/" className={styles.copyright_link}>OrganicStore.com</a></p>
        <div className={styles.social_icons_bottom}>
           <a href="#/" className={styles.social_icon} aria-label="LinkedIn">
            <FaLinkedin />
          </a>
          <a href="#/" className={styles.social_icon} aria-label="GitHub">
            <FaGithub />
          </a>
          <a href="#/" className={styles.social_icon} aria-label="Facebook">
            <FaFacebookF />
          </a>
          <a href="#/" className={styles.social_icon} aria-label="Twitter">
            <FaTwitter />
          </a>
          <a href="#/" className={styles.social_icon} aria-label="Google">
            <FaGoogle />
          </a>
          <a href="#/" className={styles.social_icon} aria-label="Instagram">
            <FaInstagram />
          </a>
          
        </div>
      </div>
    </footer>
  );
};

export default Footer;