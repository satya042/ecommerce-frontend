import React from 'react';
import styles from "./styles/Footer.module.css"

const Footer = () => {
  return (
    <footer className={styles.footer}>
    <section className={styles.footer_top}>
      <div className={styles.social_connect}>
        <span>Get connected with us on social networks:</span>
      </div>
      <div className={styles.social_icons}>
        <a href="#/" className={styles.social_icon}>
          <i className="fab fa-facebook-f"></i>
        </a>
        <a href="#/" className={styles.social_icon}>
          <i className="fab fa-twitter"></i>
        </a>
        <a href="#/" className={styles.social_icon}>
          <i className="fab fa-google"></i>
        </a>
        <a href="#/" className={styles.social_icon}>
          <i className="fab fa-instagram"></i>
        </a>
        <a href="#/" className={styles.social_icon}>
          <i className="fab fa-linkedin"></i>
        </a>
        <a href="#/" className={styles.social_icon}>
          <i className="fab fa-github"></i>
        </a>
      </div>
    </section>

    <section className={styles.footer_content}>
      <div className={styles.footer_container}>
        <div className={styles.footer_row}>
          <div className={styles.footer_col}>
            <h6 className={styles.footer_title}>
              <i className="fas fa-gem"></i> Company name
            </h6>
            <p>
              Here you can use rows and columns to organize your footer content. Lorem ipsum dolor sit
              amet, consectetur adipisicing elit.
            </p>
          </div>
          <div className= {styles.footer_links}>
          <div className={styles.footer_col}>
            <h6 className={styles.footer_title}>Products</h6>
            <p><a href="#!" className={styles.footer_link}>Angular</a></p>
            <p><a href="#!" className={styles.footer_link}>React</a></p>
            <p><a href="#!" className={styles.footer_link}>Vue</a></p>
            <p><a href="#!" className={styles.footer_link}>Laravel</a></p>
            <div className={styles.footer_col}>
            <h6 className={styles.footer_title}>Useful links</h6>
            <p><a href="#!" className={styles.footer_link}>Pricing</a></p>
            <p><a href="#!" className={styles.footer_link}>Settings</a></p>
            <p><a href="#!" className={styles.footer_link}>Orders</a></p>
            <p><a href="#!" className={styles.footer_link}>Help</a></p>
          </div>
          </div>

          <div className={styles.footer_col}>
            <h6 className={styles.footer_title}>Contact</h6>
            <p><i className="fas fa-home"></i> New York, NY 10012, US</p>
            <p><i className="fas fa-envelope"></i> info@example.com</p>
            <p><i className="fas fa-phone"></i> + 01 234 567 88</p>
            <p><i className="fas fa-print"></i> + 01 234 567 89</p>
            <div className={styles.footer_col}>
            <h6 className={styles.footer_title}>Useful links</h6>
            <p><a href="#!" className={styles.footer_link}>Pricing</a></p>
            <p><a href="#!" className={styles.footer_link}>Settings</a></p>
            <p><a href="#!" className={styles.footer_link}>Orders</a></p>
            <p><a href="#!" className={styles.footer_link}>Help</a></p>
          </div>
          </div>
        </div>
        </div>
      </div>
    </section>

    <div className={styles.footer_bottom}>
      <p>© 2021 Copyright: <a href="https://mdbootstrap.com/" className="footer-link">MDBootstrap.com</a></p>
    </div>
  </footer>
  )
}

export default Footer