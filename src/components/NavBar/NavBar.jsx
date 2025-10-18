import React from "react";
import styles from "./NavBar.module.css";
import {
  FiSearch,
  FiHeart,
  FiShoppingCart,
  FiChevronDown,
} from "react-icons/fi";

const NavBar = () => {
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
          <span>English</span>
          <FiChevronDown />
        </div>
      </div>

      {/* Main Header */}
      <header className={styles.header}>
        <div className={styles.headerContainer}>
          {/* Logo */}
          <div className={styles.logo}>
            <h1>Zenon</h1>
          </div>

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
