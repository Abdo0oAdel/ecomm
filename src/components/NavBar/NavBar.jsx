import React, { useState } from 'react';
import styles from './NavBar.module.css';
import { FiHeart, FiSearch, FiShoppingCart, FiMenu, FiX } from 'react-icons/fi';

const NavBar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [language, setLanguage] = useState('English');
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {/* Top Banner */}
      <div className={styles.topBanner}>
        <p>Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%! <span>ShopNow</span></p>
        <div className={styles.languageSelector}>
          {/* Custom hoverable language dropdown: shows options on hover/focus */}
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
      
      {/* Main Navigation */}
      <nav className={styles.navbar}>
        <div className={styles.navContainer}>
          <div className={styles.logo}>
            <h1>Exclusive</h1>
          </div>
          
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
                placeholder="What are you looking for?"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button className={styles.searchBtn} aria-label="search">
                <FiSearch />
              </button>
            </div>
            
            <div className={styles.actionIcons}>
              <button className={styles.iconBtn} aria-label="wishlist">
                <FiHeart />
              </button>
              <button className={styles.iconBtn} aria-label="cart">
                <FiShoppingCart />
              </button>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavBar;
