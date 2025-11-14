import React, { useEffect, useState } from "react";
import userAPI from "../services/userAPI";

const Account = ({ userId }) => {
  const [profile, setProfile] = useState(null);
  const [addresses, setAddresses] = useState([]);
  const [loadingProfile, setLoadingProfile] = useState(false);
  const [loadingAddresses, setLoadingAddresses] = useState(false);
  const [error, setError] = useState("");

  const [editingAddress, setEditingAddress] = useState(null); // null or {id, userID, fullAddress, city, country}
  const [newAddress, setNewAddress] = useState({ fullAddress: "", city: "", country: "" });

  // ---------------------- Load Profile ----------------------
  const loadProfile = async () => {
    setLoadingProfile(true);
    setError("");
    try {
      const data = await userAPI.getProfile();
      setProfile(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoadingProfile(false);
    }
  };

  // ---------------------- Load Addresses ----------------------
  const loadAddresses = async () => {
    setLoadingAddresses(true);
    setError("");
    try {
      const data = await userAPI.getAddresses(userId);
      setAddresses(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoadingAddresses(false);
    }
  };

  useEffect(() => {
    loadProfile();
    loadAddresses();
  }, [userId]);

  // ---------------------- Handle Address Save (Create or Update) ----------------------
  const handleSaveAddress = async () => {
    setError("");
    try {
      const addressData = {
        userID: userId,
        fullAddress: editingAddress ? editingAddress.fullAddress : newAddress.fullAddress,
        city: editingAddress ? editingAddress.city : newAddress.city,
        country: editingAddress ? editingAddress.country : newAddress.country,
      };

      const result = await userAPI.updateAddress(
        userId,
        editingAddress?.id,
        addressData
      );

      // Refresh addresses after save
      await loadAddresses();

      // Clear form
      setEditingAddress(null);
      setNewAddress({ fullAddress: "", city: "", country: "" });
    } catch (err) {
      setError(err.message);
    }
  };

  // ---------------------- Handle Edit ----------------------
  const handleEditAddress = (address) => {
    setEditingAddress({ ...address });
  };

  // ---------------------- Handle Cancel ----------------------
  const handleCancelEdit = () => {
    setEditingAddress(null);
    setNewAddress({ fullAddress: "", city: "", country: "" });
  };

  return (
    <div style={{ padding: "1rem", maxWidth: "600px", margin: "auto" }}>
      <h2>Account</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {loadingProfile ? (
        <p>Loading profile...</p>
      ) : profile ? (
        <div style={{ marginBottom: "2rem" }}>
          <p><strong>Name:</strong> {profile.name}</p>
          <p><strong>Email:</strong> {profile.email}</p>
        </div>
      ) : null}

      <h3>Addresses</h3>
      {loadingAddresses ? (
        <p>Loading addresses...</p>
      ) : (
        <ul>
          {addresses.map((addr) => (
            <li key={addr.id}>
              {addr.fullAddress}, {addr.city}, {addr.country}{" "}
              <button onClick={() => handleEditAddress(addr)}>Edit</button>
            </li>
          ))}
        </ul>
      )}

      <h3>{editingAddress ? "Edit Address" : "Add New Address"}</h3>
      <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", marginBottom: "1rem" }}>
        <input
          type="text"
          placeholder="Full Address"
          value={editingAddress ? editingAddress.fullAddress : newAddress.fullAddress}
          onChange={(e) => editingAddress 
            ? setEditingAddress({ ...editingAddress, fullAddress: e.target.value })
            : setNewAddress({ ...newAddress, fullAddress: e.target.value })}
        />
        <input
          type="text"
          placeholder="City"
          value={editingAddress ? editingAddress.city : newAddress.city}
          onChange={(e) => editingAddress 
            ? setEditingAddress({ ...editingAddress, city: e.target.value })
            : setNewAddress({ ...newAddress, city: e.target.value })}
        />
        <input
          type="text"
          placeholder="Country"
          value={editingAddress ? editingAddress.country : newAddress.country}
          onChange={(e) => editingAddress 
            ? setEditingAddress({ ...editingAddress, country: e.target.value })
            : setNewAddress({ ...newAddress, country: e.target.value })}
        />
      </div>

      <button onClick={handleSaveAddress}>
        {editingAddress ? "Update Address" : "Add Address"}
      </button>
      {editingAddress && <button onClick={handleCancelEdit} style={{ marginLeft: "1rem" }}>Cancel</button>}
    </div>
  );
};

export default Account;
