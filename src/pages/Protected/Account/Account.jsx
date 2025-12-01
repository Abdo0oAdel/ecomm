import React, { useState, useEffect } from "react";
import styles from "./Account.module.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { addressAPI } from "../../../utils/api.js";
import { changeUserPassword  } from "../../../services/users.js";

export default function Account() {
  const { t } = useTranslation();
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
        setUserId(userIdNumber);

        // Load addresses if userId is available
        let addressText = "";
        if (userIdNumber && !isNaN(userIdNumber)) {
          try {
            console.log("Fetching addresses for userId:", userIdNumber);
         // const addresses = await addressAPI.getAddress(userIdNumber);
            const addresses = await  addressAPI.getUserAddress();
            console.log("Addresses response:", addresses);
            console.log(
              "Addresses type:",
              typeof addresses,
              "Is array:",
              Array.isArray(addresses)
            );

            // API can return either a single AddressDto object or an array
            // Check for single object first (actual API behavior)
            if (
              addresses &&
              typeof addresses === "object" &&
              !Array.isArray(addresses)
            ) {
              // Handle single address object (actual API response)
              console.log("Single address object:", addresses);
              if (
                addresses.data &&
                Array.isArray(addresses.data) &&
                addresses.data.length > 0
              ) {
                const extractedAddressId = addresses.data[0].addressID;
                console.log("Extracted addressID:", extractedAddressId);
                setAddressObject(addresses.data[0]);
                setAddressId(extractedAddressId);
                addressText = addresses.data[0].fullAddress || "";
                console.log("Address text (fullAddress only):", addressText);
              }
            } else if (Array.isArray(addresses)) {
              // Handle array of addresses (per Swagger spec, but API returns single object)
              if (addresses.length > 0) {
                // Use the first address
                const firstAddress = addresses[0];
                console.log("First address from array:", firstAddress);

                // Store address object and ID for updates
                const extractedAddressId =
                  firstAddress.addressID ||
                  firstAddress.id ||
                  firstAddress.addressId;
                console.log(
                  "Extracted addressID from array:",
                  extractedAddressId
                );
                setAddressObject(firstAddress);
                setAddressId(extractedAddressId);

                // Show full address in the address input
                if (typeof firstAddress === "string") {
                  addressText = firstAddress;
                } else {
                  addressText = firstAddress.fullAddress || "";
                  console.log("Address text (fullAddress only):", addressText);
                }
              } else {
                console.log("Addresses array is empty");
              }
            } else {
              console.log(
                "Unexpected addresses format:",
                typeof addresses,
                addresses
              );
            }
          } catch (addressError) {
            console.error("Error loading addresses:", addressError);
            console.error(
              "Address error details:",
              addressError.message,
              addressError.stack
            );
            // Don't fail the whole profile load if addresses fail
            setAddressObject(null);
            setAddressId(null);
          }
        } else {
          console.warn(
            "No userId available, cannot load addresses. Redux user:",
            reduxUser
          );
        }

        console.log("Final addressText before setting form:", addressText);

        // Map Redux user data to form data
        setFormData({
          firstName: reduxUser?.firstName || "",
          lastName: reduxUser?.lastName || "",
          email: reduxUser?.email || "",
          address: addressText,
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
      } catch (err) {
        console.error("Error loading profile:", err);
        setError(err.message || t("account.errors.loadProfile"));

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
  }, [reduxUser, t]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCancel = () => {
    // Reset form to original values
    window.location.reload();
  };

  const validateForm = () => {
        // First Name & Last Name
        const nameRegex = /^[A-Za-z]+$/;

        if (!formData.firstName.trim()) return "First Name is required";
        if (!nameRegex.test(formData.firstName)) return "First Name must contain letters only";
        if (formData.firstName.startsWith(" ")) return "First Name cannot start with a space";

        if (!formData.lastName.trim()) return "Last Name is required";
        if (!nameRegex.test(formData.lastName)) return "Last Name must contain letters only";
        if (formData.lastName.startsWith(" ")) return "Last Name cannot start with a space";

        // Address validation
        const address = formData.address.trim();
        if (!address) return "Address is required";
        if (address.startsWith(" ")) return "Address cannot start with a space";

        // Password validation (only if fields filled)
        if (formData.currentPassword || formData.newPassword || formData.confirmPassword) {
            if (!formData.currentPassword) return "Current Password is required";
            if (!formData.newPassword) return "New Password is required";

            if (formData.newPassword === formData.currentPassword) return "New Password must differ from current password";
            if (!/[A-Z]/.test(formData.newPassword)) return "Password must include at least one uppercase letter";
            if (!/[a-z]/.test(formData.newPassword)) return "Password must include at least one lowercase letter";
            if (!/[0-9]/.test(formData.newPassword)) return "Password must include at least one number";
            if (!/[^A-Za-z0-9]/.test(formData.newPassword)) return "Password must include at least one special character";

            if (!formData.confirmPassword) return "Confirm Password is required";
            if (formData.newPassword !== formData.confirmPassword) return "Passwords do not match";
        }

        return null;
    };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

  const validationError = validateForm();
      if (validationError) {
          setError(validationError);
          return;
    }

    // Check if password fields are filled
    const isChangingPassword =
      formData.currentPassword ||
      formData.newPassword ||
      formData.confirmPassword;

    // Validate password change if attempting to change
    if (isChangingPassword) {
      if (!formData.currentPassword) {
        setError(t("account.errors.currentPasswordRequired"));
        return;
      }
      if (!formData.newPassword) {
        setError(t("account.errors.newPasswordRequired"));
        return;
      }
      if (formData.newPassword !== formData.confirmPassword) {
        setError(t("account.errors.passwordsDontMatch"));
        return;
      }
      if (formData.newPassword.length < 6) {
        setError(t("account.errors.passwordTooShort"));
        return;
      }
    }

    try {
      setLoading(true);

      // Note: There's no profile update endpoint in the API according to Swagger
      // Profile updates (firstName, lastName) would need to be handled differently
      // For now, we'll only update the address and password
      // You may need to implement profile updates through a different mechanism

      // Update address if userId is available
        if (userId) {
            // According to Swagger: AddressCreateUpdateDto requires:
            // - userID (integer, required) - PascalCase
            // - fullAddress (string, maxLength 500)
            // - city (string, maxLength 100, required)
            // - country (string, maxLength 100, required)

            let fullAddress = formData.address || "";
            fullAddress = fullAddress.trim();
            let city = addressObject?.city || "Unknown";
            let country = addressObject?.country || "Unknown";

            const addressData = {
                userID: userId,
                fullAddress,
                city,
                country,
            };

            console.log("Updating address - addressId:", addressId, "addressData:", addressData);

            let updatedAddress;
            if (addressId) {
                // Update existing address
                updatedAddress = await addressAPI.updateAddress(addressId, addressData);
            } else {
                // Create new address
                updatedAddress = await addressAPI.createAddress(addressData);
                if (updatedAddress) {
                    setAddressId(updatedAddress.addressID);
                }
            }
            if (updatedAddress) setAddressObject(updatedAddress);
        }

     // ----- CHANGE PASSWORD -----
        if (isChangingPassword) {
            if (!userId) {
                setError("User ID not found. Please login again.");
                return;
            }

            try {
                const result =  await changeUserPassword({
                    userID: userId,                       // correct key
                    currentPassword: formData.currentPassword,
                    newPassword: formData.newPassword,
                });
                console.log("Password updated:", result);
                setSuccess(t("account.success.passwordUpdated"));
            } catch (err) {
                console.error("Password change error:", err);
                setError(err.response?.data?.message || t("account.errors.updatePassword"));
                return;
            }
        }
      /*
      // Clear password fields after successful update
      setFormData({
        ...formData,
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      */

      setSuccess(t("account.success.profileUpdated"));
      setError(null);

      // Clear success message after 5 seconds
      setTimeout(() => {
        setSuccess(null);
      }, 5000);
    } catch (err) {
      console.error("Error updating profile:", err);
      setError(err.message || t("account.errors.updateProfile"));
      setSuccess(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      {/* Sidebar */}
      <aside className={styles.sidebar}>
        <h2>{t("account.manageAccount")}</h2>
        <div className={styles.navSection}>
          <Link to="#" className={`${styles.navLink} ${styles.navLinkActive}`}>
            {t("account.myProfile")}
          </Link>
          <Link to="/AddressBook" className={styles.navLink}>
            {t("account.addressBook")}
          </Link>
          <Link to="#" className={styles.navLink}>
            {t("account.myPaymentOptions")}
          </Link>
        </div>

        <h2>{t("account.myOrders")}</h2>
        <div className={styles.navSection}>
          <Link to="/MyOrder" className={styles.navLink}>
            {t("account.myOrders")}
          </Link>
          <Link to="/Cancellation" className={styles.navLink}>
            {t("account.myCancellations")}
          </Link>
        </div>

        <h2>{t("account.myWishlist")}</h2>
        <a href="/Wishlist" className={styles.navLink}>
          {t("account.viewWishlist")}
        </a>
      </aside>

      {/* Main Content */}
      <main className={styles.main}>
        <div className={styles.topBar}>
          <p className={styles.breadcrumb}>{t("account.breadcrumb")}</p>
          <p className={styles.welcomeText}>
            {t("account.welcome")}!{" "}
            <span className={styles.username}>
              {formData.firstName && formData.lastName
                ? `${formData.firstName} ${formData.lastName}`
                : reduxUser?.firstName && reduxUser?.lastName
                ? `${reduxUser.firstName} ${reduxUser.lastName}`
                : t("account.user")}
            </span>
          </p>
        </div>

        <div className={styles.profileCard}>
          <h3>{t("account.editProfile")}</h3>

          {error && (
            <div
              style={{
                color: "red",
                marginBottom: "1rem",
                padding: "0.5rem",
                backgroundColor: "#fee",
                border: "1px solid #fcc",
                borderRadius: "4px",
              }}
            >
              {error}
            </div>
          )}

          {success && (
            <div
              style={{
                color: "green",
                marginBottom: "1rem",
                padding: "0.5rem",
                backgroundColor: "#efe",
                border: "1px solid #cfc",
                borderRadius: "4px",
              }}
            >
              {success}
            </div>
          )}

          {loadingProfile ? (
            <div style={{ textAlign: "center", padding: "2rem" }}>
              {t("account.loadingProfile")}
            </div>
          ) : (
            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.formGrid}>
                <div>
                  <label className={styles.label}>
                    {t("account.firstName")}
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className={styles.input}
                  />
                </div>

                <div>
                  <label className={styles.label}>
                    {t("account.lastName")}
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className={styles.input}
                  />
                </div>

                <div>
                  <label className={styles.label}>{t("account.email")}</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    readOnly
                    className={`${styles.input} ${styles.inputDisabled}`}
                  />
                </div>

                <div>
                  <label className={styles.label}>{t("account.address")}</label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className={styles.input}
                    placeholder={
                      loadingProfile
                        ? t("account.loadingAddress")
                        : t("account.enterAddress")
                    }
                  />
                  {!loadingProfile && !formData.address && (
                    <small
                      style={{
                        color: "#666",
                        fontSize: "0.85rem",
                        display: "block",
                        marginTop: "0.25rem",
                      }}
                    >
                      {t("account.noAddressFound")}
                    </small>
                  )}
                </div>
              </div>

              <div className={styles.passwordSection}>
                <h4>{t("account.passwordChanges")}</h4>
                <div className={styles.formGrid}>
                  <div>
                    <input
                      type="password"
                      name="currentPassword"
                      placeholder={t("account.currentPassword")}
                      value={formData.currentPassword}
                      onChange={handleChange}
                      className={styles.input}
                    />
                  </div>
                  <div>
                    <input
                      type="password"
                      name="newPassword"
                      placeholder={t("account.newPassword")}
                      value={formData.newPassword}
                      onChange={handleChange}
                      className={styles.input}
                    />
                  </div>
                  <div>
                    <input
                      type="password"
                      name="confirmPassword"
                      placeholder={t("account.confirmNewPassword")}
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
                  {t("account.cancel")}
                </button>
                <button
                  type="submit"
                  className={styles.saveBtn}
                  disabled={loading}
                >
                  {loading ? t("account.saving") : t("account.saveChanges")}
                </button>
              </div>
            </form>
          )}
        </div>
      </main>
    </div>
  );
}
