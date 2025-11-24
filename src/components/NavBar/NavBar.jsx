import { FiHeart, FiShoppingCart, FiX } from "react-icons/fi";
import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAuth } from "../../hooks/useAuth";
import { cartActions } from "../../store/Cart/slice.js";
import { wishlistActions } from "../../store/Wishlist/slice.js";
import styles from "./NavBar.module.css";
import AccountDrop from "../AccountDropDown/AccountDrop.jsx";

const NavBar = () => {
  const { t, i18n } = useTranslation();
  const [searchQuery, setSearchQuery] = useState("");
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const userMenuRef = useRef(null);
  const mobileMenuRef = useRef(null);

  const { logout } = useAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user);
  const cartItems = useSelector((state) => state.cart.items);
  const cartCount = useSelector((state) => state.cart.count);
  const wishlistItems = useSelector((state) => state.wishlist.items);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  const handleLogout = async () => {
    // Use the logout from useAuth hook which handles:
    // - Calling backend to revoke refresh token
    // - Clearing tokens from localStorage
    // - Updating Redux auth state
    await logout();

    // Clear cart and wishlist from Redux
    dispatch(cartActions.clearCart());
    dispatch(wishlistActions.clearWishlist());

    setUserMenuOpen(false);
    navigate("/login");
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setUserMenuOpen(false);
      }
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target)
      ) {
        setMobileMenuOpen(false);
      }
    };

    if (userMenuOpen || mobileMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [userMenuOpen, mobileMenuOpen]);

  return (
    <>
      {/* Top Banner */}
      <div className={styles.topBanner}>
        <div className={styles.bannerContent}>
          <p className={styles.bannerText}>{t("banner.summerSale")}</p>
          <a href="#" className={styles.shopNowLink}>
            {t("banner.shopNow")}
          </a>
        </div>
        <div className={styles.languageSelector}>
          <div
            className={styles.langDropdown}
            tabIndex={0}
            aria-label="Language selector"
          >
            <div className={styles.langCurrent}>
              {t("languages." + i18n.language)}{" "}
              <span className={styles.caret}>▾</span>
            </div>
            <ul className={styles.langList}>
              <li>
                <button type="button" onClick={() => changeLanguage("en")}>
                  {t("languages.english")}
                </button>
              </li>
              <li>
                <button type="button" onClick={() => changeLanguage("ar")}>
                  {t("languages.arabic")}
                </button>
              </li>
              <li>
                <button type="button" onClick={() => changeLanguage("fr")}>
                  {t("languages.french")}
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className={styles.header}>
        <div className={styles.headerContainer}>
          {/* Logo */}
          <Link to="/" className={styles.logo}>
            <h1>{t("nav.logo")}</h1>
          </Link>

          {/* Hamburger Menu Button - Mobile Only */}
          <button
            className={styles.hamburger}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={t("nav.toggleMenu")}
          >
            {mobileMenuOpen ? (
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            ) : (
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            )}
          </button>

          <nav
            className={`${styles.navLinks} ${
              mobileMenuOpen ? styles.mobileMenuOpen : ""
            }`}
            ref={mobileMenuRef}
          >
            {/* Close button inside overlay for small/tablet screens */}
            {mobileMenuOpen && (
              <button
                className={styles.closeNav}
                onClick={() => setMobileMenuOpen(false)}
                aria-label={t("nav.closeMenu")}
              >
                <FiX size={20} />
              </button>
            )}

            <Link
              to="/"
              className={`${styles.navLink} ${
                location.pathname === "/" ? styles.active : ""
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              {t("nav.home")}
            </Link>

            <Link
              to="/contact"
              className={`${styles.navLink} ${
                location.pathname === "/contact" ? styles.active : ""
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              {t("nav.contact")}
            </Link>

            <Link
              to="/about"
              className={`${styles.navLink} ${
                location.pathname === "/about" ? styles.active : ""
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              {t("nav.about")}
            </Link>

            <Link
              to="/signup"
              className={`${styles.navLink} ${
                location.pathname === "/signup" ? styles.active : ""
              } ${isAuthenticated === true ? styles.disabled : ""} `}
              onClick={() => setMobileMenuOpen(false)}
            >
              {t("nav.signup")}
            </Link>

            <Link
              to="/account"
              className={`${styles.navLink} ${
                location.pathname === "/account" ? styles.active : ""
              } ${isAuthenticated === false ? styles.disabled : ""}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              {t("nav.myAccount")}
            </Link>
          </nav>

          {/* Right Side Actions */}
          <div className={styles.headerRight}>
            {/* Search Bar */}
            <div className={styles.searchBox}>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t("nav.searchPlaceholder")}
                className={styles.searchInput}
              />
              <button className={styles.searchButton} aria-label={t("nav.search")}>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <circle cx="11" cy="11" r="8"></circle>
                  <path d="m21 21-4.35-4.35"></path>
                </svg>
              </button>
            </div>

            {/* action icons */}
            <div className={styles.actionsTop}>
              {/* Wishlist (heart) - visible for all users */}
              <button
                className={styles.iconButton}
                onClick={() => navigate("/wishlist")}
                aria-label={t("nav.wishlist")}
                title={t("nav.wishlist")}
              >
                <FiHeart size={20} />
                {wishlistItems.length > 0 && (
                  <span className={styles.badge}>{wishlistItems.length}</span>
                )}
              </button>

              {/* Cart - visible for all users */}
              <button
                className={styles.iconButton}
                onClick={() => navigate("/cart")}
                aria-label={t("nav.cart")}
                title={t("nav.cart")}
              >
                <FiShoppingCart size={20} />
                {(cartCount > 0 || cartItems.length > 0) && (
                  <span className={styles.badge}>{cartCount ?? cartItems.length}</span>
                )}
              </button>

              {isAuthenticated && user ? (
                <div className={styles.userMenu} ref={userMenuRef}>
                  <button
                    className={`${styles.iconButton} ${styles.userButton} ${
                      userMenuOpen ? styles.active : ""
                    }`}
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    aria-label={t("nav.userMenu")}
                  >
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                      <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                  </button>

                  {userMenuOpen && (
                    <AccountDrop
                      closeMenu={() => setUserMenuOpen(false)}
                      onLogout={handleLogout}
                    />
                  )}
                </div>
              ) : (
                <button
                  className={styles.iconButton}
                  onClick={() => navigate("/login")}
                  aria-label={t("nav.login")}
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                </button>
              )}
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default NavBar;
