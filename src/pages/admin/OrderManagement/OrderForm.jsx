import React, { useState } from "react";
import styles from "./OrderForm.module.css";

const OrderForm = ({ initialData = {}, onSubmit, onCancel, loading }) => {
    const [form, setForm] = useState({
        orderStatus: initialData.orderStatus || "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(form);
    };

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.field}>
                <label>Status</label>
                <select name="orderStatus" value={form.orderStatus} onChange={handleChange} required>
                    <option value="">Select Status</option>
                    <option value="Pending">Pending</option>
                    <option value="Processing">Processing</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                </select>
            </div>
            <div className={styles.actions}>
                <button type="submit" className={styles.submitBtn} disabled={loading}>
                    {loading ? "Saving..." : "Save"}
                </button>
                <button type="button" className={styles.cancelBtn} onClick={onCancel}>
                    Cancel
                </button>
            </div>
        </form>
    );
};

export default OrderForm;
