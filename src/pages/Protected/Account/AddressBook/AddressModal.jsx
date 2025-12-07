import React, { useEffect, useState } from "react";
import styles from "./AddressModal.module.css";
import { addressAPI } from "../../../../utils/api.js";
import { useTranslation } from "react-i18next";
import Swal from "sweetalert2";

export default function AddressModal({ userId, initialData = null, onClose, onSaved }) {
    const { t } = useTranslation();
    const isEdit = Boolean(initialData);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState(null);

    const [form, setForm] = useState({
        fullAddress: "",
        city: "",
        country: "",
    });

    useEffect(() => {
        if (initialData) {
            setForm({
                fullAddress: initialData.fullAddress || initialData.address || "",
                city: initialData.city || "",
                country: initialData.country || "",
            });
        } else {
            setForm({ fullAddress: "", city: "", country: "" });
        }
    }, [initialData]);

    const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        if (!userId) {
            setError(t("addressModal.userError"));
            return;
        }

        if (!form.city || !form.country) {
            setError(t("addressModal.cityCountryRequired"));
            return;
        }

        setSaving(true);
        try {
            const payload = {
                userID: userId,
                fullAddress: (form.fullAddress || "").trim(),
                city: form.city.trim(),
                country: form.country.trim(),
            };

            let saved;
            if (isEdit) {
                const id = initialData.addressID ?? initialData.id ?? initialData.addressId;
                const res = await addressAPI.updateAddress(id, payload);
                saved = res?.data ?? res;
            } else {
                const res = await addressAPI.createAddress(payload);
                saved = res;
            }

            const normalized = saved?.data ?? saved;
            onSaved(normalized);
        } catch (err) {
            const errorMessage = err?.response?.data?.message || err.message || t("addressModal.saveError");
            setError(errorMessage);
            Swal.fire({
                icon: 'error',
                title: 'Failed to Save Address',
                text: errorMessage,
            });
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className={styles.modalBackdrop}>
            <div className={styles.modal}>
                <div className={styles.modalHeader}>
                    <h4>{isEdit ? "Edit Address" : "Add Address"}</h4>
                    <button className={styles.closeBtn} onClick={onClose}>✕</button>
                </div>

                <form className={styles.modalBody} onSubmit={handleSubmit}>
                    {error && <div className={styles.error}>{error}</div>}

                    <label className={styles.label}>
                        Full Address
                        <input
                            name="fullAddress"
                            value={form.fullAddress}
                            onChange={handleChange}
                            className={styles.input}
                            maxLength={500}
                            placeholder="Enter full address"
                        />
                    </label>

                    <label className={styles.label}>
                        City
                        <input name="city" value={form.city} onChange={handleChange} className={styles.input} maxLength={100} />
                    </label>

                    <label className={styles.label}>
                        Country
                        <input name="country" value={form.country} onChange={handleChange} className={styles.input} maxLength={100} />
                    </label>

                    <div className={styles.modalActions}>
                        <button type="button" className={styles.cancelBtn} onClick={onClose} disabled={saving}>
                            Cancel
                        </button>
                        <button type="submit" className={styles.primaryBtn} disabled={saving}>
                            {saving
                                ? isEdit
                                    ? "Saving..."
                                    : "Creating..."
                                : isEdit
                                    ? "Save Address"
                                    : "Create Address"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
