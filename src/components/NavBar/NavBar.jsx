<<<<<<< HEAD
import React, { useState } from 'react';
import styles from './NavBar.module.css';
import { FiHeart, FiSearch, FiShoppingCart, FiMenu, FiX } from 'react-icons/fi';

const NavBar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [language, setLanguage] = useState('English');
  const [menuOpen, setMenuOpen] = useState(false);

=======
import React from "react";
import styles from "./NavBar.module.css";
import {
  FiSearch,
  FiHeart,
  FiShoppingCart,
  FiChevronDown,
} from "react-icons/fi";

const NavBar = () => {
>>>>>>> origin/master
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
<<<<<<< HEAD
          {/* Custom hoverable language dropdown: shows options on hover/focus */}
          <div className={styles.langDropdown} tabIndex={0} aria-label="Language selector">
            <div className={styles.langCurrent}>{language} <span className={styles.caret}>▾</span></div>
            <ul className={styles.langList}>
              <li><button type="button" onClick={() => setLanguage('English')}>English</button></li>
              <li><button type="button" onClick={() => setLanguage('العربية')}>العربية</button></li>
              <li><button type="button" onClick={() => setLanguage('Français')}>Français</button></li>
            </ul>
          </div>
=======
          <span>English</span>
          <FiChevronDown />
>>>>>>> origin/master
        </div>
      </div>

      {/* Main Header */}
      <header className={styles.header}>
        <div className={styles.headerContainer}>
          {/* Logo */}
          <div className={styles.logo}>
            <h1>Zenon</h1>
          </div>
<<<<<<< HEAD
          
          {/* mobile menu toggle */}
          <button
            className={styles.menuBtn}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((s) => !s)}
          >
            {menuOpen ? <FiX /> : <FiMenu />}
          </button>

          <ul className={`${styles.navLinks} ${menuOpen ? styles.open : ''}`}>
            <li><a href="/" className={styles.active} onClick={() => setMenuOpen(false)}>Home</a></li>
            <li><a href="/contact" onClick={() => setMenuOpen(false)}>Contact</a></li>
            <li><a href="/about" onClick={() => setMenuOpen(false)}>About</a></li>
            <li><a href="/signup" onClick={() => setMenuOpen(false)}>Sign Up</a></li>
          </ul>
          
          <div className={styles.navActions}>
            <div className={styles.searchBox}>
              <input 
                type="text" 
=======

          {/* Navigation */}
          <nav className={styles.navigation}>
            <a href="/" className={styles.navLink}>
              Home
            </a>
            <a href="/contact" className={styles.navLink}>
              Contact
            </a>
            <a href="/about" className={styles.navLink}>
              About
            </a>
            <button className={styles.signUpBtn}>Sign Up</button>
          </nav>

          {/* Right Side */}
          <div className={styles.headerRight}>
            <div className={styles.searchBar}>
              <input
                type="text"
>>>>>>> origin/master
                placeholder="What are you looking for?"
                className={styles.searchInput}
              />
              <FiSearch className={styles.searchIcon} />
            </div>

            <button className={styles.headerIcon}>
              <FiHeart />
            </button>

            <button className={styles.headerIcon}>
              <FiShoppingCart />
            </button>
          </div>
        </div>
      </header>
    </>
  );
};

export default NavBar;
