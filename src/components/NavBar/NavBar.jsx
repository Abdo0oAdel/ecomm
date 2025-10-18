import React, { useState } from 'react';
import styles from './NavBar.module.css';
import { FiHeart, FiSearch, FiShoppingCart } from 'react-icons/fi';

const NavBar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [language, setLanguage] = useState('English');

  return (
    <>
      {/* Top Banner */}
      <div className={styles.topBanner}>
        <p>Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%! <span>ShopNow</span></p>
        <div className={styles.languageSelector}>
          <select value={language} onChange={(e) => setLanguage(e.target.value)}>
            <option>English</option>
            <option>العربية</option>
            <option>Français</option>
          </select>
        </div>
      </div>
      
      {/* Main Navigation */}
      <nav className={styles.navbar}>
        <div className={styles.navContainer}>
          <div className={styles.logo}>
            <h1>Zenon</h1>
          </div>
          
          <ul className={styles.navLinks}>
            <li><a href="/" className={styles.active}>Home</a></li>
            <li><a href="/contact">Contact</a></li>
            <li><a href="/about">About</a></li>
            <li><a href="/signup">Sign Up</a></li>
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
