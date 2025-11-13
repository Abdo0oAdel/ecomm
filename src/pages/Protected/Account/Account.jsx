import React, { useState } from "react";
import styles from "./Account.module.css";
import { Link } from "react-router-dom";
export default function Account() {
  const [formData, setFormData] = useState({
    firstName: "Md",
    lastName: "Rimel",
    email: "rimellll@gmail.com",
    address: "Kingston, 5236, United State",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Profile Updated:", formData);
    alert("Profile saved successfully!");
  };

  return (
    <div className={styles.container}>
      {/* Sidebar */}
      <aside className={styles.sidebar}>
        <h2>Manage My Account</h2>
        <div className={styles.navSection}>
          <Link to="#" className={`${styles.navLink} ${styles.navLinkActive}`}>
            My Profile
          </Link>
          <Link to="#" className={styles.navLink}>
            Address Book
          </Link>
          <Link to="#" className={styles.navLink}>
            My Payment Options
          </Link>
        </div>

        <h2>My Orders</h2>
        <div className={styles.navSection}>
          <Link to="#" className={styles.navLink}>
            My Returns
          </Link>
          <Link to="/Cancellation" className={styles.navLink}>
            My Cancellations
          </Link>
        </div>

        <h2>My Wishlist</h2>
        <a href="#" className={styles.navLink}>
          View Wishlist
        </a>
      </aside>

      {/* Main Content */}
      <main className={styles.main}>
        <div className={styles.topBar}>
          <p className={styles.breadcrumb}>Home / My Account</p>
          <p className={styles.welcomeText}>
            Welcome! <span className={styles.username}>Md Rimel</span>
          </p>
        </div>

        <div className={styles.profileCard}>
          <h3>Edit Your Profile</h3>

          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formGrid}>
              <div>
                <label className={styles.label}>First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className={styles.input}
                />
              </div>

              <div>
                <label className={styles.label}>Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className={styles.input}
                />
              </div>

              <div>
                <label className={styles.label}>Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  readOnly
                  className={`${styles.input} ${styles.inputDisabled}`}
                />
              </div>

              <div>
                <label className={styles.label}>Address</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className={styles.input}
                />
              </div>
            </div>

            <div className={styles.passwordSection}>
              <h4>Password Changes</h4>
              <div className={styles.formGrid}>
                <div>
                  <input
                    type="password"
                    name="currentPassword"
                    placeholder="Current Password"
                    value={formData.currentPassword}
                    onChange={handleChange}
                    className={styles.input}
                  />
                </div>
                <div>
                  <input
                    type="password"
                    name="newPassword"
                    placeholder="New Password"
                    value={formData.newPassword}
                    onChange={handleChange}
                    className={styles.input}
                  />
                </div>
                <div>
                  <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm New Password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className={styles.input}
                  />
                </div>
              </div>
            </div>

            <div className={styles.buttonRow}>
              <button type="button" className={styles.cancelBtn}>
                Cancel
              </button>
              <button type="submit" className={styles.saveBtn}>
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
