import React, { useState, useEffect, useRef } from 'react';
import styles from './NavBar.module.css';
import {
  FiHeart,
  FiSearch,
  FiShoppingCart,
  FiMenu,
  FiX,
  FiChevronDown,
} from 'react-icons/fi';

const NavBar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [language, setLanguage] = useState('English');
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const menuBtnRef = useRef(null);
  
  useEffect(() => {
    function onKeyDown(e) {
      if (!menuOpen) return;
      // Close on Escape
      if (e.key === 'Escape') {
        setMenuOpen(false);
        menuBtnRef.current?.focus();
      }

      // Simple focus trap: if Tab pressed, keep focus inside the menu
      if (e.key === 'Tab') {
        const focusable = menuRef.current?.querySelectorAll(
          'a, button, input, [tabindex]:not([tabindex="-1"])'
        );
        if (!focusable || focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }

    function onMouseDown(e) {
      if (!menuOpen) return;
      // Close when clicking outside the menu and not the menu button
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target) &&
        menuBtnRef.current &&
        !menuBtnRef.current.contains(e.target)
      ) {
        setMenuOpen(false);
      }
    }

    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('mousedown', onMouseDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('mousedown', onMouseDown);
    };
  }, [menuOpen]);

  useEffect(() => {
    if (menuOpen) {
      // focus first focusable element in menu
      const focusable = menuRef.current?.querySelectorAll(
        'a, button, input, [tabindex]:not([tabindex="-1"])'
      );
      if (focusable && focusable.length) focusable[0].focus();
    }
  }, [menuOpen]);

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
          {/* Language selector: interactive from HEAD version */}
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
          <div className={styles.logo}>
            <h1>Zenon</h1>
          </div>

          {/* mobile menu toggle */}
          <button
            ref={menuBtnRef}
            className={styles.menuBtn}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls="primary-navigation"
            onClick={() => setMenuOpen((s) => !s)}
          >
            {menuOpen ? <FiX /> : <FiMenu />}
          </button>

          <ul
            id="primary-navigation"
            ref={menuRef}
            className={`${styles.navLinks} ${menuOpen ? styles.open : ''}`}
            role="navigation"
          >
            <li><a href="/" className={styles.active} onClick={() => setMenuOpen(false)}>Home</a></li>
            <li><a href="/contact" onClick={() => setMenuOpen(false)}>Contact</a></li>
            <li><a href="/about" onClick={() => setMenuOpen(false)}>About</a></li>
            <li><a href="/signup" onClick={() => setMenuOpen(false)}>Sign Up</a></li>
          </ul>

          <div className={styles.navActions}>
            <div className={styles.searchHeart}>
              <div className={styles.searchBox}>
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="What are you looking for?"
                  className={styles.searchInput}
                />
                <FiSearch className={styles.searchIcon} />
              </div>

              <button className={styles.headerIcon} aria-label="Wishlist">
                <FiHeart />
              </button>
            </div>

            <button className={styles.headerIcon} aria-label="Cart">
              <FiShoppingCart />
            </button>
          </div>
        </div>
      </header>
    </>
  );
};

export default NavBar;
