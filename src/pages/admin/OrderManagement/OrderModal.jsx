import React from "react";
import styles from "./OrderModal.module.css";

const OrderModal = ({ open, children, onClose, title = "Edit Order" }) => {
    if (!open) return null;

    return (
        <div className={styles.overlay}>
            <div className={styles.modal}>
                <div className={styles.header}>
                    <h3 className={styles.title}>{title}</h3>
                    <button className={styles.closeBtn} onClick={onClose}>&times;</button>
                </div>
                <div className={styles.content}>{children}</div>
            </div>
        </div>
    );
};

export default OrderModal;
