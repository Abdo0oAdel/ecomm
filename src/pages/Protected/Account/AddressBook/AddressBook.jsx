import React, { useEffect, useState } from "react";
import styles from "./AddressBook.module.css";
import AddressModal from "./AddressModal";
import { useSelector } from "react-redux";
import { addressAPI } from "../../../../utils/api.js";
import { useTranslation } from "react-i18next";
import { axiosWithAuth } from "../../../../utils/helpers";
import Swal from "sweetalert2";

export default function AddressBook() {
    const { t } = useTranslation();
    const { user: reduxUser } = useSelector((s) => s.auth);
    const [loading, setLoading] = useState(true);
    const [addresses, setAddresses] = useState([]);
    const [error, setError] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [editingAddress, setEditingAddress] = useState(null);

    const userId = parseInt(reduxUser?.userId || reduxUser?.id || reduxUser?.UserId, 10) || null;

    useEffect(() => {
        const load = async () => {
            if (!userId) {
                setAddresses([]);
                setLoading(false);
                return;
            }
            setLoading(true);
            setError(null);
            try {
              // const res = await addressAPI.getAddress(userId);
                 const res = await addressAPI.getUserAddress();
                
                const list = res?.data?.data ?? res?.data ?? res ?? [];
                setAddresses(Array.isArray(list) ? list : []);
            } catch (err) {
                const errorMessage = err?.response?.data?.message || err.message || t("addressBook.loadError");
                setError(errorMessage);
                setAddresses([]);
                Swal.fire({
                    icon: 'error',
                    title: 'Failed to Load Addresses',
                    text: errorMessage,
                });
            } finally {
                setLoading(false);
            }
        };

        load();
    }, [userId, t]);

    const onAdd = () => {
        setEditingAddress(null);
        setModalOpen(true);
    };

    const onEdit = (address) => {
        setEditingAddress(address);
        setModalOpen(true);
    };

    const onDelete = async (addressId) => {
        if (!addressId) return;
        
        const result = await Swal.fire({
            icon: 'warning',
            title: t("addressBook.confirmDelete"),
            text: 'Are you sure you want to delete this address?',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'Cancel',
        });
        
        if (!result.isConfirmed) return;

        try {
            if (typeof addressAPI.deleteAddress === "function") {
                await addressAPI.deleteAddress(addressId);
            } else {
                await axiosWithAuth.delete(`/Addresses/${addressId}`);
            }
            setAddresses((prev) => prev.filter((a) => (a.addressID ?? a.id ?? a.addressId) !== addressId));
            Swal.fire({
                icon: 'success',
                title: 'Deleted',
                text: 'Address deleted successfully.',
                timer: 1500,
                showConfirmButton: false,
            });
        } catch (err) {
            const errorMessage = err?.response?.data?.message || err.message || t("addressBook.deleteError");
            Swal.fire({
                icon: 'error',
                title: 'Delete Failed',
                text: errorMessage,
            });
        }
    };

    const handleSave = (savedAddress) => {
        if (!savedAddress) return;
        const id = savedAddress.addressID ?? savedAddress.id ?? savedAddress.addressId;

        setAddresses((prev) => {
            const existsIndex = prev.findIndex((a) => (a.addressID ?? a.id ?? a.addressId) === id);
            if (existsIndex >= 0) {
                const copy = [...prev];
                copy[existsIndex] = savedAddress;
                return copy;
            } else {
                return [savedAddress, ...prev];
            }
        });

        setModalOpen(false);
        setEditingAddress(null);
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h3>{t("addressBook.title")}</h3>
                <div>
                    <button className={styles.primaryBtn} onClick={onAdd}>
                        {t("addressBook.add")}
                    </button>
                </div>
            </div>

            {loading && <div className={styles.state}>{t("addressBook.loading")}</div>}
            {error && <div className={styles.error}>{error}</div>}

            {!loading && addresses.length === 0 && (
                <div className={styles.empty}>
                    {t("addressBook.empty")}
                </div>
            )}

            <div className={styles.grid}>
                {addresses.map((addr) => {
                    const id = addr.addressID ?? addr.id ?? addr.addressId;
                    return (
                        <div key={id} className={styles.card}>
                            <div className={styles.cardBody}>
                                <div className={styles.addrLine}>
                                    <strong>{addr.fullAddress || addr.address || "—"}</strong>
                                </div>
                                <div className={styles.meta}>
                                    <span>{addr.city || "-"}</span>
                                    <span>•</span>
                                    <span>{addr.country || "-"}</span>
                                </div>
                            </div>

                            <div className={styles.cardActions}>
                                <button className={styles.linkBtn} onClick={() => onEdit(addr)}>
                                    {t("addressBook.edit")}
                                </button>
                                <button className={styles.dangerBtn} onClick={() => onDelete(id)}>
                                    {t("addressBook.delete")}
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>

            {modalOpen && (
                <AddressModal
                    userId={userId}
                    initialData={editingAddress}
                    onClose={() => {
                        setModalOpen(false);
                        setEditingAddress(null);
                    }}
                    onSaved={handleSave}
                />
            )}
        </div>
    );
}
