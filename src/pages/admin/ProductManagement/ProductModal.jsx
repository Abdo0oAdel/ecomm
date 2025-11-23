import React from "react";
import styles from "./ProductModal.module.css";


const ProductModal = ({ open, children, onClose, title = "Edit Product" }) => {
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

export default ProductModal;
