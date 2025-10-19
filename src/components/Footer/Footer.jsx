import React from "react";
import styles from "./Footer.module.css";

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
            </div>

            <div className={styles.appButtons}>
              <button className={styles.appBtn} aria-label="Google Play">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 2L20 12L3 22V2Z" fill="currentColor" />
                </svg>
                <div>
                  <div className={styles.small}>GET IT ON</div>
                  <div className={styles.btnTitle}>Google Play</div>
                </div>
              </button>

              <button className={styles.appBtn} aria-label="App Store">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="10" fill="currentColor" />
                </svg>
                <div>
                  <div className={styles.small}>Download on the</div>
                  <div className={styles.btnTitle}>App Store</div>
                </div>
              </button>
            </div>
          </div>

          <div className={styles.socialRow}>
            <button className={styles.iconBtn} aria-label="facebook">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879v-6.99H7.898v-2.89h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562v1.875h2.773l-.443 2.89h-2.33v6.99C18.343 21.128 22 16.991 22 12z"/></svg>
            </button>
            <button className={styles.iconBtn} aria-label="twitter">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M22 5.924c-.63.28-1.305.468-2.016.553.726-.435 1.283-1.123 1.547-1.944-.68.403-1.434.696-2.234.854C18.874 4.6 17.985 4 17 4c-1.63 0-2.952 1.322-2.952 2.952 0 .231.026.456.076.672C10.17 7.41 7.12 5.6 5.05 3.05c-.252.434-.397.94-.397 1.48 0 1.02.52 1.92 1.31 2.447-.483-.015-.937-.148-1.334-.369v.037c0 1.426 1.014 2.614 2.36 2.882-.247.067-.507.103-.775.103-.19 0-.375-.018-.555-.053.376 1.175 1.467 2.03 2.76 2.055C8.06 15.06 6.41 15.7 4.658 15.7c-.303 0-.602-.018-.896-.053 1.26.81 2.756 1.282 4.36 1.282 5.236 0 8.1-4.337 8.1-8.1v-.369c.557-.402 1.038-.9 1.418-1.475-.51.227-1.043.38-1.607.449.58-.347 1.024-.897 1.236-1.553z"/></svg>
            </button>
            <button className={styles.iconBtn} aria-label="instagram">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M7 2C4.243 2 2 4.243 2 7v10c0 2.757 2.243 5 5 5h10c2.757 0 5-2.243 5-5V7c0-2.757-2.243-5-5-5H7zm5 6.5A3.5 3.5 0 1 1 8.5 12 3.5 3.5 0 0 1 12 8.5zm4.75-.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5zM12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6z"/></svg>
            </button>
            <button className={styles.iconBtn} aria-label="linkedin">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M19 3A2 2 0 0 1 21 5v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14zM8.5 17V10H6v7h2.5zM7.25 8.75a1.25 1.25 0 1 0-.001-2.501A1.25 1.25 0 0 0 7.25 8.75zM18 17v-3.5c0-2.28-1.22-3.5-3-3.5-1.378 0-2.05.75-2.4 1.281V10H10v7h2.5v-3.75c0-.99.188-1.75 1.25-1.75 1.062 0 1.25.95 1.25 1.812V17H18z"/></svg>
            </button>
          </div>
        </div>
      </div>

      <div className={styles.bottom}>
        <div className={styles.copy}>© Copyright Rimel 2022. All right reserved</div>
      </div>
    </footer>
  );
};

export default Footer;
