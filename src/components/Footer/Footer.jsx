import React from "react";
import styles from "./Footer.module.css";
import { FiSend } from "react-icons/fi";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>
        {/* Subscribe Section */}
        <div className={styles.footerColumn}>
          <div className={styles.brandSection}>
            <h3 className={styles.brandName}>Zenon</h3>
            <h4 className={styles.subscribeTitle}>Subscribe</h4>
            <p className={styles.subscribeText}>Get 10% off your first order</p>
            <div className={styles.subscribeForm}>
              <input
                type="email"
                placeholder="Enter your email"
                className={styles.emailInput}
              />
              <button className={styles.subscribeBtn}>
                <FiSend />
              </button>
            </div>
            <div className={styles.socialIcons}>
              <a href="#" className={styles.socialIcon}>
                <FaFacebookF />
              </a>
              <a href="#" className={styles.socialIcon}>
                <FaTwitter />
              </a>
              <a href="#" className={styles.socialIcon}>
                <FaInstagram />
              </a>
              <a href="#" className={styles.socialIcon}>
                <FaLinkedinIn />
              </a>
            </div>
          </div>
        </div>

        {/* Support Section */}
        <div className={styles.footerColumn}>
          <h4 className={styles.columnTitle}>Support</h4>
          <div className={styles.contactInfo}>
            <p className={styles.contactItem}>
              111 Bijoy sarani, Dhaka, D1515, Bangladesh.
            </p>
            <p className={styles.contactItem}>exclusive@gmail.com</p>
            <p className={styles.contactItem}>+88015-88888-9999</p>
          </div>
        </div>

        {/* Account Section */}
        <div className={styles.footerColumn}>
          <h4 className={styles.columnTitle}>Account</h4>
          <ul className={styles.footerLinks}>
            <li>
              <a href="/account">My Account</a>
            </li>
            <li>
              <a href="/login">Login / Register</a>
            </li>
            <li>
              <a href="/cart">Cart</a>
            </li>
            <li>
              <a href="/wishlist">Wishlist</a>
            </li>
            <li>
              <a href="/shop">Shop</a>
            </li>
          </ul>
        </div>

        {/* Quick Link Section */}
        <div className={styles.footerColumn}>
          <h4 className={styles.columnTitle}>Quick Link</h4>
          <ul className={styles.footerLinks}>
            <li>
              <a href="/privacy">Privacy Policy</a>
            </li>
            <li>
              <a href="/terms">Terms Of Use</a>
            </li>
            <li>
              <a href="/faq">FAQ</a>
            </li>
            <li>
              <a href="/contact">Contact</a>
            </li>
          </ul>
        </div>

        {/* Download App Section */}
        <div className={styles.footerColumn}>
          <h4 className={styles.columnTitle}>Download App</h4>
          <p className={styles.appText}>Save $3 with App New User Only</p>
          <div className={styles.qrCode}>
            <div className={styles.qrPlaceholder}></div>
          </div>
          <div className={styles.appStores}>
            <a href="#" className={styles.storeLink}>
              <img
                src="https://via.placeholder.com/120x40/000/fff?text=GET+IT+ON+Google+Play"
                alt="Google Play"
              />
            </a>
            <a href="#" className={styles.storeLink}>
              <img
                src="https://via.placeholder.com/120x40/000/fff?text=Download+on+the+App+Store"
                alt="App Store"
              />
            </a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className={styles.copyright}>
        <div className={styles.copyrightContainer}>
          <p>© Copyright Rimel 2022. All right reserved.</p>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <button className={styles.scrollToTop}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path
            d="M12 19V5M5 12L12 5L19 12"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </footer>
  );
};

export default Footer;
