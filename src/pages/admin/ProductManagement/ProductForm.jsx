import React, { useState } from "react";
import styles from "./ProductForm.module.css";
import { useTranslation } from "react-i18next";

const ProductForm = ({ initialData = {}, onSubmit, onCancel, loading }) => {
  const { t } = useTranslation();
  // Ensure initialData is always an object
  const safeInitialData = initialData || {};
  const [form, setForm] = useState({
    name: safeInitialData.name || safeInitialData.productName || "",
    description: safeInitialData.description || "",
    price: safeInitialData.price || "",
    categoryID: safeInitialData.categoryID || "",
    stock: safeInitialData.stock || "",
    imageURL: safeInitialData.imageURL || "",
    sellerName: safeInitialData.sellerName || "",
    sellerEmail: safeInitialData.sellerEmail || "",
    images: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    setForm((prev) => ({ ...prev, images: Array.from(e.target.files) }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <table className={styles.formTable}>
        <tbody>
          <tr>
            <td className={styles.label}>Product Name</td>
            <td><input name="name" value={form.name} onChange={handleChange} required /></td>
          </tr>
          <tr>
            <td className={styles.label}>Description</td>
            <td><textarea name="description" value={form.description} onChange={handleChange} required /></td>
          </tr>
          <tr>
            <td className={styles.label}>Price</td>
            <td><input name="price" type="number" value={form.price} onChange={handleChange} required /></td>
          </tr>
          <tr>
            <td className={styles.label}>Stock</td>
            <td><input name="stock" type="number" value={form.stock} onChange={handleChange} required /></td>
          </tr>
          <tr>
            <td className={styles.label}>Category ID</td>
            <td><input name="categoryID" value={form.categoryID} onChange={handleChange} required /></td>
          </tr>
          <tr>
            <td className={styles.label}>Seller Name</td>
            <td><input name="sellerName" value={form.sellerName} onChange={handleChange} /></td>
          </tr>
          <tr>
            <td className={styles.label}>Seller Email</td>
            <td><input name="sellerEmail" value={form.sellerEmail} onChange={handleChange} /></td>
          </tr>
          <tr>
            <td className={styles.label}>Image URL</td>
            <td><input name="imageURL" value={form.imageURL} onChange={handleChange} /></td>
          </tr>
          <tr>
            <td className={styles.label}>Images</td>
            <td><input name="images" type="file" multiple onChange={handleImageChange} /></td>
          </tr>
        </tbody>
      </table>
      <div className={styles.actions}>
        <button type="submit" disabled={loading} className={styles.submitBtn}>
          {loading ? "Saving..." : "Save"}
        </button>
        <button type="button" onClick={onCancel} className={styles.cancelBtn}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default ProductForm;
