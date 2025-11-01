import {
  FiHeart,
  FiShoppingCart,
} from 'react-icons/fi';
import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { authActions } from '../../store/Auth/slice.js';
import { cartActions } from '../../store/Cart/slice.js';
import { wishlistActions } from '../../store/Wishlist/slice.js';
import { authAPI } from '../../utils/api.js';
import styles from './NavBar.module.css';

const NavBar = () => {
  const { t, i18n } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const userMenuRef = useRef(null);
  const mobileMenuRef = useRef(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user);
  const cartItems = useSelector((state) => state.cart.items);
  const wishlistItems = useSelector((state) => state.wishlist.items);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  const getCurrentLanguageLabel = () => {
    switch (i18n.language) {
      case 'ar': return 'العربية';
      case 'fr': return 'Français';
      default: return 'English';
    }
  };

  const handleLogout = async () => {
    try {
      await authAPI.logout();
    } catch (error) {
      console.error("Logout Error:", error);
    } finally {
      dispatch(authActions.logout());
      dispatch(cartActions.clearCart());
      dispatch(wishlistActions.clearWishlist());
      setUserMenuOpen(false);
      navigate('/login');
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setUserMenuOpen(false);
      }
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
        setMobileMenuOpen(false);
      }
    };
    if (userMenuOpen || mobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [userMenuOpen, mobileMenuOpen]);

  return (
    <>
      {/* Top Banner */}
      <div className={styles.topBanner}>
        <div className={styles.bannerContent}>
          <p className={styles.bannerText}>{t('banner.summerSale')}</p>
          <a href="#" className={styles.shopNowLink}>{t('banner.shopNow')}</a>
        </div>

        {/* Language Selector */}
        <div className={styles.languageSelector}>
          <div className={styles.langDropdown}>
            <div className={styles.langCurrent}>
              {getCurrentLanguageLabel()} ▾
            </div>
            <ul className={styles.langList}>
              <li><button onClick={() => changeLanguage('en')}>{t('languages.english')}</button></li>
              <li><button onClick={() => changeLanguage('ar')}>{t('languages.arabic')}</button></li>
              <li><button onClick={() => changeLanguage('fr')}>{t('languages.french')}</button></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className={styles.header}>
        <div className={styles.headerContainer}>

          {/* Logo */}
          <Link to="/" className={styles.logo}>
            <h1>Zenon</h1>
          </Link>

          {/* Hamburger */}
          <button
            className={styles.hamburger}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? "✖" : "☰"}
          </button>

          {/* Nav Links */}
          <nav
            ref={mobileMenuRef}
            className={`${styles.navLinks} ${mobileMenuOpen ? styles.mobileMenuOpen : ''}`}
          >
            <Link
              to="/"
              className={`${styles.navLink} ${location.pathname === '/' ? styles.active : ''}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              {t('nav.home')}
            </Link>
            <Link
              to="/contact"
              className={`${styles.navLink} ${location.pathname === '/contact' ? styles.active : ''}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              {t('nav.contact')}
            </Link>
            <Link
              to="/about"
              className={`${styles.navLink} ${location.pathname === '/about' ? styles.active : ''}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              {t('nav.about')}
            </Link>

            {!isAuthenticated ? (
              <Link
                to="/login"
                className={styles.navLink}
                onClick={() => setMobileMenuOpen(false)}
              >
                {t('nav.login')}
              </Link>
            ) : (
              <Link
                to="/account"
                className={styles.navLink}
                onClick={() => setMobileMenuOpen(false)}
              >
                {t('nav.myAccount')}
              </Link>
            )}
          </nav>

          {/* Right Actions */}
          <div className={styles.headerRight}>

            {/* Wishlist */}
            <button
              className={styles.iconButton}
              onClick={() => navigate('/wishlist')}
            >
              <FiHeart size={20} />
              {wishlistItems.length > 0 && (
                <span className={styles.badge}>{wishlistItems.length}</span>
              )}
            </button>

            {/* Cart */}
            <button
              className={styles.iconButton}
              onClick={() => navigate('/cart')}
            >
              <FiShoppingCart size={20} />
              {cartItems.length > 0 && (
                <span className={styles.badge}>{cartItems.length}</span>
              )}
            </button>

            {/* User / Login */}
            {!isAuthenticated ? (
              <button
                className={styles.iconButton}
                onClick={() => navigate('/login')}
              >
                👤
              </button>
            ) : (
              <div ref={userMenuRef} className={styles.userMenu}>
                <button
                  className={styles.iconButton}
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                >
                  👤
                </button>

                {userMenuOpen && (
                  <div className={styles.userDropdown}>
                    <p>{user.username || user.email}</p>
                    <button onClick={() => navigate('/account')}>{t('nav.manageAccount')}</button>
                    <button onClick={handleLogout}>{t('nav.logout')}</button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </header>
    </>
  );
};

export default NavBar;
