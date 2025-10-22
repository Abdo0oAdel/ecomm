import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { authActions } from '../../store/Auth/slice.js';
import styles from './NavBar.module.css';

const NavBar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [language, setLanguage] = useState('English');
  const userMenuRef = useRef(null);
  const mobileMenuRef = useRef(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user);
  const cartItems = useSelector((state) => state.cart.items);
  const wishlistItems = useSelector((state) => state.wishlist.items);

  const handleLogout = () => {
    dispatch(authActions.logout());
    setUserMenuOpen(false);
    navigate('/login');
  };

  // Close dropdown when clicking outside
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
          <p className={styles.bannerText}>
            Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%!
          </p>
          <a href="#" className={styles.shopNowLink}>
            Shop Now
          </a>
        </div>
        <div className={styles.languageSelector}>
          <div className={styles.langDropdown} tabIndex={0} aria-label="Language selector">
            <div className={styles.langCurrent}>{language} <span className={styles.caret}>▾</span></div>
            <ul className={styles.langList}>
              <li><button type="button" onClick={() => setLanguage('English')}>English</button></li>
              <li><button type="button" onClick={() => setLanguage('العربية')}>العربية</button></li>
              <li><button type="button" onClick={() => setLanguage('Français')}>Français</button></li>
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

        {/* Hamburger Menu Button - Mobile Only */}
        <button
          className={styles.hamburger}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          )}
        </button>

        {/* Navigation Links */}
        <nav className={`${styles.navLinks} ${mobileMenuOpen ? styles.mobileMenuOpen : ''}`} ref={mobileMenuRef}>
          <Link
            to="/"
            className={`${styles.navLink} ${location.pathname === '/' ? styles.active : ''}`}
            onClick={() => setMobileMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/contact"
            className={`${styles.navLink} ${location.pathname === '/contact' ? styles.active : ''}`}
            onClick={() => setMobileMenuOpen(false)}
          >
            Contact
          </Link>
          <Link
            to="/about"
            className={`${styles.navLink} ${location.pathname === '/about' ? styles.active : ''}`}
            onClick={() => setMobileMenuOpen(false)}
          >
            About
          </Link>
          {!isAuthenticated && (
            <Link
              to="/signup"
              className={`${styles.navLink} ${location.pathname === '/signup' ? styles.active : ''}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Sign Up
            </Link>
          )}
          {isAuthenticated && (
            <Link
              to="/account"
              className={`${styles.navLink} ${location.pathname === '/account' ? styles.active : ''}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              My Account
            </Link>
          )}
        </nav>

        {/* Right Side Actions */}
        <div className={styles.headerRight}>
          {/* Search Bar */}
          <div className={styles.searchBox}>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="What are you looking for?"
              className={styles.searchInput}
            />
            <button className={styles.searchButton} aria-label="Search">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.35-4.35"></path>
              </svg>
            </button>
          </div>

          {/* Wishlist Icon - Only show when authenticated */}
          {isAuthenticated && (
            <button
              className={styles.iconButton}
              onClick={() => navigate('/wishlist')}
              aria-label="Wishlist"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
              </svg>
              {wishlistItems.length > 0 && (
                <span className={styles.badge}>{wishlistItems.length}</span>
              )}
            </button>
          )}

          {/* Cart Icon - Only show when authenticated */}
          {isAuthenticated && (
            <button
              className={styles.iconButton}
              onClick={() => navigate('/cart')}
              aria-label="Cart"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="9" cy="21" r="1"></circle>
                <circle cx="20" cy="21" r="1"></circle>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
              </svg>
              {cartItems.length > 0 && (
                <span className={styles.badge}>{cartItems.length}</span>
              )}
            </button>
          )}

          {/* User Account Icon */}
          {isAuthenticated && user ? (
            <div className={styles.userMenu} ref={userMenuRef}>
              <button
                className={`${styles.iconButton} ${styles.userButton} ${userMenuOpen ? styles.active : ''}`}
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                aria-label="User Menu"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
              </button>

              {userMenuOpen && (
                <div className={styles.userDropdown}>
                  <div className={styles.userInfo}>
                    <p className={styles.userName}>{user.username || user.firstName || 'User'}</p>
                    <p className={styles.userEmail}>{user.email}</p>
                  </div>
                  <div className={styles.dropdownDivider}></div>
                  <button onClick={() => { navigate('/account'); setUserMenuOpen(false); }} className={styles.dropdownItem}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                      <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                    <span>Manage My Account</span>
                  </button>
                  <button onClick={() => { navigate('/orders'); setUserMenuOpen(false); }} className={styles.dropdownItem}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                    </svg>
                    <span>My Order</span>
                  </button>
                  <button onClick={() => { navigate('/cancellations'); setUserMenuOpen(false); }} className={styles.dropdownItem}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10"></circle>
                      <line x1="15" y1="9" x2="9" y2="15"></line>
                      <line x1="9" y1="9" x2="15" y2="15"></line>
                    </svg>
                    <span>My Cancellations</span>
                  </button>
                  <button onClick={() => { navigate('/reviews'); setUserMenuOpen(false); }} className={styles.dropdownItem}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                    </svg>
                    <span>My Reviews</span>
                  </button>
                  <div className={styles.dropdownDivider}></div>
                  <button onClick={handleLogout} className={styles.dropdownItem}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                      <polyline points="16 17 21 12 16 7"></polyline>
                      <line x1="21" y1="12" x2="9" y2="12"></line>
                    </svg>
                    <span>Logout</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              className={styles.iconButton}
              onClick={() => navigate('/login')}
              aria-label="Login"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            </button>
          )}
        </div>
      </div>
    </header>
    </>
  );
};

export default NavBar;

