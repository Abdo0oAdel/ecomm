import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import styles from "./Footer.module.css";
import { FiSend } from "react-icons/fi";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

const Footer = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

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

  const handleProtectedLink = (e, path) => {
    if (!isAuthenticated) {
      e.preventDefault();
      navigate('/login');
    }
  };

  // Smooth scroll to top handler
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>
        {/* Subscribe / Brand Column */}
        <div className={styles.footerColumn}>
          <div className={styles.brandSection}>
            <h3 className={styles.brandName}>Zenon</h3>
            <h4 className={styles.subscribeTitle}>{t('footer.subscribe')}</h4>
            <p className={styles.subscribeText}>{t('footer.getDiscount')}</p>
            <form
              className={styles.subscribeForm}
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="email"
                placeholder={t('footer.enterEmail')}
                className={styles.emailInput}
                aria-label="Email"
              />
              <button className={styles.subscribeBtn} aria-label="Subscribe">
                <FiSend />
              </button>
            </form>

            <div className={styles.socialIcons}>
              <a href="#" className={styles.socialIcon} aria-label="Facebook">
                <FaFacebookF />
              </a>
              <a href="#" className={styles.socialIcon} aria-label="Twitter">
                <FaTwitter />
              </a>
              <a href="#" className={styles.socialIcon} aria-label="Instagram">
                <FaInstagram />
              </a>
              <a href="#" className={styles.socialIcon} aria-label="LinkedIn">
                <FaLinkedinIn />
              </a>
            </div>
          </div>
        </div>

        {/* Support Column */}
        <div className={styles.footerColumn}>
       {/*<h4 className={styles.columnTitle}>{t('footer.support')}</h4>*/}
          <Link to="/support" className={styles.columnTitle}>{t('footer.support')}</Link>
          <div className={styles.contactInfo}>
            <p className={styles.contactItem}>
              111 Bijoy sarani, Dhaka, D1515, Bangladesh.
            </p>
            <p className={styles.contactItem}>Zenon@gmail.com</p>
            <p className={styles.contactItem}>+88015-88888-9999</p>
          </div>
        </div>

        {/* Account Column */}
        <div className={styles.footerColumn}>
          <h4 className={styles.columnTitle}>{t('account.title')}</h4>
          <ul className={styles.footerLinks}>
            {isAuthenticated ? (
              <>
                <li>
                  <Link to="/account">{t('nav.myAccount')}</Link>
                </li>
                <li>
                  <Link to="/cart">{t('nav.cart')}</Link>
                </li>
                <li>
                  <Link to="/wishlist">{t('nav.wishlist')}</Link>
                </li>
                <li>
                  <Link to="/shop">Shop</Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/login">{t('nav.login')}</Link>
                </li>
                <li>
                  <Link to="/signup">{t('nav.signup')}</Link>
                </li>
                <li>
                  <Link to="/shop">Shop</Link>
                </li>
              </>
            )}
          </ul>
        </div>

        {/* Quick Link Column */}
        <div className={styles.footerColumn}>
          <h4 className={styles.columnTitle}>{t('footer.quickLink')}</h4>
          <ul className={styles.footerLinks}>
            <li>
              <Link to="/privacy">{t('footer.privacyPolicy')}</Link>
            </li>
            <li>
              <Link to="/terms">{t('footer.termsOfUse')}</Link>
            </li>
            <li>
              <Link to="/faq">{t('footer.faq')}</Link>
            </li>
            <li>
              <Link to="/contact">{t('nav.contact')}</Link>
            </li>
          </ul>
        </div>

        {/* Download App Column */}
        <div className={styles.footerColumn}>
          <h4 className={styles.columnTitle}>{t('footer.downloadApp')}</h4>
          <p className={styles.appText}>{t('footer.saveWith')}</p>
          <div className={styles.qrCode} aria-hidden>
            <img
                className={styles.qrPlaceholder}
                src="text=QR+Code"
                alt="QR Code"
            />
          </div>
          <div className={styles.appStores}>
            <a href="#" className={styles.storeLink}>
              <img
                className={styles.googlePlayImg}
                alt="Google Play"
              />
            </a>
            <a href="#" className={styles.storeLink}>
              <img
                src="text=App+Store"
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
      <button className={styles.scrollToTop} aria-label="Scroll to top" onClick={handleScrollToTop}>
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
