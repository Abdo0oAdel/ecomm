import React, { useState, useEffect } from "react";
import styles from "./Account.module.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";


export default function Account() {
    const { user: reduxUser } = useSelector((state) => state.auth);
    const [loading, setLoading] = useState(false);
    const [loadingProfile, setLoadingProfile] = useState(true);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [userId, setUserId] = useState(null);
    const [addressId, setAddressId] = useState(null);
    const [addressObject, setAddressObject] = useState(null);

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        address: "",
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    });

    // Load user profile and addresses on component mount
    useEffect(() => {
        const loadProfile = async () => {
            try {
                setLoadingProfile(true);
                setError(null);

                // Use Redux user data (from login response) since there's no profile endpoint in API
                // Get userId from Redux - API expects integer
                const currentUserId = reduxUser?.userId || reduxUser?.id;
                const userIdNumber = currentUserId ? parseInt(currentUserId, 10) : null;
                console.log("Loading profile - Redux user:", reduxUser);
                console.log("Current userId (raw):", currentUserId);
                console.log("Current userId (number):", userIdNumber);
                setUserId(userIdNumber);

                // Map Redux user data to form data
                setFormData({
                    firstName: reduxUser?.firstName || "",
                    lastName: reduxUser?.lastName || "",
                    email: reduxUser?.email || "",
                    address: "",
                    currentPassword: "",
                    newPassword: "",
                    confirmPassword: "",
                });
            } catch (err) {
                console.error("Error loading profile:", err);
                setError(err.message || "Failed to load profile");

                // Fallback to Redux user data
                if (reduxUser) {
                    setFormData({
                        firstName: reduxUser.firstName || "",
                        lastName: reduxUser.lastName || "",
                        email: reduxUser.email || "",
                        address: "",
                        currentPassword: "",
                        newPassword: "",
                        confirmPassword: "",
                    });
                }
            } finally {
                setLoadingProfile(false);
            }
        };

        loadProfile();
    }, [reduxUser]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleCancel = () => {
        // Reset form to original values
        window.location.reload();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);

        // Check if password fields are filled
        const isChangingPassword =
            formData.currentPassword ||
            formData.newPassword ||
            formData.confirmPassword;

        // Validate password change if attempting to change
        if (isChangingPassword) {
            if (!formData.currentPassword) {
                setError("Please enter your current password");
                return;
            }
            if (!formData.newPassword) {
                setError("Please enter a new password");
                return;
            }
            if (formData.newPassword !== formData.confirmPassword) {
                setError("New passwords do not match");
                return;
            }
            if (formData.newPassword.length < 6) {
                setError("New password must be at least 6 characters");
                return;
            }
        }

        try {
            setLoading(true);

            // Note: There's no profile update endpoint in the API according to Swagger
            // Profile updates (firstName, lastName) would need to be handled differently
            // For now, we'll only update the address and password
            // You may need to implement profile updates through a different mechanism


            // Note: There's no change password endpoint in the API according to Swagger
            // Password changes would need to be handled through a different mechanism
            // For now, we'll skip password updates
            // if (isChangingPassword) {
            //   await userAPI.changePassword(
            //     formData.currentPassword,
            //     formData.newPassword
            //   );
            // }

            // Clear password fields after successful update
            setFormData({
                ...formData,
                currentPassword: "",
                newPassword: "",
                confirmPassword: "",
            });

            setSuccess("Profile updated successfully!");
            setError(null);

            // Clear success message after 5 seconds
            setTimeout(() => {
                setSuccess(null);
            }, 5000);
        } catch (err) {
            console.error("Error updating profile:", err);
            setError(err.message || "Failed to update profile");
            setSuccess(null);
        } finally {
            setLoading(false);
        }
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
                        Welcome!{" "}
                        <span className={styles.username}>
              {formData.firstName && formData.lastName
                  ? `${formData.firstName} ${formData.lastName}`
                  : reduxUser?.firstName && reduxUser?.lastName
                      ? `${reduxUser.firstName} ${reduxUser.lastName}`
                      : "User"}
            </span>
                    </p>
                </div>

                <div className={styles.profileCard}>
                    <h3>Edit Your Profile</h3>

                    {error && (
                        <div style={{ color: "red", marginBottom: "1rem", padding: "0.5rem", backgroundColor: "#fee", border: "1px solid #fcc", borderRadius: "4px" }}>
                            {error}
                        </div>
                    )}

                    {success && (
                        <div style={{ color: "green", marginBottom: "1rem", padding: "0.5rem", backgroundColor: "#efe", border: "1px solid #cfc", borderRadius: "4px" }}>
                            {success}
                        </div>
                    )}

                    {loadingProfile ? (
                        <div style={{ textAlign: "center", padding: "2rem" }}>
                            Loading profile...
                        </div>
                    ) : (
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
                                        placeholder={loadingProfile ? "Loading address..." : "Enter your address"}
                                    />
                                    {!loadingProfile && !formData.address && (
                                        <small style={{ color: "#666", fontSize: "0.85rem", display: "block", marginTop: "0.25rem" }}>
                                            No address found. You can add one below.
                                        </small>
                                    )}
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
                                <button
                                    type="button"
                                    className={styles.cancelBtn}
                                    onClick={handleCancel}
                                    disabled={loading}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className={styles.saveBtn}
                                    disabled={loading}
                                >
                                    {loading ? "Saving..." : "Save Changes"}
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </main>
        </div>
    );
}
