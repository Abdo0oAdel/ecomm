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
  // smooth-scroll to in-page anchor if present
  const handleAnchorClick = (e) => {
    try {
      const href = e.currentTarget.getAttribute("href");
      if (href && href.startsWith("#")) {
        const id = href.slice(1);
        const el = document.getElementById(id);
        if (el) {
          e.preventDefault();
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }
    } catch (err) {
      // fallback to default navigation if any error
    }
  };

  return (
    <footer className={styles.footer}>
<<<<<<< HEAD
      <div className={styles.top}>
        <div className={styles.col}>
          <h3 className={styles.title}>Exclusive</h3>
          <h4 className={styles.subscribe}>Subscribe</h4>
          <p className={styles.subtext}>Get 10% off your first order</p>
          <form className={styles.subscribeForm} onSubmit={(e) => e.preventDefault()}>
            <input
              className={styles.emailInput}
              type="email"
              placeholder="Enter your email"
              aria-label="Email"
            />
            <button className={styles.sendBtn} aria-label="Subscribe">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2 21L23 12L2 3V10L17 12L2 14V21Z" fill="currentColor" />
              </svg>
            </button>
          </form>
        </div>

        <div className={styles.col}>
          <h3 className={styles.title}>Support</h3>
          <address className={styles.address}>
            111 Bijoy sarani, Dhaka,
            <br /> DH 1515, Bangladesh.
          </address>
          <a className={styles.link} href="mailto:exclusive@gmail.com">exclusive@gmail.com</a>
          <a className={styles.link} href="tel:+88015888889999">+88015-88888-9999</a>
        </div>

        <div className={styles.col}>
          <h3 className={styles.title}>Account</h3>
          <ul className={styles.list}>
            <li><a className={styles.link} href="#account" onClick={handleAnchorClick}>My Account</a></li>
            <li><a className={styles.link} href="#login" onClick={handleAnchorClick}>Login / Register</a></li>
            <li><a className={styles.link} href="#cart" onClick={handleAnchorClick}>Cart</a></li>
            <li><a className={styles.link} href="#wishlist" onClick={handleAnchorClick}>Wishlist</a></li>
            <li><a className={styles.link} href="#shop" onClick={handleAnchorClick}>Shop</a></li>
          </ul>
        </div>

        <div className={styles.col}>
          <h3 className={styles.title}>Quick Link</h3>
          <ul className={styles.list}>
            <li><a className={styles.link} href="#privacy" onClick={handleAnchorClick}>Privacy Policy</a></li>
            <li><a className={styles.link} href="#terms" onClick={handleAnchorClick}>Terms Of Use</a></li>
            <li><a className={styles.link} href="#faq" onClick={handleAnchorClick}>FAQ</a></li>
            <li><a className={styles.link} href="#contact" onClick={handleAnchorClick}>Contact</a></li>
          </ul>
        </div>

        <div className={styles.col}>
          <h3 className={styles.title}>Download App</h3>
          <p className={styles.small}>Save $3 with App New User Only</p>

          <div className={styles.appRow}>
            <div className={styles.qr} aria-hidden>
              {/* simple QR placeholder */}
              <div className={styles.qrInner}></div>
=======
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
>>>>>>> origin/master
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
          <p>© Copyright Zenon 2025. All right reserved.</p>
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
